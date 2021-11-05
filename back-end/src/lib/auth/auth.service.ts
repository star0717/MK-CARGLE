import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenInfo, SignUpInfo, UserInfo } from 'src/models/auth.entity';
import { Company } from 'src/models/company.entity';
import { User, UserAuthority } from 'src/models/user.entity';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInfo: SignUpInfo): Promise<SignUpInfo> {
    let company: Company;
    let user: User;

    console.log(signUpInfo);

    try {
      // 업체 정보 등록 및 조회
      if (signUpInfo.user.auth == UserAuthority.OWNER) {
        // 신규 사업자 등록
        company = await this.companiesService.create(signUpInfo.company);
        if (!company) {
          throw new BadRequestException();
        }
        // 업주 정보에 업체의 ID 주입
        signUpInfo.user.comID = company._id;
      } else if (signUpInfo.user.auth == UserAuthority.WORKER) {
        console.log(signUpInfo.user);
        // 해당 사업자 검색
        company = await this.companiesService.findById(signUpInfo.user.comID);
        if (!company) {
          throw new BadRequestException();
        }
      }

      user = await this.usersService.create(signUpInfo.user);
      if (!user) throw new BadRequestException();
    } catch (err) {
      console.log(err);
      if (signUpInfo.user.auth == UserAuthority.OWNER && company) {
        this.companiesService.remove(company._id);
      }
      throw new BadRequestException();
    }

    const newSignUpInfo: SignUpInfo = {
      company,
      user,
    };

    return newSignUpInfo;
  }

  /**
   * 로그인 정보를 통해 사용자를 검증하고 토큰 반환
   * @param userInfo 로그인에 사용할 사용자 정보
   * @returns 성공시: 토큰, 실패시: UnauthorizedException 발생
   */
  async validateUserInfo(userInfo: UserInfo): Promise<any> {
    console.log('validateUser in AuthService');

    // 사용자가 DB에 존재하는지 확인
    const user = await this.usersService.findUserBySignInInfo(userInfo);
    console.log(user);
    // 시스템에 등록된 사용자가 아닐경우 exception 발생
    if (!user) {
      throw new UnauthorizedException();
    }

    const company = await this.companiesService.findById(user.comID);
    if (!company) {
      throw new UnauthorizedException();
    }

    const authToken: AuthTokenInfo = {
      cID: company._id,
      cName: company.name,
      uID: user._id,
      uName: user.name,
    };

    console.log(authToken);
    return this.genJwtToken(authToken);

    // // 토큰에 구성
    // const token_payload = { user };

    // // 토큰 생성 후 반환
    // return this.jwtService.sign(token_payload);
  }

  genJwtToken(authToken: AuthTokenInfo) {
    return this.jwtService.sign(authToken);
  }
}
