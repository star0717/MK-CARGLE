import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Part } from 'src/models/part.entity';

@Injectable()
export class PartsService extends SafeService<Part> {
  constructor(
    @InjectModel(Part) readonly model: ReturnModelType<typeof Part>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }
  findAll() {
    return `This action returns all parts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} part`;
  }

  remove(id: number) {
    return `This action removes a #${id} part`;
  }
}
