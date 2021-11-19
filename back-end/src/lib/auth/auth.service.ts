import {
  BadRequestException,
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
      // 업체 가입인 경우
      if (signUpInfo.user.auth == UserAuthority.OWNER) {
        // 신규 사업자 등록
        company = await this.companiesService.create(signUpInfo.company);
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
        company = await this.companiesService.findById(signUpInfo.user._cID);
        if (!company) {
          throw new BadRequestException();
        }
      }

      user = await this.usersService.create(signUpInfo.user);
      if (!user) throw new BadRequestException();

      // 업체 가입인 경우 사업자의 대표자명에 사용자명 주입
      if (signUpInfo.user.auth == UserAuthority.OWNER) {
        company = await this.companiesService.update(company._id, {
          ownerName: user.name,
        });
      }
    } catch (err) {
      console.log(err);
      if (signUpInfo.user.auth == UserAuthority.OWNER && company) {
        this.companiesService.remove(company._id);
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
    const user = await this.usersService.findUserBySignInInfo(userInfo);
    console.log(user);
    // 시스템에 등록된 사용자가 아닐경우 exception 발생
    if (!user) {
      throw new UnauthorizedException();
    }

    const company = await this.companiesService.findById(user._cID);
    if (!company) {
      throw new UnauthorizedException();
    }

    const newSignUpInfo: SignUpInfo = {
      user,
      company,
    };

    return newSignUpInfo;
  }

  /**
   * 사용자 인증토큰 발급
   * @param authToken 토큰을 발급할 사용자의 정보
   * @returns 발급된 인증 토큰
   */
  genJwtToken(authToken: AuthTokenInfo) {
    return this.jwtService.sign(authToken);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersService.findUserByEmail(email);
  }

  async findUserByHpNumber(hpNumber: string): Promise<User> {
    return await this.usersService.findUserByHpNumber(hpNumber);
  }
}
