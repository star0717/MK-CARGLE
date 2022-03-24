import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAuthority } from 'src/constants/model.const';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { AuthToken } from '../decorators/decorators';
import { PaymentService } from './payment.service';

@ApiTags('결제모듈')
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
  ): Promise<any> {
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
  ): Promise<any> {
    return await this.paymentService.getPayData(
      token,
      id,
      UserAuthority.WORKER,
    );
  }
}
