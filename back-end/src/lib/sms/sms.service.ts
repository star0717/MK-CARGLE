import { UserAuthority } from 'src/constants/model.const';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthTokenInfo } from 'src/models/auth.entity';
import solapi, {
  GetMessagesRequestType,
  GetMessagesResponse,
  KakaoButton,
  Message,
  SingleMessageSentResponse,
} from 'solapi';

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
  async sendSms(
    token: AuthTokenInfo,
    auth?: UserAuthority,
  ): Promise<GetMessagesResponse> {
    //메세지 버튼
    const messageBtn: KakaoButton = {
      buttonName: '확인하기',
      buttonType: 'WL',
      linkPc: 'https://www.cleanoasis.net',
      linkMo: 'https://www.cleanoasis.net',
    };
    //메세지 내용
    const messageData: Message = {
      to: '01071626630',
      from: '16443486',
      // text: '⎛⎝(•‿•)⎠⎞⎛⎝(•‿•)⎠⎞⎛⎝(•‿•)⎠⎞⎛⎝(•‿•)⎠⎞',
      text: '안녕하세요 테스트입니다. 소독이 완료되었습니다.(미소)',
      kakaoOptions: {
        pfId: process.env.KAKAO_PFID,
        disableSms: false,
        adFlag: false,
        templateId: process.env.KAKAO_TID, // 템플릿 ID
        buttons: [messageBtn],
      },
      autoTypeDetect: true,
    };
    const sendResult: SingleMessageSentResponse = await this.messageService
      .sendOne(messageData)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException();
      });

    const getResultOne: GetMessagesResponse = await this.getOneSms(
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
  ): Promise<GetMessagesResponse> {
    const messageData: GetMessagesRequestType = {
      messageId: id,
    };
    const result: GetMessagesResponse = await this.messageService
      .getMessages(messageData)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException();
      });

    return result;
  }
}
