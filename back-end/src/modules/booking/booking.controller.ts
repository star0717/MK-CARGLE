import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  Delete,
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
import {
  DeleteObjectIds,
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { Booking, BookingFindOptions } from 'src/models/booking.entity';
import { MainFindOptions } from 'src/models/maintenance.entity';
import { BookingService } from './booking.service';

@Controller('booking')
@ApiTags('예약관리 API')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 신규 Booking 등록` })
  @ApiBody({ description: `생성할 신규 Booking 데이터`, type: Booking })
  @ApiCreatedResponse({
    description: `생성된 신규 Booking 데이터`,
    type: Booking,
  })
  async create(
    @Body() doc: Booking,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Booking> {
    return await this.bookingService.create(token, doc);
  }

  @Get()
  @ApiOperation({ summary: `[WORKER] Booking 리스트 반환` })
  @ApiResponse({
    description: `검색된 Booking 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @Query() fOptions: BookingFindOptions,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<Booking>> {
    fParams.useDurationSearch = true;
    if (fOptions) {
      fParams.filter = fOptions;
      if (fOptions.regNumber) {
        fOptions['car.regNumber'] = fOptions.regNumber;
        delete fOptions.regNumber;
      }
      if (fOptions.phoneNumber) {
        fOptions['customer.phoneNumber'] = fOptions.phoneNumber;
        delete fOptions.regNumber;
      }
    }
    return await this.bookingService.findByOptions(token, fParams);
  }

  @Get(':id')
  @ApiOperation({ summary: `[WORKER] id에 해당하는 Booking 데이터 반환` })
  @ApiParam({ name: 'id', description: `해당 Booking의 오브젝트 ID` })
  @ApiResponse({ description: `검색된 Booking 데이터`, type: Booking })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Booking> {
    return await this.bookingService.findById(token, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `[WORKER] id에 해당하는 Booking 상태 변경` })
  @ApiParam({ name: 'id', description: `해당 Booking의 오브젝트 ID` })
  @ApiBody({
    description: `업데이트할 Booking 데이터`,
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

  @Delete(':id')
  @ApiOperation({ summary: `[WORKER] id에 해당하는 Booking 데이터 삭제` })
  @ApiParam({ name: 'id', description: `해당 Booking의 오브젝트 ID` })
  @ApiResponse({
    description: `삭제된 Booking 데이터의 수`,
    type: DeleteResult,
  })
  async findByIdAndRemove(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    return await this.bookingService.findByIdAndRemove(token, id);
  }

  @Post('/deletemany')
  @ApiOperation({
    summary: `[WORKER] 복수 오브젝트 ID에 해당하는 Booking의 데이터들을 삭제`,
  })
  @ApiBody({
    description: `삭제할 데이터들의 오브젝트 ID들`,
    type: DeleteObjectIds,
  })
  @ApiResponse({
    description: `삭제된 Booking의 데이터의 수`,
    type: DeleteResult,
  })
  async deleteManyByIds(
    @AuthToken() token: AuthTokenInfo,
    @Body() objectIds: DeleteObjectIds,
  ): Promise<DeleteResult> {
    return await this.bookingService.deleteManyByIds(token, objectIds);
  }
}
