import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiProperty,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SetBookingService } from './set-booking.service';
import { SetBooking } from 'src/models/booking.entity';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';

@Controller('set-booking')
@ApiTags('예약설정 API')
export class SetBookingController {
  constructor(private readonly service: SetBookingService) {}

  @Post()
  @ApiOperation({ summary: `[OWNER] 새로운 예약설정 데이터 추가` })
  @ApiBody({ description: `생성할 예약설정 데이터`, type: SetBooking })
  @ApiCreatedResponse({
    description: `추가된 업체의 예약설정 데이터`,
    type: SetBooking,
  })
  async createSetBooking(
    @Body() doc: SetBooking,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<SetBooking> {
    return await this.service.createSetBooking(token, doc);
  }

  @Get(':id')
  @ApiOperation({
    summary: `[PUBLIC]id에 해당하는 업체의 예약설정 정보 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 업체의 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 예약설정 정보`,
    type: SetBooking,
  })
  async findByBookingId(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<SetBooking> {
    return await this.service.findByBookingId(token, id);
  }
}
