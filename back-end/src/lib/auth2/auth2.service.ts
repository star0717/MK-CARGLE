import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';
import config, { getCrnPath, getMrnPath } from 'src/config/configuration';
import {
  AuthTokenInfo,
  SignUpInfo,
  UserInfo,
  WithdrawalInfo,
} from 'src/models/auth.entity';
import { BaseEntity } from 'src/models/base.entity';
import { Company } from 'src/models/company.entity';
import { User, UserAuthority } from 'src/models/user.entity';
import { Companies2Service } from 'src/modules/companies2/companies2.service';
import { Users2Service } from 'src/modules/users2/users2.service';
import { HttpService } from '@nestjs/axios';
import { randomInt } from 'crypto';
import { compare, hashSync } from 'bcrypt';
import { CommonService } from '../common/common.service';

@Injectable()
export class Auth2Service {
  private readonly env_config = config();

  constructor(
    private usersService: Users2Service,
    private companiesService: Companies2Service,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly commonService: CommonService,
  ) {}

  async signUp(signUpInfo: SignUpInfo): Promise<SignUpInfo> {
    let company: Company;
    let user: User;

    console.log(signUpInfo);

    try {
      // 업체 가입인 경우
      if (signUpInfo.user.auth == UserAuthority.OWNER) {
        // 신규 사업자 등록
        company = await this.companiesService.createForAuth(signUpInfo.company);

        if (!company) {
          throw new BadRequestException();
        }
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
        if (!company) {
          throw new BadRequestException();
        }
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
      console.log(err);
      if (signUpInfo.user.auth == UserAuthority.OWNER && company) {
        this.companiesService.findByIdAndRemoveForAuth(company._id);
      }
      throw new BadRequestException();
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
    console.log('validateUser in AuthService');

    // 사용자가 DB에 존재하는지 확인
    const user = await this.usersService.findByUserInfoForAuth(userInfo);
    console.log(user);
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

  async withdrawal(token: AuthTokenInfo, info: WithdrawalInfo) {
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
    const user = await this.usersService.findByEmailforAuth(email);
    if (user) {
      return false; //사용자가 존재하면 false 반환
    } else {
      const authCode: number = randomInt(1111, 9999);
      const strAuthCode = hashSync(String(authCode), 10);

      //테스트 목적(향 후 삭제)
      console.log(authCode);
      console.log(strAuthCode);

      this.commonService.sendMail(
        email,
        '이메일 인증 요청 메일',
        '4자리 인증 코드 : ' + `<b> ${authCode}</b>`,
      );
      const expireDate = new Date(Date.now() + 1000 * 60 * 5);
      res.cookie(process.env.AUTH_EMAIL_TK_NAME, strAuthCode, {
        expires: expireDate,
      });
      return true; //사용자가 존재하지 않으면 true 반환
    }
  }

  async validateCryptoText(
    plainText: string,
    cryptoText: string,
  ): Promise<boolean> {
    return await compare(plainText, cryptoText);
  }

  genJwtToken(authToken: AuthTokenInfo) {
    return this.jwtService.sign(authToken);
  }
}
