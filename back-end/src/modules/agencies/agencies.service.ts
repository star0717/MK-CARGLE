import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Agency } from 'src/models/agency.entity';

@Injectable()
export class AgenciesService extends SafeService<Agency> {
  constructor(
    @InjectModel(Agency) readonly model: ReturnModelType<typeof Agency>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }
}
