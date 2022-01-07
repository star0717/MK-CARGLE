import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  BadRequestException,
  Req,
  UseInterceptors,
  UploadedFile,
  Patch,
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
  HelpFindEmail,
  HelpFindPWD,
  SignUpInfo,
  UserInfo,
  ConfirmPWD,
} from 'src/models/auth.entity';
import { User, UserAuthority } from 'src/models/user.entity';
import { Company } from 'src/models/company.entity';
import { Observable } from 'rxjs';
import { docFileInterceptor } from 'src/config/multer.option';
import { CommonService } from '../common/common.service';
import { AuthToken, Public } from '../decorators/decorators';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly comService: CommonService,
  ) {}

  private readonly env_config = config();

  @Public()
  @ApiOperation({
    summary: '[PUBLIC] 회원 가입',
    description:
      '비밀번호는 8자 이상, 16자 이하. 업주 가입시에만 Company 데이터를 채워서 전송함',
  })
  @ApiBody({ description: '회원 가입에 필요한 정보 정보', type: SignUpInfo })
  @Post('signup')
  async signUp(
    @Body() signUpInfo: SignUpInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(signUpInfo);
    // 데이터 유효성 검증
    if (signUpInfo.user.auth == UserAuthority.OWNER) {
      if (!signUpInfo.company || signUpInfo.user._cID) {
        // 업주가 업체정보를 포함하지 않으면 에러 발생
        console.log('1');
        throw new BadRequestException();
      }
    } else if (signUpInfo.user.auth == UserAuthority.WORKER) {
      // 직원이 업체정보를 포함하면 에러 발생
      if (signUpInfo.company || !signUpInfo.user._cID) {
        console.log('2');
        throw new BadRequestException();
      }
    } else {
      throw new BadRequestException();
      console.log('3');
    }

    const newSignInfo: SignUpInfo = await this.authService.signUp(signUpInfo);
    console.log('여기');
    console.log(newSignInfo);
    this.comService.injectToken(newSignInfo, res);
    return;
  }

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 시스템에 로그인 시도 (토큰 발급)' })
  @ApiBody({ description: '로그인에 사용될 정보', type: UserInfo })
  @Post('signin')
  async signIn(
    @Body() userInfo: UserInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(userInfo);
    const newSignInfo: SignUpInfo = await this.authService.signIn(userInfo);
    this.comService.injectToken(newSignInfo, res);
    return;
  }

  @ApiOperation({ summary: `[WORKER] 로그아웃 (토큰 삭제)` })
  @Get('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    this.comService.clearToken(res);
  }

  @ApiOperation({
    summary: `[WORKER] 회원탈퇴`,
    description:
      '작업자: 작업자 본인만 탈퇴. 업주: 본인을 포함한 모든 직원이 탈퇴하고 회사 정보도 삭제',
  })
  @ApiBody({ description: '로그인에 사용될 정보', type: ConfirmPWD })
  @Post('withdrawal')
  async withdrawal(
    @Res({ passthrough: true }) res: Response,
    @Body() info: ConfirmPWD,
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ) {
    await this.authService.withdrawal(token, info);
    this.comService.clearToken(res);
  }

  @ApiOperation({ summary: `[개발전용][WORKER] 프로필 확인 (토큰 정보 확인)` })
  @Get('profile')
  getProfile(
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ): AuthTokenInfo {
    return token;
  }

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 사업자번호로 사업자 조회' })
  @ApiParam({ name: 'id', description: '조회할 사업자번호' })
  @ApiResponse({ description: '사업자정보', type: Company || null })
  @Get('company/:id')
  async findCompanyByComRegNum(
    @Param('id') id: string,
  ): Promise<Partial<Company>> {
    return await this.authService.findCompanyByComRegNum(id);
  }

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 사업자명으로 사업자 조회' })
  @ApiParam({ name: 'id', description: '조회할 사업자명' })
  @ApiResponse({ description: '사업자정보 배열', type: [Company] })
  @Get('companies/:id')
  async findCompaniesByName(
    @Param('id') name: string,
  ): Promise<Partial<Company>[]> {
    return await this.authService.findCompanyByName(name);
  }

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 사업자번호 유효성 검증' })
  @ApiParam({ name: 'id', description: '검증할 사업자번호' })
  @ApiResponse({ description: '사업자번호 존재여부(유효여부)', type: Boolean })
  @Get('validate/com-reg-number/:id')
  async validateBusNum(
    @Param('id') busNum: string,
  ): Promise<Observable<boolean>> {
    return await this.authService.validateBusNum(busNum);
  }

  @Public()
  @ApiOperation({
    summary: '[PUBLIC] 가입자 메일주소 유효성 검증 및 인증메일 발송',
  })
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

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 암호문과 평문이 동일한지 검증함' })
  @ApiResponse({ description: '검증결과', type: Boolean })
  @Get('validate/email-token/:id')
  async validateEmailToken(
    @Req() req: Request,
    @Param('id') plainText: string,
  ): Promise<boolean> {
    const cryptoText: string = req.cookies[this.env_config.authMailTokenName];
    return await this.authService.validateCryptoText(plainText, cryptoText);
  }

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 가입자 전화번호 유효성 검증' })
  @ApiParam({ name: 'id', description: '가입할 가입자의 전화번호' })
  @ApiResponse({
    description: '전화번호 유효여부. 가입가능: true, 가입불가: false',
    type: Boolean,
  })
  @Get('validate/phone/:id')
  async validatePhoneNumber(@Param('id') hpNumber: string): Promise<boolean> {
    return await this.authService.validatePhoneNumber(hpNumber);
  }

  @ApiOperation({ summary: '[WORKER] 사업자 등록증 업로드.' })
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
  @ApiResponse({ description: '업로드된 파일명', type: String })
  @UseInterceptors(docFileInterceptor)
  @Post('upload/com-reg-doc')
  async uploadComRegFile(
    @UploadedFile() file: Express.Multer.File,
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ): Promise<string> {
    return await this.authService.uploadComRegFile(token, file);
  }

  @ApiOperation({ summary: '[WORKER] 정비업 등록증 업로드.' })
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
  @ApiResponse({ description: '업로드된 파일명', type: String })
  @UseInterceptors(docFileInterceptor)
  @Post('upload/man-reg-doc')
  async uploadMainRegFile(
    @UploadedFile() file: Express.Multer.File,
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ): Promise<string> {
    return await this.authService.uploadMainRegFile(token, file);
  }

  @ApiOperation({ summary: '[WORKER] 업로드된 사업자등록증 파일명 반환' })
  @ApiResponse({ description: '성공: 파일명, 실패: null' })
  @Get('file-name/com-reg-doc')
  async getCrFileName(
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ): Promise<string> | null {
    return await this.authService.getComRegFileName(token);
  }

  @ApiOperation({ summary: '[WORKER] 업로드된 정비업등록증 파일명 반환' })
  @ApiResponse({ description: '성공: 파일명, 실패: null' })
  @Get('file-name/man-reg-doc')
  async getMainRegFileName(
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ): Promise<string> | null {
    return await this.authService.getMainRegFileName(token);
  }

  @ApiOperation({ summary: '[WORKER] 심사요청' })
  @ApiResponse({ description: '심사요청 결과', type: Boolean })
  @ApiParam({ name: 'id', description: '심사 승인을 요청할 업체의 오브젝트ID' })
  @Patch('request/company/:id')
  async requestApprove(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @AuthToken({ allowUnapproved: true }) token: AuthTokenInfo,
  ) {
    console.log(token);
    const signUpInfo: SignUpInfo = await this.authService.requestApprove(
      token,
      id,
    );
    if (signUpInfo) {
      this.comService.injectToken(signUpInfo, res);
      return true;
    } else {
      this.comService.clearToken(res);
      return false;
    }
  }

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 이메일 주소 찾기' })
  @ApiBody({ description: '사용자명과 핸드폰번호', type: HelpFindEmail })
  @ApiResponse({ description: '성공: 메일주소, 실패: null' })
  @Post('help/email')
  async helpFindEmail(@Body() data: HelpFindEmail): Promise<string> | null {
    return await this.authService.helpFindEmail(data);
  }

  @Public()
  @ApiOperation({ summary: '[PUBLIC] 패스워드 찾기' })
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
}
