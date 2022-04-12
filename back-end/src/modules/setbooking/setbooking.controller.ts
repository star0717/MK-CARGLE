import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UserAuthority } from 'src/constants/model.const';
import { AuthToken, Public } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { DeleteResult } from 'src/models/base.entity';
import { SetBooking } from 'src/models/setbooking.entity';
import { SetbookingService } from './setbooking.service';

@Controller('setbooking')
@ApiTags('예약설정 API')
export class SetbookingController {
  constructor(private readonly setbookingService: SetbookingService) {}

  @Post()
  @ApiOperation({ summary: `[OWNER] 새로운 예약설정 데이터 추가` })
  @ApiBody({ description: `생성할 예약설정 데이터`, type: SetBooking })
  @ApiCreatedResponse({
    description: `추가된 업체의 예약설정 데이터`,
    type: SetBooking,
  })
  async createSetBooking(
    @Body() doc: SetBooking,
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
  ): Promise<SetBooking> {
    return await this.setbookingService.createSetBooking(token, doc);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: `[PUBLIC]id에 해당하는 업체의 예약설정 정보 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 업체의 CID` })
  @ApiResponse({
    description: `검색된 예약설정 정보`,
    type: SetBooking,
  })
  async findByBookingId(@Param('id') id: string): Promise<SetBooking> {
    return await this.setbookingService.findByBookingId(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[OWNER] id에 해당하는 SetBooking 삭제`,
  })
  @ApiParam({ name: 'id', description: `해당 SetBooking의 CID` })
  @ApiResponse({
    description: `삭제된 SetBooking의 수`,
    type: DeleteResult,
  })
  async DeleteSetBooking(
    @Param('id') id: string,
    @AuthToken({ auth: UserAuthority.OWNER }) token: AuthTokenInfo,
  ): Promise<DeleteResult> {
    return await this.setbookingService.DeleteSetBooking(id);
  }
}
