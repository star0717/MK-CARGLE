import { AuthToken } from 'src/lib/decorators/decorators';
import { Controller, Get, Param, Post, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { SmsService } from './sms.service';
import { UserAuthority } from 'src/constants/model.const';
import { GetMessagesResponse } from 'solapi';

@ApiTags('SMS 알림톡 API')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('/send')
  @ApiOperation({
    summary: `[WORKER] [TEST] 고객에게 SMS 알림톡 메시지 전송`,
  })
  async sendSms(
    @AuthToken() token: AuthTokenInfo,
  ): Promise<GetMessagesResponse> {
    return await this.smsService.sendSms(token, UserAuthority.WORKER);
  }

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] [TEST] 고객에게 전송한 SMS 알림톡 메시지 조회`,
  })
  @ApiParam({ name: 'messageId', description: `해당 알림톡 메시지 ID` })
  async getSms(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<GetMessagesResponse> {
    return await this.smsService.getOneSms(token, id, UserAuthority.WORKER);
  }
}
