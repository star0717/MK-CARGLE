import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import config, { getCrnPath, getMrnPath } from 'src/config/configuration';
import {
  AuthTokenInfo,
  HelpFindEmail,
  HelpFindPWD,
  SignUpInfo,
  UserInfo,
  ConfirmPWD,
} from 'src/models/auth.entity';
import { Company } from 'src/models/company.entity';
import { User } from 'src/models/user.entity';

import { HttpService } from '@nestjs/axios';
import { randomInt } from 'crypto';
import { compare, hashSync } from 'bcrypt';
import { CommonService } from '../common/common.service';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { UsersService } from 'src/modules/users/users.service';
import { CompanyApproval, UserAuthority } from 'src/constants/model.const';
import { TimetableService } from 'src/modules/timetable/timetable.service';
import { makeTimeArray } from 'src/constants/timetable.const';

@Injectable()
export class AuthService {
  private readonly env_config = config();

  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private readonly httpService: HttpService,
    private readonly commonService: CommonService,
    private timeTableService: TimetableService,
  ) {}

  async signUp(signUpInfo: SignUpInfo): Promise<SignUpInfo> {
    let company: Company;
    let user: User;

    if (signUpInfo.company) {
      signUpInfo.company.approval = CompanyApproval.BEFORE;
    }
    signUpInfo.user.approval = false;

    console.log(signUpInfo);

    try {
      // 업체 가입인 경우
      if (signUpInfo.user.auth == UserAuthority.OWNER) {
        // 신규 사업자 등록
        company = await this.companiesService.createForAuth(signUpInfo.company);

        /**** 테스트 *****/
        const initRow: number[] = makeTimeArray();
        const timeTable: number[][] = [];
        for (let i = 0; i < 7; i++) {
          timeTable.push(initRow);
        }
        await this.timeTableService.createTable(
          company._cID,
          company._uID,
          timeTable,
        );
        /***************/

        // if (!company) {
        //   throw new BadRequestException();
        // }
        // 업주 정보에 업체의 ID 주입
        signUpInfo.user._cID = company._id;
      }
      // 직원 가입인 경우
      else if (signUpInfo.user.auth == UserAuthority.WORKER) {
        console.log(signUpInfo.user);
        // 해당 사업자 검색
        company = await this.companiesService.findByIdForAuth(
          signUpInfo.user._cID,
        );
        // if (!company) {
        //   throw new BadRequestException();
        // }
      }

      user = await this.usersService.signUp(signUpInfo.user);
      if (!user) throw new BadRequestException();

      // 업체 가입인 경우 사업자의 대표자명에 사용자명과 함께 ID값 주입
      if (signUpInfo.user.auth == UserAuthority.OWNER) {
        company = await this.companiesService.findByIdAndUpdateForAuth(
          company._id,
          {
            ownerName: user.name,
            _cID: company._id,
            _uID: user._id,
          },
        );
      }

      // 사용자 정보에 ID값 주입
      user = await this.usersService.findByIdAndUpdateForAuth(user._id, {
        _cID: company._id,
        _uID: user._id,
      });
    } catch (err) {
      if (signUpInfo.user.auth == UserAuthority.OWNER && company) {
        this.companiesService.findByIdAndRemoveForAuth(company._id);
      }
      this.usersService.handelError(err);
    }

    const newSignUpInfo: SignUpInfo = {
      user,
      company,
    };

    return newSignUpInfo;
  }

  /**
   * 로그인 정보를 통해 사용자를 검증하고 토큰 반환
   * @param userInfo 로그인에 사용할 사용자 정보
   * @returns 성공시: 토큰, 실패시: UnauthorizedException 발생
   */
  async signIn(userInfo: UserInfo): Promise<SignUpInfo> {
    // console.log('validateUser in AuthService');

    // 사용자가 DB에 존재하는지 확인
    const user = await this.usersService.findByUserInfoForAuth(userInfo);
    // console.log(user);
    // 시스템에 등록된 사용자가 아닐경우 exception 발생
    if (!user) {
      throw new UnauthorizedException();
    }

    const company = await this.companiesService.findByIdForAuth(user._cID);
    if (!company) {
      throw new UnauthorizedException();
    }

    const newSignUpInfo: SignUpInfo = {
      user,
      company,
    };

    return newSignUpInfo;
  }

  async withdrawal(token: AuthTokenInfo, info: ConfirmPWD) {
    // 토큰의 사용자 ID와 입력받은 ID가 불일치 할 경우
    if (token.uID != info._id) throw new UnauthorizedException();

    var user = await this.usersService.findById(token, token.uID);
    if (!user) throw new UnauthorizedException();

    if (token.cID != user._cID) throw new UnauthorizedException();

    // 사용자 조회(패스워드까지 포함)
    const userInfo: UserInfo = {
      id: user.email,
      pwd: info.PWD,
    };
    user = await this.usersService.findByUserInfoForAuth(userInfo);
    if (!user) throw new UnauthorizedException();

    if (user.auth == UserAuthority.WORKER) {
      await this.usersService.findByIdAndRemove(token, user._uID);
    } else if (user.auth == UserAuthority.OWNER) {
      // 모든 직원을 포함한 업주의 정보까지 삭제
      await this.usersService.deleteAllByComID(token, user._cID);
      await this.companiesService.findByIdAndRemove(token, user._cID);
    }
  }

  async findCompanyByComRegNum(id: string): Promise<Partial<Company>> {
    return await this.companiesService.findByComRegNumForAuth(id);
  }

  async findCompanyByName(name: string): Promise<Partial<Company[]>> {
    return await this.companiesService.findByNameForAuth(name);
  }

  async validateBusNum(busNum: string): Promise<Observable<boolean>> {
    busNum = busNum.replace(/-/g, '');
    const apiKey = this.env_config.busNumValidation.api_key;
    const apiUrl = this.env_config.busNumValidation.url + apiKey;
    const postData = {
      b_no: [busNum],
    };

    return this.httpService.post(apiUrl, postData).pipe(
      map((response) => {
        console.log(response.data);
        const res = response.data;
        if (res['match_cnt'] == 1) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }

  async validateEmail(email: string, res: Response): Promise<boolean> {
    const user = await this.usersService.findByFieldForAuth({ email });
    if (user) {
      return false; //사용자가 존재하면 false 반환
    }
    const authCode: number = randomInt(1111, 9999);
    const strAuthCode = hashSync(String(authCode), 10);

    //테스트 목적(향 후 삭제)
    console.log(authCode);
    console.log(strAuthCode);
    const emailData = this.commonService.emailDataForEmailValidation(authCode);
    this.commonService.sendMail(email, emailData.title, emailData.content);
    const expireDate = new Date(Date.now() + 1000 * 60 * 5);
    res.cookie(process.env.AUTH_EMAIL_TK_NAME, strAuthCode, {
      expires: expireDate,
    });
    return true; //사용자가 존재하지 않으면 true 반환
  }

  async validateCryptoText(
    plainText: string,
    cryptoText: string,
  ): Promise<boolean> {
    return await compare(plainText, cryptoText);
  }

  async validatePhoneNumber(hpNumber: string): Promise<boolean> {
    const user = await this.usersService.findByFieldForAuth({ hpNumber });
    if (user) return false;
    else return true;
  }

  async uploadComRegFile(
    token: AuthTokenInfo,
    file: Express.Multer.File,
  ): Promise<string> {
    const company = await this.companiesService.findById(token, token.cID);
    const extension = file.originalname.substr(
      file.originalname.lastIndexOf('.'),
    );
    const path = getCrnPath();
    let fileName = company.comRegNum.toString();
    const oldFiles = await this.commonService.getFileNames(path, fileName);
    await this.commonService.deleteFiles(path, oldFiles);
    fileName = fileName + extension;
    const newFileName = await this.commonService.storeFile(
      file,
      path,
      fileName,
    );
    return newFileName;
  }

  async uploadMainRegFile(
    token: AuthTokenInfo,
    file: Express.Multer.File,
  ): Promise<string> {
    const company = await this.companiesService.findById(token, token.cID);
    const extension = file.originalname.substr(
      file.originalname.lastIndexOf('.'),
    );
    const path = getMrnPath();
    let fileName = company.mbRegNum.toString();
    const oldFiles = await this.commonService.getFileNames(path, fileName);
    await this.commonService.deleteFiles(path, oldFiles);
    fileName = fileName + extension;
    const newFileName = await this.commonService.storeFile(
      file,
      path,
      fileName,
    );
    return newFileName;
  }

  async getComRegFileName(token: AuthTokenInfo): Promise<string> | null {
    const company = await this.companiesService.findById(token, token.cID);
    const fileName = company.comRegNum.toString();

    const fileList = await this.commonService.getFileNames(
      getCrnPath(),
      fileName,
    );

    if (fileList.length > 0) {
      return fileList[0];
    } else return null;
  }

  async getMainRegFileName(token: AuthTokenInfo): Promise<string> | null {
    const company = await this.companiesService.findById(token, token.cID);
    const fileName = company.mbRegNum.toString();

    const fileList = await this.commonService.getFileNames(
      getMrnPath(),
      fileName,
    );

    if (fileList.length > 0) {
      return fileList[0];
    } else return null;
  }

  async requestApprove(token: AuthTokenInfo, id: string): Promise<SignUpInfo> {
    if (token.cID != id) throw new UnauthorizedException();
    const company = await this.companiesService.findByIdAndUpdateForAuth(id, {
      approval: CompanyApproval.ING,
    });
    if (!company) throw new UnauthorizedException();
    const user = await this.usersService.findById(token, token.uID);
    if (!user) throw new UnauthorizedException();

    const mailData = this.commonService.emailDataToRequestOwnerReview(
      company.name,
    );

    const address = process.env.MAIL_AUTH_USER;
    this.commonService.sendMail(
      this.env_config.mailerModule.defaults.from,
      mailData.title,
      mailData.content,
    );

    const signUpInfo: SignUpInfo = {
      user,
      company,
    };

    return signUpInfo;
  }

  async helpFindEmail(data: HelpFindEmail): Promise<string> | null {
    const user = await this.usersService.findByFieldForAuth({
      hpNumber: data.hpNumber,
    });

    // 검색된 사용자가 없거나 사용자명이 입력값과 다를 경우 null 반환
    if (!user || user.name != data.name) return null;

    // 메일 주소의 일부를 마스킹하여 반환
    const email = user.email;
    var len = email.split('@')[0].length - 5;
    return email.replace(new RegExp('.(?=.{0,' + len + '}@)', 'g'), '*');
  }

  async helpFindPWD(data: HelpFindPWD): Promise<boolean> {
    const user = await this.usersService.findByFieldForAuth({
      email: data.email,
    });

    // 검색된 사용자가 없거나 사용자명이 입력값과 다를 경우 null 반환
    if (!user || user.name != data.name || user.email != data.email)
      return false;

    // 비밀번호를 변경하여 메일 전송
    const password = Math.random().toString(36).substr(2, 11);
    await this.usersService.findByIdAndUpdateForAuth(user._id, { password });
    const emailData = this.commonService.emailDataToFindUserPassword(password);
    this.commonService.sendMail(user.email, emailData.title, emailData.content);
    console.log(password);
    return true;
  }
}
