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
    imp_key: process.env.IMP_KEY,
    imp_secret: process.env.IMP_SECRET,
  };

  /**
   * 토큰 구하기
   * @returns
   */
  async getToken(): Promise<Token> {
    const tokenApi = await axios
      .post(process.env.IMP_TOKEN_URL, this.impConfig)
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
      .get(process.env.IMP_PAY_URL + id, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: AxiosResponse<Result<RequestPayResponse>, string>) => {
        return res.data.response;
      })
      .catch((err) => {
        throw new BadRequestException();
      });
    return payData;
  }

  async payCancel(
    token: AuthTokenInfo,
    doc: any,
    auth?: UserAuthority,
  ): Promise<PayResult> {
    const accessToken = (await this.getToken()).access_token;
    // merchant_uid를 통한 결제정보 조회 로직 필요(doc.merchant_uid)
    const cancelData: any = {
      reason: doc.reason,
      imp_uid: 'imp_440900092871', //조회한 db에서 가져온 imp_uid
      amount: doc.cancel_request_amount,
      checksum: 10, //조회한 db에서 가져온 amount
    };
    const getCancelData: any = await axios
      .post(process.env.IMP_CANCEL_URL, cancelData, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: AxiosResponse<Result<any>, any>) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        throw new BadRequestException();
      });
    // 리턴값을 통해 db에 업데이트 작업 필요
    // 상태: 결제완료 -> 환불
    // 금액: 10 -> 0

    // 업데이트 후에
    return { result: 'success', message: '환불 완료' };
  }
}
