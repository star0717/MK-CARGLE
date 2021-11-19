import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { readdirSync, rmSync, writeFileSync } from 'fs';
import { Address } from 'nodemailer/lib/mailer';
import { AuthTokenInfo, SignUpInfo } from 'src/models/auth.entity';
import { CompanyApproval } from 'src/models/company.entity';

@Injectable()
export class CommonService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 메일 전송
   * @param address 전송할 메일링 리스트
   * @param subject 메일제목
   * @param html 전송할 메일의 컨텐츠
   * @returns
   */
  async sendMail(
    address: string | Address | (string | Address)[],
    subject: string,
    html: string,
  ) {
    if (!address) {
      return false;
    }

    try {
      await this.mailerService.sendMail({
        to: address,
        subject,
        html,
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 파일 시스템에 파일 저장
   * @param file 저장할 파일
   * @param path 저장 경로
   * @param name 저장할 파일명
   * @returns 저장한 파일명
   */
  async storeFile(file: Express.Multer.File, path: string, name: string) {
    writeFileSync(path + name, file.buffer);
    return name;
  }

  /**
   * startname으로 시작되는 파일명을 가지는 모든 파일명을 반환
   * @param path 파일 검색 경로
   * @param startname 검색할 파일명
   * @returns 배열타입의 검색된 파일명들
   */
  async getFileNames(path: string, startname: string) {
    let fileList = readdirSync(path);
    console.log(fileList);
    fileList = fileList.filter((file) => file.startsWith(startname));
    console.log(fileList);
    return fileList;
  }

  async deleteFiles(path: string, fileList: string[]) {
    fileList.forEach((file) => {
      console.log(file);
      rmSync(path + file);
    });
  }

  genJwtToken(authToken: AuthTokenInfo) {
    return this.jwtService.sign(authToken);
  }

  /**
   * 토큰을 생성하여 쿠키에 주입
   * @param signUpInfo 토큰에 주입될 사용자와 사업체의 정보
   * @param res 토큰을 주입할 응답
   */
  injectToken(
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
    const token = this.genJwtToken(authToken);
    res.cookie(process.env.TK_NAME, token);
  }

  extractToken(@Req() req, isAuth: boolean = false): AuthTokenInfo {
    console.log(isAuth);
    try {
      const token: AuthTokenInfo = req.user;
      if (!token) throw new UnauthorizedException();

      if (!isAuth) {
        // 권한 검증
        if (
          token.cApproval != CompanyApproval.DONE ||
          token.uApproval != true
        ) {
          throw new UnauthorizedException();
        }
      }

      // ID값 검증
      if (
        !token ||
        !token.uID ||
        !token.cID ||
        token.uID == '' ||
        token.cID == ''
      ) {
        throw new UnauthorizedException();
      }
      return token;
    } catch (err) {}
  }

  clearToken(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(process.env.TK_NAME);
  }
}
