import { UserAuthority } from 'src/constants/model.const';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthTokenInfo } from 'src/models/auth.entity';
import solapi from 'solapi';

@Injectable()
export class SmsService {
  // private readonly envConfig = config();
  private readonly messageService = new solapi(
    process.env.SOL_KEY, // 솔라피 key
    process.env.SOL_SECRET, // 솔라피 secret
  );

  /**
   * SMS전송
   * @param token
   * @param auth
   * @returns
   */
  async sendSms(token: AuthTokenInfo, auth?: UserAuthority): Promise<any> {
    const sendResult = await this.messageService
      .sendOne({
        to: '01090309615',
        from: '16443486',
        text: '팔콘펀치 (((c=(ﾟﾛﾟ;q',
        kakaoOptions: {
          pfId: process.env.KAKAO_PFID,
          disableSms: false,
          adFlag: false,
          //   templateId: process.env.KAKAO_TID, // 템플릿 ID
        },
        autoTypeDetect: true,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException();
      });

    const getResultOne = await this.getOneSms(
      token,
      sendResult.messageId,
      auth,
    );

    return getResultOne;
  }

  /**
   * 전송내역 조회
   * @param token
   * @param id
   * @param auth
   */
  async getOneSms(
    token: AuthTokenInfo,
    id: string,
    auth?: UserAuthority,
  ): Promise<any> {
    const result = this.messageService
      .getMessages({
        messageId: id,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException();
      });
  }
}
