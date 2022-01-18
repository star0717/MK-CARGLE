import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { FindResult } from 'src/models/base.entity';
import { Maintenance } from 'src/models/maintenance.entity';
import { Part } from 'src/models/part.entity';
import { PartsService } from '../admin/parts/parts.service';

@Injectable()
export class MaintenancesService extends SafeService<Maintenance> {
  constructor(
    @InjectModel(Maintenance)
    readonly model: ReturnModelType<typeof Maintenance>,
    readonly commonService: CommonService,
    readonly partsService: PartsService,
  ) {
    super(model, commonService);
    this.prepareAllParts();
  }

  async prepareAllParts() {
    this.result = await this.partsService.findAllPart();
    // console.log(this.result);
  }

  async findAllParts() {
    return this.result;
  }

  private result: FindResult<Part>;
}
