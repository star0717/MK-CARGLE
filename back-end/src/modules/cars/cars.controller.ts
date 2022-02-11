import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthToken } from 'src/lib/decorators/decorators';
import { AuthTokenInfo } from 'src/models/auth.entity';
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
}
