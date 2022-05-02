import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { TimeTable } from 'src/models/timetable.entity';
import { AuthTokenInfo } from 'src/models/auth.entity';
import * as dayjs from 'dayjs';
import { dateGetWeekDay, weekDayGetIdx } from 'src/constants/timetable.const';

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

  async findByIdAndUpdate(
    token: AuthTokenInfo,
    id: string,
    doc: Partial<TimeTable>,
  ): Promise<TimeTable> {
    return await super.findByIdAndUpdate(token, id, doc);
  }

  async findByCidAndUpdate(
    token: AuthTokenInfo,
    cid: string,
    doc: Partial<TimeTable>,
  ): Promise<TimeTable> {
    return await this.model.findOneAndUpdate({ _cID: cid }, doc);
  }

  async findByCidAndInitUpdate(
    token: AuthTokenInfo,
    cid: string,
    timeTableInit: number[][],
  ): Promise<TimeTable> {
    let doc: Partial<TimeTable>;
    const timeTable: TimeTable = await this.findByCid(cid);
    if (!timeTable) throw new BadRequestException();
    if (timeTable.updatedAt) {
      const today: dayjs.Dayjs = dayjs();
      const diffDay: number = today.diff(timeTable.updatedAt, 'day');
      let dateArr: Date[] = [];
      let weekJson: Partial<TimeTable> = {};
      let weekArr: string[] = [];
      if (diffDay >= 1) {
        for (let i = 1; i < diffDay + 1; i++) {
          dateArr.push(today.subtract(i, 'day').toDate());
        }
        dateArr.map((date) => {
          if (!weekArr.includes(dateGetWeekDay(date)))
            weekArr.push(dateGetWeekDay(date));
        });
        weekArr.map((day) => {
          weekJson[day] = timeTableInit[weekDayGetIdx(day)];
        });

        doc = Object.assign(timeTable, weekJson);
        doc.updatedAt = new Date(Date.now());
      }
      return this.model.findOneAndUpdate({ _cID: cid }, doc);
    }
    return timeTable;
  }

  async findByCidAndRemove(id: string): Promise<TimeTable> {
    return await this.model.remove({ _cID: id });
  }
}
