import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Exception } from 'handlebars';
import { getStampPath } from 'src/config/configuration';
import { CommonService } from 'src/lib/common/common.service';
import {
  AuthTokenInfo,
  HelpChangePWD,
  UserInfo,
  ConfirmPWD,
  SignUpInfo,
} from 'src/models/auth.entity';
import {
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { Company } from 'src/models/company.entity';
import { User, UserAuthority } from 'src/models/user.entity';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SettingsService {
  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private readonly commonService: CommonService,
  ) {}

  async comfirmPassword(
    token: AuthTokenInfo,
    data: ConfirmPWD,
  ): Promise<boolean> {
    if (token.uID != data._id) throw new UnauthorizedException();

    // 사용자 조회(패스워드는 제외됨)
    var user = await this.usersService.findById(token, data._id);

    // 사용자 조회(패스워드까지 포함)
    const userInfo: UserInfo = {
      id: user.email,
      pwd: data.PWD,
    };
    user = await this.usersService.findByUserInfoForAuth(userInfo);
    if (user) return true;
    else return false;
  }

  async findMyInfo(token: AuthTokenInfo): Promise<SignUpInfo> {
    const user = await this.usersService.findById(token, token.uID);
    if (!user) throw new UnauthorizedException();

    const company = await this.companiesService.findById(token, token.cID);
    if (!company) throw new UnauthorizedException();

    const myInfo: SignUpInfo = {
      company,
      user,
    };

    return myInfo;
  }

  async updateUserPassword(
    token: AuthTokenInfo,
    id: string,
    data: HelpChangePWD,
  ): Promise<boolean> {
    if (token.uID != id || token.uID != data._id)
      throw new UnauthorizedException();

    // 사용자 조회(패스워드는 제외됨)
    var user = await this.usersService.findById(token, data._id);

    // 사용자 조회(패스워드까지 포함)
    const userInfo: UserInfo = {
      id: user.email,
      pwd: data.oldPWD,
    };
    user = await this.usersService.findByUserInfoForAuth(userInfo);
    if (!user) throw new UnauthorizedException();

    user = await this.usersService.findByIdAndUpdateForAuth(user._id, {
      password: data.newPWD,
    });
    if (user) return true;
    else return false;
  }

  async getStampFileName(token: AuthTokenInfo): Promise<string> | null {
    const company = await this.companiesService.findById(token, token.cID);
    const fileName = company.comRegNum;

    const fileList = await this.commonService.getFileNames(
      getStampPath(),
      fileName,
    );

    if (fileList.length > 0) {
      return fileList[0];
    } else return null;
  }

  async patchStampFile(
    token: AuthTokenInfo,
    file: Express.Multer.File,
  ): Promise<string> {
    const company = await this.companiesService.findById(token, token.cID);
    const extension = file.originalname.substr(
      file.originalname.lastIndexOf('.'),
    );
    const path = getStampPath();
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

  async updateMyUserInfo(
    token: AuthTokenInfo,
    id: string,
    user: Partial<User>,
  ): Promise<User> {
    if (token.uID != id) throw new UnauthorizedException();
    var pUser: Partial<User> = {};
    if (user.name) pUser.name = user.name;
    if (user.hpNumber) pUser.hpNumber = user.hpNumber;
    if (user.postcode) pUser.postcode = user.postcode;
    if (user.address1) pUser.address1 = user.address1;
    if (user.address2) pUser.address2 = user.address2;
    if (user.joinDate) pUser.joinDate = user.joinDate;
    try {
      return await this.usersService.findByIdAndUpdate(token, id, pUser);
    } catch (err) {
      throw new HttpException('asdfasdf', HttpStatus.NOT_MODIFIED);
    }
  }

  async updateMyCompanyInfo(
    token: AuthTokenInfo,
    id: string,
    company: Partial<Company>,
  ): Promise<Company> {
    if (token.cID != id) throw new UnauthorizedException();
    var pCompany: Partial<Company> = {};
    if (company.mbTypeNum) pCompany.mbTypeNum = company.mbTypeNum;
    if (company.busType) pCompany.busType = company.busType;
    if (company.busItem) pCompany.busItem = company.busItem;
    if (company.phoneNum) pCompany.phoneNum = company.phoneNum;
    if (company.faxNum) pCompany.faxNum = company.faxNum;
    return await this.companiesService.findByIdAndUpdate(token, id, pCompany);
  }

  async updateMyInfo(
    token: AuthTokenInfo,
    info: SignUpInfo,
  ): Promise<SignUpInfo> {
    if (token.cID != info.user._cID) throw new UnauthorizedException();

    console.log(info.user);
    const user = await this.updateMyUserInfo(token, token.uID, info.user);
    // if (!user) throw new UnauthorizedException('에러');

    var company: Company;
    if (token.uAuth == UserAuthority.WORKER) {
      company = await this.companiesService.findById(token, token.cID);
    } else {
      company = await this.updateMyCompanyInfo(token, token.cID, info.company);
    }
    // if (!company) throw new UnauthorizedException();

    const myInfo: SignUpInfo = {
      company,
      user,
    };

    console.log(myInfo.user);
    return myInfo;
  }

  async findWorksers(
    token: AuthTokenInfo,
    fParams: FindParameters,
  ): Promise<FindResult<User>> {
    fParams.filter = { auth: UserAuthority.WORKER } as Partial<User>;
    return await this.usersService.findByOptions(token, fParams);
  }

  async approveWorker(token: AuthTokenInfo, id: string): Promise<User> {
    const user = await this.usersService.findByIdAndUpdate(token, id, {
      approval: true,
    });
    // 승인 완료 메일 전송
    const email = this.commonService.emailDataToApproveWorker(token.cName);
    this.commonService.sendMail(user.email, email.title, email.content);
    return user;
  }

  async rejectWorker(token: AuthTokenInfo, id: string): Promise<User> {
    const user = await this.usersService.findByIdAndUpdate(token, id, {
      approval: false,
    });
    // 승인 거부 메일 전송
    const email = this.commonService.emailDataToRejectWorker(token.cName);
    this.commonService.sendMail(user.email, email.title, email.content);
    return user;
  }

  async deleteWorker(token: AuthTokenInfo, id: string): Promise<DeleteResult> {
    const user = await this.usersService.findById(token, id);
    if (!user) throw new UnauthorizedException();
    const result = await this.usersService.findByIdAndRemove(token, id);
    // 승인 거부 메일 전송
    const email = this.commonService.emailDataToDeleteWorker(token.cName);
    this.commonService.sendMail(user.email, email.title, email.content);
    return result;
  }
}
