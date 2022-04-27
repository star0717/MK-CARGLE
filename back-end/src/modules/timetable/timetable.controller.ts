import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Public } from 'src/lib/decorators/decorators';
import { TimeTable } from 'src/models/timetable.entity';
import { TimetableService } from './timetable.service';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Public()
  @Get(':id')
  @ApiOperation({ summary: `[PUBLIC] id에 해당하는 TimeTable 데이터 반환` })
  @ApiParam({ name: 'id', description: `해당 TimeTable의 _cID` })
  @ApiResponse({ description: `검색된 TimeTable 데이터`, type: TimeTable })
  async findById(@Param('id') id: string): Promise<TimeTable> {
    return await this.timetableService.findByCid(id);
  }
}
