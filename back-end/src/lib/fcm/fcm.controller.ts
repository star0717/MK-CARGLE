import { AuthToken } from 'src/lib/decorators/decorators';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';
import { FcmService } from './fcm.service';
import { AuthTokenInfo } from 'src/models/auth.entity';

@ApiTags('FCM API')
@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 User 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 User 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 User 데이터`,
    type: Boolean,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<boolean> {
    this.fcmService.sendFCM();
    return true;
  }
}
