import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { Part } from 'src/models/part.entity';
import { PartsService } from './parts.service';

@Controller('admin/parts')
@ApiTags('시스템 관리자용 부품관리 API')
export class PartsController extends SafeControllerFactory<Part>(Part) {
  constructor(private readonly service: PartsService) {
    super(service);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
