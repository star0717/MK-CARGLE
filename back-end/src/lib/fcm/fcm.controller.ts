import { AuthToken } from 'src/lib/decorators/decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FcmService } from './fcm.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { UserAuthority } from 'src/constants/model.const';

@ApiTags('FCM API')
@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Get('my/owner')
  @ApiOperation({
    summary: `[WORKER] [TEST] 회사의 오너에게 메시지 전송`,
  })
  async sendToMyOwner(@AuthToken() token: AuthTokenInfo): Promise<boolean> {
    await this.fcmService.sendToMyCompany(token, UserAuthority.OWNER);
    return true;
  }

  @Get('my/workers')
  @ApiOperation({
    summary: `[WORKER] [TEST] 회사의 모든 직원에게 메시지 전송`,
  })
  async sendToMyWorkers(@AuthToken() token: AuthTokenInfo): Promise<boolean> {
    await this.fcmService.sendToMyCompany(token, UserAuthority.WORKER);
    return true;
  }

  @Get('my/all')
  @ApiOperation({
    summary: `[WORKER] [TEST] 회사의 모든 소속원에게 메시지 전송`,
  })
  async sendToMyAll(@AuthToken() token: AuthTokenInfo): Promise<boolean> {
    await this.fcmService.sendToMyCompany(token);
    return true;
  }
}
