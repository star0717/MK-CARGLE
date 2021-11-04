import { Controller, Get, Post, Body, UseGuards, Res, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sign } from 'crypto';
import { Response } from 'express';
import { AuthTokenInfo, SignUpInfoForOwner, SignUpInfoForWorker, UserInfo } from 'src/models/auth.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags("인증 API")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "사업자의 회원 가입" })
  @ApiBody({ description: "회원 가입에 필요한 정보 정보", type: SignUpInfoForOwner })
  @Post('signup/owner')
  async signUpForOwner(
    @Body() signUpInfo: SignUpInfoForOwner,
    @Res({ passthrough: true }) res: Response): Promise<SignUpInfoForOwner> {

    const signInfo: SignUpInfoForOwner = await this.authService.signUpForOwner(signUpInfo);
    this.injectToken(signInfo, res);
    return signInfo;
  }

  private injectToken(signUpInfo: SignUpInfoForOwner, @Res({ passthrough: true }) res: Response) {
    const authToken: AuthTokenInfo = {
      cID: signUpInfo.company._id,
      cName: signUpInfo.company.name,
      uID: signUpInfo.user._id,
      uName: signUpInfo.user.name
    }

    const token = this.authService.genJwtToken(authToken);
    res.cookie(process.env.TK_NAME, token);
  }

  @ApiOperation({ summary: "직원의 회원 가입" })
  @ApiBody({ description: "회원 가입에 필요한 정보 정보", type: SignUpInfoForWorker })
  @Post('signup/worker')
  async signUpForWorker(
    @Body() signUpInfo: SignUpInfoForWorker,
    @Res({ passthrough: true }) res: Response): Promise<SignUpInfoForWorker> {
    console.log(signUpInfo);
    const signInfoForOwner: SignUpInfoForOwner = await this.authService.signUpForWorker(signUpInfo);
    this.injectToken(signInfoForOwner, res);
    const signInfoForWorker: SignUpInfoForWorker = {
      user: signInfoForOwner.user
    }
    return signInfoForOwner
  }

  /**
   * 사용자 로그인 시도
   * @param userInfo 로그인에 사용할 사용자 정보
   * @param res 토큰이 주입된 응답
   * @returns 
   */
  @ApiOperation({ summary: "시스템에 로그인 시도 (토큰 발급)" })
  @ApiBody({ description: "로그인에 사용될 정보", type: UserInfo })
  @Post('signin')
  async signIn(@Body() userInfo: UserInfo, @Res({ passthrough: true }) res: Response) {
    console.log(userInfo);
    const token = await this.authService.validateUserInfo(userInfo);
    res.cookie(process.env.TK_NAME, token);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `프로필 확인 (토큰 정보 확인)` })
  @Get('profile')
  getProfile(@Request() req) {
    const token_info: AuthTokenInfo = req.user;
    console.log(token_info);
    return token_info;
  }

  @ApiOperation({ summary: `로그아웃 (토큰 삭제)` })
  @Get('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(process.env.TK_NAME);
  }

}
