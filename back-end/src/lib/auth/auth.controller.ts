import { Controller, Get, Post, Body, UseGuards, Res, Request, BadRequestException, Param, UseInterceptors, UploadedFile, NotAcceptableException } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthTokenInfo, HelpChangePWD, HelpFindEmail, HelpFindPWD, SignUpInfo, UserInfo } from 'src/models/auth.entity';
import { UserAuthority } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { HttpService } from "@nestjs/axios";
import { map, Observable } from 'rxjs';
import config, { getCrnPath, getMrnPath } from "src/config/configuration";
import { CommonService } from '../common/common.service';
import { randomInt } from 'crypto';
import { compare, hashSync } from "bcrypt";
import { docFileInterceptor } from 'src/config/multer.option';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { UsersService } from 'src/modules/users/users.service';
import { Company } from 'src/models/company.entity';

@ApiTags("인증 API")
@Controller('auth')
export class AuthController {

  private readonly env_config = config();


  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly commonService: CommonService,
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
  ) {

  }

  @ApiOperation({ summary: "회원 가입", description: "비밀번호는 8자 이상, 16자 이하. 업주 가입시에만 Company 데이터를 채워서 전송함" })
  @ApiBody({ description: "회원 가입에 필요한 정보 정보", type: SignUpInfo })
  @Post('signup')
  async signUp(
    @Body() signUpInfo: SignUpInfo,
    @Res({ passthrough: true }) res: Response) {

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
    return;
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
    const newSignInfo: SignUpInfo = await this.authService.signIn(userInfo);
    this.injectToken(newSignInfo, res);
    return;
  }

  /**
   * 토큰을 생성하여 쿠키에 주입
   * @param signUpInfo 토큰에 주입될 사용자와 사업체의 정보
   * @param res 토큰을 주입할 응답
   */
  private injectToken(signUpInfo: SignUpInfo, @Res({ passthrough: true }) res: Response) {
    const authToken: AuthTokenInfo = {
      cID: signUpInfo.company._id,
      cName: signUpInfo.company.name,
      cApproval: signUpInfo.company.approval,
      uID: signUpInfo.user._id,
      uName: signUpInfo.user.name,
      uAuth: signUpInfo.user.auth,
      uApproval: signUpInfo.user.approval
    }
    const token = this.authService.genJwtToken(authToken);
    res.cookie(process.env.TK_NAME, token);
  }

  /**
   * 토큰을 갱신해서 재주입. 권한이나 인증 정보가 변경되었을 때 사용
   * @param authToken 현재 토큰 정보
   * @param res 토큰을 주입할 응답
   */
  private async reInjectToken(authToken: AuthTokenInfo, @Res({ passthrough: true }) res: Response) {
    const company = await this.companiesService.findById(authToken.cID);
    if (!company) throw new NotAcceptableException();
    const user = await this.usersService.findById(authToken.uID);
    if (!user) throw new NotAcceptableException();
    const newSignUpInfo: SignUpInfo = {
      user,
      company,
    };
    this.injectToken(newSignUpInfo, res);
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


  @ApiOperation({ summary: '사업자번호로 사업자 조회' })
  @ApiParam({ name: "id", description: "조회할 사업자번호" })
  @ApiResponse({ description: "사업자정보", type: Company || null })
  @Get('find/company/:id')
  async findCompanyByComRegNum(@Param('id') bugNum: string): Promise<Partial<Company>> {
    const company = await this.companiesService.findCompanyByComRegNum(bugNum);
    if (!company) return null;
    // 일부만 반환
    const resCompany: Partial<Company> = {
      name: company.name,
      address: company.address,
      ownerName: company.ownerName,
      _id: company._id
    }
    return resCompany;
  }

  @ApiOperation({ summary: '사업자명으로 사업자 조회' })
  @ApiParam({ name: "id", description: "조회할 사업자명" })
  @ApiResponse({ description: "사업자정보 배열", type: [Company] })
  @Get('find/companies/:id')
  async findCompaniesByName(@Param('id') name: string): Promise<Partial<Company>[]> {
    const companies = await this.companiesService.findCompaniesByName(name);
    console.log(companies);
    var resCompanies: Partial<Company>[] = [];
    companies.forEach(company => {
      resCompanies.push({
        name: company.name,
        address: company.address,
        ownerName: company.ownerName,
        _id: company._id
      })
    });
    return companies;
  }


  @ApiOperation({ summary: "사업자번호 유효성 검증" })
  @ApiParam({ name: "id", description: "검증할 사업자번호" })
  @ApiResponse({ description: "사업자번호 존재여부(유효여부)", type: Boolean })
  @Get('validate/com-reg-number/:id')
  async busNumValidate(
    @Param('id') bugNum: String): Promise<Observable<boolean>> {
    bugNum = bugNum.replace(/-/g, '',);
    const apiKey = this.env_config.busNumValidation.api_key;
    const apiUrl = this.env_config.busNumValidation.url + apiKey;
    const postData = {
      "b_no": [
        bugNum
      ]
    }
    return this.httpService.post(apiUrl, postData)
      .pipe(map(response => {
        console.log(response.data);
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

      //테스트 목적(향 후 삭제)
      console.log(authCode);
      console.log(strAuthCode);

      this.commonService.sendMail(email, "이메일 인증 요청 메일", '4자리 인증 코드 : ' + `<b> ${authCode}</b>`);
      const expireDate = new Date(Date.now() + 1000 * 60 * 5);
      res.cookie(process.env.AUTH_EMAIL_TK_NAME, strAuthCode, { expires: expireDate });
      return true;  //사용자가 존재하지 않으면 true 반환
    }
  }

  @ApiOperation({ summary: "암호문과 평문이 동일한지 검증함" })
  @ApiResponse({ description: "검증결과", type: Boolean })
  @Get('validate/crypto-text/:id')
  async compareCryptoText(@Request() req, @Param('id') painText: string): Promise<boolean> {
    const cryptoText: string = req.cookies[this.env_config.authMailTokenName];
    if (!cryptoText) throw new BadRequestException();
    return await compare(painText, cryptoText);
  }

  @ApiOperation({ summary: "가입자 전화번호 유효성 검증" })
  @ApiParam({ name: "id", description: "가입할 가입자의 전화번호" })
  @ApiResponse({ description: "전화번호 유효여부. 가입가능: true, 가입불가: false", type: Boolean })
  @Get('validate/phone/:id')
  async phoneValidate(@Param('id') hpNumber: string): Promise<boolean> {
    const user = await this.authService.findUserByHpNumber(hpNumber);
    if (user) {
      return false; //사용자가 존재하면 false 반환
    } else {
      return true;  //사용자가 존재하지 않으면 true 반환
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "사업자 등록증 업로드." })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "image/jpeg|image/png|application/pdf 타입의 사업자 등록증 파일",
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
  async uploadCrFile(@Request() req, @UploadedFile() file: Express.Multer.File): Promise<string> {
    const token_info: AuthTokenInfo = req.user;
    const company = await this.companiesService.findById(token_info.cID);
    const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
    const path = getCrnPath();
    let fileName = company.comRegNum.toString();
    const oldFiles = await this.commonService.getFileNames(path, fileName);
    await this.commonService.deleteFiles(path, oldFiles);
    fileName = fileName + extension;
    const newFileName = await this.commonService.storeFile(file, path, fileName);
    return newFileName;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "정비업 등록증 업로드." })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "image/jpeg|image/png|application/pdf 타입의 정비업 등록증 파일",
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
  async uploadMrFile(@Request() req, @UploadedFile() file: Express.Multer.File): Promise<string> {
    const token_info: AuthTokenInfo = req.user;
    const company = await this.companiesService.findById(token_info.cID);
    const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
    const path = getMrnPath();
    let fileName = company.mbRegNum.toString();
    const oldFiles = await this.commonService.getFileNames(path, fileName);
    await this.commonService.deleteFiles(path, oldFiles);
    fileName = fileName + extension;
    const newFileName = await this.commonService.storeFile(file, path, fileName);
    return newFileName;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "업로드된 사업자등록증 파일명 반환" })
  @ApiResponse({ description: "성공: 파일명, 실패: null" })
  @Get('file-name/com-reg-docc')
  async getCrFileName(@Request() req): Promise<string> | null {
    const token_info: AuthTokenInfo = req.user;
    const company = await this.companiesService.findById(token_info.cID);
    const fileName = company.comRegNum.toString();

    const fileList = await this.commonService.getFileNames(getCrnPath(), fileName);

    if (fileList.length > 0) {
      return fileList[0];
    } else
      return null;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "업로드된 정비업등록증 파일명 반환" })
  @ApiResponse({ description: "성공: 파일명, 실패: null" })
  @Get('file-name/man-reg-doc')
  async getMrFileName(@Request() req): Promise<string> | null {
    const token_info: AuthTokenInfo = req.user;
    const company = await this.companiesService.findById(token_info.cID);
    const fileName = company.mbRegNum.toString();

    const fileList = await this.commonService.getFileNames(getMrnPath(), fileName);

    if (fileList.length > 0) {
      return fileList[0];
    } else
      return null;
  }

  @ApiOperation({ summary: "이메일 주소 찾기" })
  @ApiBody({ description: "사용자명과 핸드폰번호", type: HelpFindEmail })
  @ApiResponse({ description: "성공: 메일주소, 실패: null" })
  @Post('help/email')
  async helpFineEmail(@Body() data: HelpFindEmail): Promise<string> | null {
    console.log(data);
    const user = await this.usersService.findUserByHpNumber(data.hpNumber);

    console.log(user);
    // 검색된 사용자가 없거나 사용자명이 입력값과 다를 경우 null 반환
    if (!user || user.name != data.name) return null;

    // 메일 주소의 일부를 마스킹하여 반환
    const email = user.email
    var len = email.split('@')[0].length - 5;
    return email.replace(new RegExp('.(?=.{0,' + len + '}@)', 'g'), '*');
  }

  @ApiOperation({ summary: "패스워드 찾기" })
  @ApiBody({ description: "사용자명과 핸드폰번호 그리고 이메일 주소", type: HelpFindPWD })
  @ApiResponse({ description: "성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송" })
  @Post('help/pwd')
  async helpFinePWD(@Body() data: HelpFindPWD): Promise<boolean> {
    const user = await this.usersService.findUserByHpNumber(data.hpNumber);

    // 검색된 사용자가 없거나 사용자명이 입력값과 다를 경우 null 반환
    if (!user || user.name != data.name || user.email != data.email) return false;

    // 비밀번호를 변경하여 메일 전송
    const password = Math.random().toString(36).substr(2, 11);
    await this.usersService.update(user._id, { password });
    this.commonService.sendMail(user.email, "임시 비밀번호 전송", '4자리 인증 코드 : ' + `<b> ${password}</b>`);
    console.log(password);
    return true
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "패스워드 변경" })
  @ApiBody({ description: "사용자명과 핸드폰번호 그리고 이메일 주소", type: HelpChangePWD })
  @ApiResponse({ description: "성공: true, 실패: false. 성공시엔 변경된 비밀번호가 메일로 전송" })
  @Post('update/password')
  async UpdateUserPassword(@Request() req, @Body() data: HelpChangePWD): Promise<boolean> {

    console.log(data);

    const token: AuthTokenInfo = req.user;

    if (token.uID != data._id) return false;

    // 사용자 조회(패스워드는 제외됨)
    var user = await this.usersService.findById(data._id);

    // 사용자 조회(패스워드까지 포함)
    const userInfo: UserInfo = {
      id: user.email,
      pwd: data.oldPWD
    }
    user = await this.usersService.findUserBySignInInfo(userInfo);

    user = await this.usersService.update(user._id, { password: data.newPWD });
    if (user) return true;
    else return false;
  }
}
