import { Controller, Get, Post, Body, UseGuards, Res, Request, BadRequestException, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthTokenInfo, SignUpInfo, UserInfo } from 'src/models/auth.entity';
import { UserAuthority } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { HttpService } from "@nestjs/axios";
import { map, Observable } from 'rxjs';
import configuration from "src/config/configuration";
import { CommonService } from '../common/common.service';
import { randomInt } from 'crypto';
import { hashSync } from "bcrypt";

@ApiTags("인증 API")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly commonService: CommonService,
  ) { }

  @ApiOperation({ summary: "회원 가입", description: "업주 가입시에만 Company 데이터를 채워서 전송함" })
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
  getProfile(@Request() req): AuthTokenInfo {
    const token_info: AuthTokenInfo = req.user;
    console.log(token_info);
    return token_info;
  }

  @ApiOperation({ summary: `로그아웃 (토큰 삭제)` })
  @Get('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(process.env.TK_NAME);
  }

  @ApiOperation({ summary: "사업자번호 유효성 검증" })
  @ApiParam({ name: "id", description: "검증할 사업자번호" })
  @ApiResponse({ description: "사업자번호 존재여부(유효여부)", type: Boolean })
  @Get('validate/bus-number/:id')
  async busNumValidate(
    @Param('id') bugNum: String): Promise<Observable<boolean>> {
    bugNum = bugNum.replace(/-/g, '',);
    const apiKey = configuration().busNumValidation.api_key;
    const apiUrl = configuration().busNumValidation.url + apiKey;
    const postData = {
      "b_no": [
        bugNum
      ]
    }
    return this.httpService.post(apiUrl, postData)
      .pipe(map(response => {
        const res = response.data;
        if (res["match_cnt"] == 1) {
          return true;
        } else {
          return false;
        }
      }));
  }

  @ApiOperation({ summary: "가입자 메일주소 유효성 검증 및 인증메일 발송" })
  @ApiParam({ name: "id", description: "가입할 메일주소" })
  @ApiResponse({ description: "메일주소 유효여부. 가입가능: true, 가입불가: false", type: Boolean })
  @Get('validate/email/:id')
  async emailValidate(@Param('id') email: string, @Res({ passthrough: true }) res: Response): Promise<boolean> {
    const user = await this.authService.findUserByEmail(email);
    if (user) {
      return false; //사용자가 존재하면 false 반환
    } else {
      const authCode: number = randomInt(1111, 9999);
      const strAuthCode = hashSync(String(authCode), 10);
      this.commonService.sendMail(email, "이메일 인증 요청 메일", '4자리 인증 코드 : ' + `<b> ${authCode}</b>`);
      const expireDate = new Date(Date.now() + 1000 * 60 * 5);
      res.cookie(process.env.AUTH_EMAIL_TK_NAME, strAuthCode, { expires: expireDate });
      return true;  //사용자가 존재하지 않으면 true 반환
    }
  }

  @ApiOperation({ summary: "가입자 전화번호 유효성 검증" })
  @ApiParam({ name: "id", description: "가입할 가입자의 전화번호" })
  @ApiResponse({ description: "전화번호 유효여부. 가입가능: true, 가입불가: false", type: Boolean })
  @Get('validate/phone/:id')
  async phoneValidate(@Param('id') hpNumber: string): Promise<boolean> {
    const user = await this.authService.findUserByHpNumber(+hpNumber);
    if (user) {
      return false; //사용자가 존재하면 false 반환
    } else {
      return true;  //사용자가 존재하지 않으면 true 반환
    }
  }
}
