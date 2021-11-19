import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  BadRequestException,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import config from 'src/config/configuration';
import {
  AuthTokenInfo,
  HelpChangePWD,
  HelpFindEmail,
  HelpFindPWD,
  SignUpInfo,
  UserInfo,
  WithdrawalInfo,
} from 'src/models/auth.entity';
import { UserAuthority } from 'src/models/user.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Company } from 'src/models/company.entity';
import { Observable } from 'rxjs';
import { docFileInterceptor } from 'src/config/multer.option';
import { CommonService } from '../common/common.service';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly commonService: CommonService,
  ) {}

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
    this.commonService.injectToken(newSignInfo, res);
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
    this.commonService.injectToken(newSignInfo, res);
    return;
  }

  @ApiOperation({ summary: `로그아웃 (토큰 삭제)` })
  @Get('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    this.commonService.clearToken(res);
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
    const token: AuthTokenInfo = this.commonService.extractToken(req);
    await this.authService.withdrawal(token, info);
    this.commonService.clearToken(res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `프로필 확인 (토큰 정보 확인)` })
  @Get('profile')
  getProfile(@Req() req: Request): AuthTokenInfo {
    const token: AuthTokenInfo = this.commonService.extractToken(req, true);
    return token;
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

  @ApiOperation({ summary: '가입자 전화번호 유효성 검증' })
  @ApiParam({ name: 'id', description: '가입할 가입자의 전화번호' })
  @ApiResponse({
    description: '전화번호 유효여부. 가입가능: true, 가입불가: false',
    type: Boolean,
  })
  @Get('validate/phone/:id')
  async validatePhoneNumber(@Param('id') hpNumber: string): Promise<boolean> {
    return await this.authService.validatePhoneNumber(hpNumber);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '사업자 등록증 업로드.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'image/jpeg|image/png|application/pdf 타입의 사업자 등록증 파일',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(docFileInterceptor)
  @Post('upload/com-reg-doc')
  async uploadComRegFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const token: AuthTokenInfo = this.commonService.extractToken(req);
    return await this.authService.uploadComRegFile(token, file);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '정비업 등록증 업로드.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'image/jpeg|image/png|application/pdf 타입의 정비업 등록증 파일',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(docFileInterceptor)
  @Post('upload/man-reg-doc')
  async uploadMainRegFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const token: AuthTokenInfo = this.commonService.extractToken(req);
    return await this.authService.uploadMainRegFile(token, file);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '업로드된 사업자등록증 파일명 반환' })
  @ApiResponse({ description: '성공: 파일명, 실패: null' })
  @Get('file-name/com-reg-docc')
  async getCrFileName(@Req() req: Request): Promise<string> | null {
    const token: AuthTokenInfo = this.commonService.extractToken(req);
    return await this.authService.getComRegFileName(token);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '업로드된 정비업등록증 파일명 반환' })
  @ApiResponse({ description: '성공: 파일명, 실패: null' })
  @Get('file-name/man-reg-doc')
  async getMainRegFileName(@Req() req: Request): Promise<string> | null {
    const token: AuthTokenInfo = this.commonService.extractToken(req);
    return await this.authService.getMainRegFileName(token);
  }

  @ApiOperation({ summary: '이메일 주소 찾기' })
  @ApiBody({ description: '사용자명과 핸드폰번호', type: HelpFindEmail })
  @ApiResponse({ description: '성공: 메일주소, 실패: null' })
  @Post('help/email')
  async helpFindEmail(@Body() data: HelpFindEmail): Promise<string> | null {
    return await this.authService.helpFindEmail(data);
  }

  @ApiOperation({ summary: '패스워드 찾기' })
  @ApiBody({
    description: '사용자명과 핸드폰번호 그리고 이메일 주소',
    type: HelpFindPWD,
  })
  @ApiResponse({
    description:
      '성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송',
  })
  @Post('help/pwd')
  async helpFinePWD(@Body() data: HelpFindPWD): Promise<boolean> {
    return await this.authService.helpFindPWD(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '패스워드 변경' })
  @ApiBody({
    description: '사용자명과 핸드폰번호 그리고 이메일 주소',
    type: HelpChangePWD,
  })
  @ApiResponse({
    description:
      '성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송',
  })
  @Post('update/password')
  async UpdateUserPassword(
    @Req() req: Request,
    @Body() data: HelpChangePWD,
  ): Promise<boolean> {
    console.log(data);

    const token: AuthTokenInfo = this.commonService.extractToken(req);
    return await this.authService.updateUserPassword(token, data);
  }
}
