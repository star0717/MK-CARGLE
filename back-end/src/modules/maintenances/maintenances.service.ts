import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Maintenance } from 'src/models/maintenance.entity';
// import { PartsService } from '../admin/parts/parts.service';

@Injectable()
export class MaintenancesService extends SafeService<Maintenance> {
  constructor(
    @InjectModel(Maintenance)
    readonly model: ReturnModelType<typeof Maintenance>,
    readonly commonService: CommonService, // readonly partService: PartsService,
  ) {
    super(model, commonService);
  }
}
