import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth2Service } from './auth2.service';
import config, { getCrnPath, getMrnPath } from 'src/config/configuration';
import {
  AuthTokenInfo,
  SignUpInfo,
  UserInfo,
  WithdrawalInfo,
} from 'src/models/auth.entity';
import { UserAuthority } from 'src/models/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Company } from 'src/models/company.entity';
import { Observable } from 'rxjs';
import { compare } from 'bcrypt';

@Controller('auth2')
@ApiTags('인증 API v2')
export class Auth2Controller {
  constructor(private readonly authService: Auth2Service) {}

  private readonly env_config = config();

  @ApiOperation({
    summary: '회원 가입',
    description:
      '비밀번호는 8자 이상, 16자 이하. 업주 가입시에만 Company 데이터를 채워서 전송함',
  })
  @ApiBody({ description: '회원 가입에 필요한 정보 정보', type: SignUpInfo })
  @Post('signup')
  async signUp(
    @Body() signUpInfo: SignUpInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 데이터 유효성 검증
    if (signUpInfo.user.auth == UserAuthority.OWNER) {
      if (!signUpInfo.company || signUpInfo.user._cID) {
        // 업주가 업체정보를 포함하지 않으면 에러 발생
        throw new BadRequestException();
      }
    } else if (signUpInfo.user.auth == UserAuthority.WORKER) {
      // 직원이 업체정보를 포함하면 에러 발생
      if (signUpInfo.company || !signUpInfo.user._cID) {
        throw new BadRequestException();
      }
    } else {
      throw new BadRequestException();
    }

    const newSignInfo: SignUpInfo = await this.authService.signUp(signUpInfo);
    this.injectToken(newSignInfo, res);
    return;
  }

  @ApiOperation({ summary: '시스템에 로그인 시도 (토큰 발급)' })
  @ApiBody({ description: '로그인에 사용될 정보', type: UserInfo })
  @Post('signin')
  async signIn(
    @Body() userInfo: UserInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(userInfo);
    const newSignInfo: SignUpInfo = await this.authService.signIn(userInfo);
    this.injectToken(newSignInfo, res);
    return;
  }

  /**
   * 토큰을 생성하여 쿠키에 주입
   * @param signUpInfo 토큰에 주입될 사용자와 사업체의 정보
   * @param res 토큰을 주입할 응답
   */
  private injectToken(
    signUpInfo: SignUpInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authToken: AuthTokenInfo = {
      cID: signUpInfo.company._id,
      cName: signUpInfo.company.name,
      cApproval: signUpInfo.company.approval,
      uID: signUpInfo.user._id,
      uName: signUpInfo.user.name,
      uAuth: signUpInfo.user.auth,
      uApproval: signUpInfo.user.approval,
    };
    const token = this.authService.genJwtToken(authToken);
    res.cookie(process.env.TK_NAME, token);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: `회원탈퇴`,
    description:
      '작업자: 작업자 본인만 탈퇴. 업주: 본인을 포함한 모든 직원이 탈퇴하고 회사 정보도 삭제',
  })
  @ApiBody({ description: '로그인에 사용될 정보', type: WithdrawalInfo })
  @Post('withdrawal')
  async withdrawal(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() info: WithdrawalInfo,
  ) {
    const token: AuthTokenInfo = this.extractToken(req);
    await this.authService.withdrawal(token, info);
    this.clearToken(res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `프로필 확인 (토큰 정보 확인)` })
  @Get('profile')
  getProfile(@Req() req: Request): AuthTokenInfo {
    const authToken: AuthTokenInfo = this.extractToken(req);
    console.log(authToken);
    return authToken;
  }

  @ApiOperation({ summary: '사업자번호로 사업자 조회' })
  @ApiParam({ name: 'id', description: '조회할 사업자번호' })
  @ApiResponse({ description: '사업자정보', type: Company || null })
  @Get('find/company/:id')
  async findCompanyByComRegNum(
    @Param('id') id: string,
  ): Promise<Partial<Company>> {
    return await this.authService.findCompanyByComRegNum(id);
  }

  @ApiOperation({ summary: '사업자명으로 사업자 조회' })
  @ApiParam({ name: 'id', description: '조회할 사업자명' })
  @ApiResponse({ description: '사업자정보 배열', type: [Company] })
  @Get('find/companies/:id')
  async findCompaniesByName(
    @Param('id') name: string,
  ): Promise<Partial<Company>[]> {
    return await this.authService.findCompanyByName(name);
  }

  private extractToken(@Req() req): AuthTokenInfo {
    return req.user;
  }

  private clearToken(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(process.env.TK_NAME);
  }

  @ApiOperation({ summary: '사업자번호 유효성 검증' })
  @ApiParam({ name: 'id', description: '검증할 사업자번호' })
  @ApiResponse({ description: '사업자번호 존재여부(유효여부)', type: Boolean })
  @Get('validate/com-reg-number/:id')
  async validateBusNum(
    @Param('id') busNum: string,
  ): Promise<Observable<boolean>> {
    return await this.authService.validateBusNum(busNum);
  }

  @ApiOperation({ summary: '가입자 메일주소 유효성 검증 및 인증메일 발송' })
  @ApiParam({ name: 'id', description: '가입할 메일주소' })
  @ApiResponse({
    description: '메일주소 유효여부. 가입가능: true, 가입불가: false',
    type: Boolean,
  })
  @Get('validate/email/:id')
  async validateEmail(
    @Param('id') email: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return await this.authService.validateEmail(email, res);
  }

  @ApiOperation({ summary: '암호문과 평문이 동일한지 검증함' })
  @ApiResponse({ description: '검증결과', type: Boolean })
  @Get('validate/email-token/:id')
  async validateEmailToken(
    @Req() req: Request,
    @Param('id') plainText: string,
  ): Promise<boolean> {
    const cryptoText: string = req.cookies[this.env_config.authMailTokenName];
    return await this.authService.validateCryptoText(plainText, cryptoText);
  }
}
