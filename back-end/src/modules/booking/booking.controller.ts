import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  PartialType,
} from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { FindParameters, FindResult } from 'src/models/base.entity';
import { Booking } from 'src/models/booking.entity';
import { MainFindOptions } from 'src/models/maintenance.entity';
import { BookingService } from './booking.service';

@Controller('booking')
@ApiTags('예약설정 API')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 신규 예약 등록` })
  @ApiBody({ description: `생성할 신규 예약 데이터`, type: Booking })
  @ApiCreatedResponse({
    description: `추가된 신규 Booking 데이터`,
    type: Booking,
  })
  async create(
    @Body() doc: Booking,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Booking> {
    return await this.bookingService.create(token, doc);
  }

  @Patch(':id')
  @ApiOperation({ summary: `[WORKER] id에 해당하는 예약 상태 변경` })
  @ApiParam({ name: 'id', description: `해당 예약의 ID` })
  @ApiBody({
    description: `업데이트할 예약 정보`,
    type: PartialType<Booking>(Booking),
  })
  @ApiResponse({ description: `업데이트된 Booking 데이터`, type: Booking })
  async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() doc: Partial<Booking>,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Booking> {
    return await this.bookingService.findByIdAndUpdate(token, id, doc);
  }

  @Get()
  @ApiOperation({ summary: `[WORKER] 예약 정보 리스트 반환` })
  @ApiResponse({
    description: `검색된 Booking 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @Query() fOptions: MainFindOptions,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<Booking>> {
    fParams.useDurationSearch = true;
    if (fOptions) {
      fParams.filter = fOptions;
    }
    return await this.bookingService.findByOptions(token, fParams);
  }

  @Get(':id')
  @ApiOperation({ summary: `[WORKER] id에 해당하는 예약 정보 반환` })
  @ApiParam({ name: 'id', description: `해당 예약의 ID` })
  @ApiResponse({ description: `검색된 Booking 데이터`, type: Booking })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Booking> {
    return await this.bookingService.findById(token, id);
  }
}
