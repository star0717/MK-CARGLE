import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Injectable } from '@nestjs/common';
import { Estimate } from 'src/models/estimate.entity';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CommonService } from 'src/lib/common/common.service';

@Injectable()
export class EstimatesService extends SafeService<Estimate> {
  constructor(
    @InjectModel(Estimate)
    readonly model: ReturnModelType<typeof Estimate>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
    this._genDocNumber('견적서');
  }
}
