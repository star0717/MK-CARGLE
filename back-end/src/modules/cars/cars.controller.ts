import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserAuthority } from 'src/constants/model.const';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { FindParameters, FindResult } from 'src/models/base.entity';
import { Car } from 'src/models/car.entity';
import { CarsService } from './cars.service';

@Controller('cars')
@ApiTags('차량 API')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Post()
  @ApiOperation({ summary: `[WORKER] 새로운 Car 데이터 추가` })
  @ApiBody({ description: `추가할 Car 데이터`, type: Car })
  @ApiCreatedResponse({
    description: `추가된 Car 데이터`,
    type: Car,
  })
  async create(
    @Body() doc: Car,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Car> {
    return await this.service.create(token, doc);
  }

  @Get()
  @ApiOperation({
    summary: `[WORKER] 조건에 해당하는 Car 배열 데이터를 페이징 정보와 함께 반환`,
  })
  @ApiResponse({
    description: `검색된 Car 배열 데이터와 페이징 정보`,
    type: FindResult,
  })
  async findByOptions(
    @Query() fParams: FindParameters,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<FindResult<Car>> {
    token.uAuth = UserAuthority.ADMIN;
    return await this.service.findByOptions(token, fParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: `[WORKER] id에 해당하는 Car 데이터 반환`,
  })
  @ApiParam({ name: 'id', description: `해당 Car의 오브젝트 ID` })
  @ApiResponse({
    description: `검색된 Car 데이터`,
    type: Car,
  })
  async findById(
    @Param('id') id: string,
    @AuthToken() token: AuthTokenInfo,
  ): Promise<Car> {
    token.uAuth = UserAuthority.ADMIN;
    return await this.service.findById(token, id);
  }
}
