import { AuthToken } from './../../lib/decorators/decorators';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { TimeTable } from 'src/models/timetable.entity';
import { AuthTokenInfo } from 'src/models/auth.entity';

@Injectable()
export class TimetableService extends SafeService<TimeTable> {
  constructor(
    @InjectModel(TimeTable)
    readonly model: ReturnModelType<typeof TimeTable>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async create(token: AuthTokenInfo, doc: TimeTable): Promise<TimeTable> {
    return await super.create(token, doc);
  }
}
