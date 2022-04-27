import { AuthToken } from './../../lib/decorators/decorators';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { TimeTable } from 'src/models/timetable.entity';

@Injectable()
export class TimetableService extends SafeService<TimeTable> {
  constructor(
    @InjectModel(TimeTable)
    readonly model: ReturnModelType<typeof TimeTable>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async createTable(
    cid: string,
    uid: string,
    doc: number[][],
  ): Promise<TimeTable> {
    const timeTable: Partial<TimeTable> = {
      _cID: cid,
      _uID: uid,
      mon: doc[0],
      tue: doc[1],
      wed: doc[2],
      thu: doc[3],
      fri: doc[4],
      sat: doc[5],
      sun: doc[6],
    };
    return await this.model.create(timeTable);
  }

  async findByCid(id: string): Promise<TimeTable> {
    return await this.model.findOne({ _cID: id });
  }
}
