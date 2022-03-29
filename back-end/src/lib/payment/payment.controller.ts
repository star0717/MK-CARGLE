import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAuthority } from 'src/constants/model.const';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  CancelData,
  PayData,
  PayResult,
  RequestCustomResponse,
  Result,
} from 'src/models/payment.entity';
import { AuthToken } from '../decorators/decorators';
import { PaymentService } from './payment.service';

@ApiTags('결제모듈 API')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/complete')
  @ApiOperation({
    summary: `[WORKER] [TEST] 결제모듈을 통한 결제 완료`,
  })
  async payComplete(
    @Body() doc: PayData,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<PayResult> {
    return await this.paymentService.payComplete(
      token,
      doc,
      UserAuthority.WORKER,
    );
  }

  @Post('/iamport-webhook')
  @ApiOperation({
    summary: `[WORKER] [TEST] 결제모듈 WebHook`,
  })
  async payWebHook(
    @Body() doc: PayData,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<PayResult> {
    return await this.paymentService.payComplete(
      token,
      doc,
      UserAuthority.WORKER,
    );
  }

  @Post('/cancel')
  @ApiOperation({
    summary: `[WORKER] [TEST] 결제 환불`,
  })
  async payCancel(
    @Body() doc: CancelData,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<PayResult> {
    return await this.paymentService.payCancel(
      token,
      doc,
      UserAuthority.WORKER,
    );
  }

  @Get('/mobile')
  @ApiOperation({
    summary: `[WORKER] [TEST] 결제정보 모바일 웹 리디렉션`,
  })
  async getPayMobile(
    @Query('imp_uid') imp_uid: string,
    @Query('merchant_uid') merchant_uid: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<PayResult> {
    const doc: PayData = {
      imp_uid: imp_uid,
      merchant_uid: merchant_uid,
    };
    return await this.paymentService.payComplete(
      token,
      doc,
      UserAuthority.WORKER,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] [TEST] 결제정보 조회`,
  })
  @ApiParam({ name: 'imp_uid', description: `해당 결제번호 ID` })
  async getPayData(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Result<RequestCustomResponse>> {
    return await this.paymentService.getPayData(
      token,
      id,
      UserAuthority.WORKER,
    );
  }
}
