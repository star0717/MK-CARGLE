import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { PartsSet } from 'src/models/partsset.entity';

@Injectable()
export class PartssetsService extends SafeService<PartsSet> {
  constructor(
    @InjectModel(PartsSet) readonly model: ReturnModelType<typeof PartsSet>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }
}
