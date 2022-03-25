import axios, { AxiosResponse } from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAuthority } from 'src/constants/model.const';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { RequestPayResponse } from 'iamport-typings';

interface Result<T> {
  code: number;
  message: string;
  response: T;
}

interface Token {
  access_token: string;
  now: number;
  expired_at: number;
}

interface PayResult {
  result: string;
  message: string;
}

@Injectable()
export class PaymentService {
  // private readonly envConfig = config();
  private readonly impConfig = {
    imp_key: '1854779461352956',
    imp_secret:
      'JthGdTwoL7TzRO3tUp1bmzNscsveX3IHxZnLST9E02eSQhmLHnX3XLw9d2oa56RC5enY8xD9AR1r9ocQ',
  };

  /**
   * 토큰 구하기
   * @returns
   */
  async getToken(): Promise<Token> {
    const tokenApi = await axios
      .post('https://api.iamport.kr/users/getToken', this.impConfig)
      .then((res: AxiosResponse<Result<Token>, any>) => {
        return res.data;
      })
      .catch((err) => {
        throw new BadRequestException();
      });
    return tokenApi.response;
  }

  /**
   * 결제 완료
   * @param token
   * @param doc
   * @param auth
   * @returns
   */
  async payComplete(
    token: AuthTokenInfo,
    doc: any,
    auth?: UserAuthority,
  ): Promise<PayResult> {
    const payData = await this.getPayData(token, doc.imp_uid, auth);
    // 결제조회 데이터와 doc 데이터를 DB에서 조회한 데이터(주로 금액)를 비교하여
    // 일치할 경우에만 처리
    // if (payData.amount === dbData.amount) {
    switch (payData.status) {
      case 'paid':
        // DB에 저장 처리 필요
        return { result: 'success', message: '결제 완료' };

      case 'cancelled':
        return { result: 'cancelled', message: '결제 취소' };
      case 'failed':
        return { result: 'failed', message: '결제 실패.' };
    }
    // } else {
    //   return {result: 'forgery', message: '위조된 결제시도'}
    // }
  }

  /**
   * 결제 조회
   * @param token
   * @param id
   * @param auth
   * @returns
   */
  async getPayData(
    token: AuthTokenInfo,
    id: string,
    auth?: UserAuthority,
  ): Promise<RequestPayResponse> {
    const accessToken = (await this.getToken()).access_token;
    const payData = await axios
      .get(`https://api.iamport.kr/payments/${id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: AxiosResponse<Result<RequestPayResponse>, string>) => {
        return res.data.response;
      });
    return payData;
  }
}
