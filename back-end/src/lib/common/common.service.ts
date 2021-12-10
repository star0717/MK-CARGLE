import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { readdirSync, rmSync, writeFileSync } from 'fs';
import { Address } from 'nodemailer/lib/mailer';
import { AuthTokenInfo, SignUpInfo } from 'src/models/auth.entity';

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
    // console.log(fileList);
    fileList = fileList.filter((file) => file.startsWith(startname));
    // console.log(fileList);
    return fileList;
  }

  async deleteFiles(path: string, fileList: string[]) {
    fileList.forEach((file) => {
      console.log(file);
      rmSync(path + file);
    });
  }

  getFileExtension(fileName: string) {
    return fileName.substr(fileName.lastIndexOf('.') + 1);
  }

  private _genJwtToken(authToken: AuthTokenInfo) {
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
    const token = this._genJwtToken(authToken);
    res.cookie(process.env.TK_NAME, token);
  }

  clearToken(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(process.env.TK_NAME);
  }

  /** ADMIN용 메일 템플릿 **/

  // 회원가입시 승인 메일 템플릿
  emailDataForEmailValidation(authCode: number) {
    return {
      title: '이메일 인증 요청 메일',
      content: '4자리 인증 코드 : ' + `<b> ${authCode}</b>`,
    };
  }

  // 회원가입 및 관련서류 제출 후 관리자에게 전송할 심사 요청 메일
  emailDataToRequestOwnerReview(name: string) {
    return {
      title: '심사 승인 요청 메일',
      content:
        '새로운 회원 업체 : ' +
        `<b> ${name}</b>` +
        '로부터 심사 승인이 요청되었습니다.',
    };
  }

  // 심사 통과 후 가입 완료 안내 메일
  emailDataToApproveOwner() {
    return {
      title: '가입 승인완료 메일',
      content: '회원가입이 승인되었습니다.',
    };
  }

  // 심사 승인 결과 통보 안내 메일
  emailDataToRejectOwner() {
    return {
      title: '기입 승인거부 메일',
      content: '회원가입이 승인거부되었습니다. 제출서류를 보완해주세요.',
    };
  }

  // 비밀번호 찾기 메일
  emailDataToFindUserPassword(password: string) {
    return {
      title: '임시 비밀번호 전송',
      content: '4자리 인증 코드 : ' + `<b> ${password}</b>`,
    };
  }

  /** OWNER용 메일 템플릿 **/
  emailDataToApproveWorker(comName: string) {
    return {
      title: '승인 완료 메일',
      content: `${comName}의 작업자 가입이 승인 완료 되었습니다.`,
    };
  }

  emailDataToRejectWorker(comName: string) {
    return {
      title: '승인 거부 메일',
      content:
        `${comName}의 대표자가 작업자의 승인을 거부했습니다.<br>` +
        `서비스의 이용이 제한됩니다.<br>` +
        `자세한 사항은 대표자에게 문의하시기 바랍니다.`,
    };
  }

  emailDataToDeleteWorker(comName: string) {
    return {
      title: '계정 삭제 메일',
      content:
        `${comName}의 대표자가 작업자의 계정을 삭제했습니다.<br>` +
        `현 시점부터 시스템에 로그인 할 수 없습니다.`,
    };
  }
}
