import { Controller, Get, Post, Body, UseGuards, Res, Request, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sign } from 'crypto';
import { Response } from 'express';
import { AuthTokenInfo, SignUpInfo, UserInfo } from 'src/models/auth.entity';
import { UserAuthority } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags("인증 API")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "회원 가입", description: "업주 가입시에만 Company 데이터를 채워서 존송함" })
  @ApiBody({ description: "회원 가입에 필요한 정보 정보", type: SignUpInfo })
  @Post('signup')
  async signUpForOwner(
    @Body() signUpInfo: SignUpInfo,
    @Res({ passthrough: true }) res: Response): Promise<SignUpInfo> {

    // 데이터 유효성 검증
    if (signUpInfo.user.auth == UserAuthority.OWNER) {
      if (!signUpInfo.company || signUpInfo.user.comID) {
        // 업주가 업체정보를 포함하지 않으면 에러 발생
        throw new BadRequestException();
      }
    } else if (signUpInfo.user.auth == UserAuthority.WORKER) {
      // 직원이 업체정보를 포함하면 에러 발생
      if (signUpInfo.company || !signUpInfo.user.comID) {
        throw new BadRequestException();
      }
    } else {
      throw new BadRequestException();
    }

    const newSignInfo: SignUpInfo = await this.authService.signUp(signUpInfo);
    this.injectToken(newSignInfo, res);
    return newSignInfo;
  }

  private injectToken(signUpInfo: SignUpInfo, @Res({ passthrough: true }) res: Response) {
    const authToken: AuthTokenInfo = {
      cID: signUpInfo.company._id,
      cName: signUpInfo.company.name,
      uID: signUpInfo.user._id,
      uName: signUpInfo.user.name
    }

    const token = this.authService.genJwtToken(authToken);
    res.cookie(process.env.TK_NAME, token);
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
