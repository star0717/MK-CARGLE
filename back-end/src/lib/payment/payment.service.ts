import axios, { AxiosResponse } from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAuthority } from 'src/constants/model.const';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  CancelData,
  PayData,
  PayResult,
  RequestCustomResponse,
  Result,
  Token,
} from 'src/models/payment.entity';

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
    doc: PayData,
    auth?: UserAuthority,
  ): Promise<PayResult> {
    const payData: Result<RequestCustomResponse> = await this.getPayData(
      token,
      doc.imp_uid,
      auth,
    );
    // 결제조회 데이터와 doc 데이터를 DB에서 조회한 데이터(주로 금액)를 비교하여
    // 일치할 경우에만 처리
    // if (payData.amount === dbData.amount) {
    switch (payData.response.status) {
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
  ): Promise<Result<RequestCustomResponse>> {
    const accessToken = (await this.getToken()).access_token;
    const payData = await axios
      .get(process.env.IMP_PAY_URL + id, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: AxiosResponse<Result<RequestCustomResponse>, string>) => {
        return res.data;
      })
      .catch((err) => {
        throw new BadRequestException();
      });
    return payData;
  }

  async payCancel(
    token: AuthTokenInfo,
    doc: CancelData,
    auth?: UserAuthority,
  ): Promise<PayResult> {
    const accessToken = (await this.getToken()).access_token;
    // merchant_uid를 통한 결제정보 조회 로직 필요(doc.merchant_uid)
    const cancelData: CancelData = {
      reason: doc.reason,
      imp_uid: 'imp_298880665696', //조회한 db에서 가져온 imp_uid
      amount: doc.cancel_request_amount,
      checksum: 10, //조회한 db에서 가져온 amount
    };
    const getCancelData: Result<RequestCustomResponse> = await axios
      .post(process.env.IMP_CANCEL_URL, cancelData, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res: AxiosResponse<Result<RequestCustomResponse>, CancelData>) => {
        return res.data;
      })
      .catch((err) => {
        throw new BadRequestException();
      });

    // 업데이트 후에
    if (getCancelData.response) {
      // 리턴값을 통해 db에 업데이트 작업 필요
      // 상태: 결제완료 -> 환불
      // 금액: 10 -> 0
      return { result: 'success', message: '환불 완료' };
    } else {
      return { result: 'already', message: '이미 처리된 환불사항' };
    }
  }
}
