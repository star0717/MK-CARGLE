import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TttService } from './ttt.service';
import { CreateTttDto } from './dto/create-ttt.dto';
import { UpdateTttDto } from './dto/update-ttt.dto';

@Controller('ttt')
export class TttController {
  constructor(private readonly tttService: TttService) {}

  @Post()
  create(@Body() createTttDto: CreateTttDto) {
    return this.tttService.create(createTttDto);
  }

  @Get()
  findAll() {
    return this.tttService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tttService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTttDto: UpdateTttDto) {
    return this.tttService.update(+id, updateTttDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tttService.remove(+id);
  }
}
