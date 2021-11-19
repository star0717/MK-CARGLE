import { Injectable } from '@nestjs/common';
import { CreateTttDto } from './dto/create-ttt.dto';
import { UpdateTttDto } from './dto/update-ttt.dto';

@Injectable()
export class TttService {
  create(createTttDto: CreateTttDto) {
    return 'This action adds a new ttt';
  }

  findAll() {
    return `This action returns all ttt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ttt`;
  }

  update(id: number, updateTttDto: UpdateTttDto) {
    return `This action updates a #${id} ttt`;
  }

  remove(id: number) {
    return `This action removes a #${id} ttt`;
  }
}
