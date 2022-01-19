import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { FindResult } from 'src/models/base.entity';
import { Maintenance } from 'src/models/maintenance.entity';
import { Part } from 'src/models/part.entity';
import { MaintenancesService } from './maintenances.service';

@Controller('maintenances')
@ApiTags('정비내역 API')
export class MaintenancesController extends SafeControllerFactory<Maintenance>(
  Maintenance,
) {
  constructor(private readonly service: MaintenancesService) {
    super(service);
  }

  @Get('allparts')
  @ApiOperation({
    summary: `[WORKER] 모든 부품의 리스트 반환`,
  })
  @ApiResponse({ description: '모든 부품 리스트', type: FindResult })
  async findAllPart(): Promise<FindResult<Part>> {
    return await this.service.findAllParts();
  }
}
