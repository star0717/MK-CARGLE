import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Booking } from 'src/models/booking.entity';
import { BookingService } from './booking.service';

@Controller('booking')
@ApiTags('예약설정 API')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 신규 예약 등록` })
  @ApiBody({ description: `생성할 신규 예약 데이터`, type: Booking })
  @ApiCreatedResponse({
    description: `추가된 신규 예약 데이터`,
    type: Booking,
  })
  async registerBooking(
    @Body() doc: Booking,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Booking> {
    return await this.bookingService.registerBooking(token, doc);
  }
}
