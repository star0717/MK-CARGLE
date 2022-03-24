import { UserAuthority } from 'src/constants/model.const';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthTokenInfo } from 'src/models/auth.entity';
import solapi from 'solapi';

@Injectable()
export class SmsService {
  // private readonly envConfig = config();
  private readonly messageService = new solapi(
    'NCSMNANKNQH14COH', // 솔라피 key
    'GM8GU2DMJSVBUYEYYQ0U0IMQ6ONFVPNR', // 솔라피 secret
  );

  async sendSms(token: AuthTokenInfo, auth?: UserAuthority): Promise<any> {
    const sendResult = await this.messageService
      .sendOne({
        to: '01090309615',
        from: '16443486',
        text: '팔콘펀치@@@',
        kakaoOptions: {
          pfId: 'KA01PF210319072804501wAicQajTRe4',
          disableSms: false,
          adFlag: false,
          //   templateId: 'KA01TP210319073206523xHrOHWU7j12', // 템플릿 ID
        },
        autoTypeDetect: true,
      })
      .then((res) => {
        console.log(res);
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
        console.log('####', res);
        return res;
      })
      .catch((err) => {
        throw new BadRequestException();
      });
  }
}
