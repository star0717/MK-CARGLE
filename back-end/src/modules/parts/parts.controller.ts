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
import { FindResult } from 'src/models/base.entity';
import { Part } from 'src/models/part.entity';
import { PartsService } from './parts.service';

@Controller('parts')
export class PartsController {
  constructor(private readonly service: PartsService) {}

  @Get()
  @ApiTags('부품조회 API')
  @ApiOperation({
    summary: `[WORKER] 모든 부품의 리스트 반환`,
  })
  @ApiResponse({ description: '모든 부품 리스트', type: FindResult })
  async findAllPart(): Promise<FindResult<Part>> {
    return await this.service.findAllParts();
  }
}
