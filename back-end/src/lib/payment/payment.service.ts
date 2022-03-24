import axios, { AxiosResponse } from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAuthority } from 'src/constants/model.const';
import { AuthTokenInfo } from 'src/models/auth.entity';

interface token {
  code: number;
  message: string;
  response: {
    access_token: string;
    now: number;
    expired_at: number;
  };
}

@Injectable()
export class PaymentService {
  // private readonly envConfig = config();
  private readonly impConfig = {
    imp_key: '1854779461352956',
    imp_secret:
      'JthGdTwoL7TzRO3tUp1bmzNscsveX3IHxZnLST9E02eSQhmLHnX3XLw9d2oa56RC5enY8xD9AR1r9ocQ',
  };

  async getToken(): Promise<token> {
    const tokenApi = await axios
      .post('https://api.iamport.kr/users/getToken', this.impConfig)
      .then((res: AxiosResponse<token, token>) => {
        return res.data;
      })
      .catch((err) => {
        throw new BadRequestException();
      });
    return tokenApi;
  }

  async payComplete(
    token: AuthTokenInfo,
    doc: any,
    auth?: UserAuthority,
  ): Promise<any> {
    return await this.getPayData(token, doc.imp_uid, auth);
  }

  async getPayData(
    token: AuthTokenInfo,
    id: string,
    auth?: UserAuthority,
  ): Promise<any> {
    const accessToken = (await this.getToken()).response.access_token;
    const payData = await axios
      .get(`https://api.iamport.kr/payments/${id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: AxiosResponse<unknown, any>) => {
        return res.data;
      });
    return payData;
  }
}
