import { Injectable, BadRequestException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { DeleteResult } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { SetBookingTime } from 'src/constants/booking.const';
import { makeTimeArray } from 'src/constants/timetable.const';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Booking } from 'src/models/booking.entity';
import { Company } from 'src/models/company.entity';
import { OfficeHours, SetBooking } from 'src/models/setbooking.entity';
import { TimeTable } from 'src/models/timetable.entity';
import { BookingService } from '../booking/booking.service';
import { TimetableService } from '../timetable/timetable.service';

@Injectable()
export class SetbookingService extends SafeService<SetBooking> {
  constructor(
    @InjectModel(SetBooking)
    readonly model: ReturnModelType<typeof SetBooking>,
    readonly commonService: CommonService,
    readonly bookingService: BookingService,
    readonly timetableService: TimetableService,
  ) {
    super(model, commonService);
  }

  async createSetBooking(
    token: AuthTokenInfo,
    doc: SetBooking,
  ): Promise<SetBooking> {
    doc._cID = token.cID;
    doc._uID = token.uID;

    // 업무시간을 설정한 경우, 타임테이블 기본값 설정
    if (doc.officeHour) {
      const office: OfficeHours = JSON.parse(doc.officeHour);
      const officeKey: string[] = Object.keys(office).map((e) => e);
      let timeTable: number[][] = [];

      officeKey.map((day) => {
        if (office[day]['breakTime']) {
          timeTable.push(
            makeTimeArray(
              office[day]['openingHours'],
              office[day]['closingHours'],
              office[day]['breakTime'],
              office[day]['breakEndTime'],
            ),
          );
        } else {
          timeTable.push(
            makeTimeArray(
              office[day]['openingHours'],
              office[day]['closingHours'],
            ),
          );
        }
      });

      doc.weekTime = timeTable;

      // 예약이 없을 경우, 설정한 타임 테이블 바로 적용
      const booking: Booking = await this.bookingService.findByCid(token.cID);
      if (!booking) {
        const timeTableData: Partial<TimeTable> = {
          mon: timeTable[0],
          tue: timeTable[1],
          wed: timeTable[2],
          thu: timeTable[3],
          fri: timeTable[4],
          sat: timeTable[5],
          sun: timeTable[6],
        };
        await this.timetableService.findByCidAndUpdate(
          token,
          token.cID,
          timeTableData,
        );
      }
    }

    return await this.model.findOneAndUpdate({ _cID: token.cID }, doc, {
      upsert: true,
      new: true,
    });
  }

  async createWithSignUp(
    cid: string,
    uid: string,
    doc: number[][],
  ): Promise<SetBooking> {
    const setBooking: Partial<SetBooking> = {
      _cID: cid,
      _uID: uid,
      weekTime: doc,
    };
    return await this.model.create(setBooking);
  }

  async findBySetBookingId(id: string): Promise<SetBooking> {
    return await this.model.findOne({ _cID: id });
  }

  async DeleteSetBooking(id: string): Promise<DeleteResult> {
    const company: Company = await this.model.findOne({ _cID: id });
    if (!company) throw new BadRequestException();
    return await this.model.deleteOne({ _cID: id });
  }
}
