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
  private allParts: FindResult<Part>;

  constructor(
    @InjectModel(Maintenance)
    readonly model: ReturnModelType<typeof Maintenance>,
    readonly commonService: CommonService,
    readonly partsService: PartsService,
  ) {
    super(model, commonService);
    // this.prepareAllParts();
    this.logOrderId();
  }

  async prepareAllParts() {
    this.allParts = await this.partsService.findAllPart();
    console.log('AllParts.length: ' + this.allParts.totalDocs);
  }

  async findAllParts(): Promise<FindResult<Part>> {
    return this.allParts;
  }

  async logOrderId() {
    // for (let i = 0; i < 1; i++) await this.genOrderID();
  }
  async genOrderID() {
    // const now = new Date();
    // console.log(now.getTime());
    // // console.log(now.getFullYear());
    // console.log(now.getHours() * 1000 * 60 * 60);
    // console.log(now.getMinutes() * 1000 * 60);
    // console.log(now.getSeconds() * 1000);
    // console.log(now.getMilliseconds());
  }
}
