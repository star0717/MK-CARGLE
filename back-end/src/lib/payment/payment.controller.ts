import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestPayResponse } from 'iamport-typings';
import { UserAuthority } from 'src/constants/model.const';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { AuthToken } from '../decorators/decorators';
import { PaymentService } from './payment.service';

interface payResult {
  result: string;
  message: string;
}

@ApiTags('결제모듈 API')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/complete')
  @ApiOperation({
    summary: `[WORKER] [TEST] 결제모듈을 통한 결제 완료`,
  })
  async payComplete(
    @Body() doc: any,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<payResult> {
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
    @Body() doc: any,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<payResult> {
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
    @Body() doc: any,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<any> {
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
  ): Promise<payResult> {
    const doc: Partial<RequestPayResponse> = {
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
  ): Promise<RequestPayResponse> {
    return await this.paymentService.getPayData(
      token,
      id,
      UserAuthority.WORKER,
    );
  }
}
