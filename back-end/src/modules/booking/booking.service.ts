import { Injectable, BadRequestException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import {
  DeleteObjectIds,
  DeleteResult,
  FindParameters,
  FindResult,
} from 'src/models/base.entity';
import { Booking } from 'src/models/booking.entity';
import { MainCar } from 'src/models/maintenance.entity';
import { CarsService } from 'src/modules/cars/cars.service';
import { SetbookingService } from 'src/modules/setbooking/setbooking.service';
import { BookingState } from 'src/constants/booking.const';
import {
  getEndOfDayDateTime,
  getStartOfDayDateTime,
} from 'src/lib/toolkit/back-end.toolkit';
import { TimetableService } from 'src/modules/timetable/timetable.service';
import { dateGetWeekDay, dateToTableIdx } from 'src/constants/timetable.const';
import { TimeTable } from 'src/models/timetable.entity';

@Injectable()
export class BookingService extends SafeService<Booking> {
  constructor(
    @InjectModel(Booking)
    readonly model: ReturnModelType<typeof Booking>,
    readonly commonService: CommonService,
    readonly setBookingService: SetbookingService,
    readonly carsService: CarsService,
    readonly timeTableService: TimetableService,
  ) {
    super(model, commonService);
  }

  async create(token: AuthTokenInfo, doc: Booking): Promise<Booking> {
    const car: MainCar = await this.carsService.updateOrInsertByCarInfo(
      doc.car,
    );
    if (!car) throw new BadRequestException();

    const fParams: FindParameters = {
      page: 1,
      take: 100,
      useDurationSearch: true,
      sFrom: getStartOfDayDateTime(doc.createdAt),
      sTo: getEndOfDayDateTime(doc.createdAt),
    };
    const todayList: FindResult<Booking> = await super.findByOptions(
      token,
      fParams,
    );

    let docNum: number = todayList.totalDocs + 1;
    doc.bookingNum = docNum.toString().padStart(3, '0');

    const timeTable: TimeTable = await this.timeTableService.findByCid(
      token.cID,
    );
    if (!timeTable) throw new BadRequestException();

    const weekDay: string = dateGetWeekDay(doc.mainHopeDate);
    const idx: number = dateToTableIdx(doc.mainHopeDate);
    const row: number[] = timeTable[weekDay];
    row.splice(idx, 1, 1);
    const updateDoc: Partial<TimeTable> = {
      [weekDay]: row,
    };

    await this.timeTableService.findByIdAndUpdate(
      token,
      timeTable._id,
      updateDoc,
    );

    return await super.create(token, doc);
  }

  async mobileCreate(doc: Booking): Promise<Booking> {
    const car: MainCar = await this.carsService.updateOrInsertByCarInfo(
      doc.car,
    );
    if (!car) throw new BadRequestException();

    if (doc.createdAt) {
      const todayListCount = await this.model.count({
        createdAt: {
          $gte: getStartOfDayDateTime(doc.createdAt),
          $lt: getEndOfDayDateTime(doc.createdAt),
        },
      });

      let docNum: number = todayListCount + 1;
      doc.bookingNum = docNum.toString().padStart(3, '0');
    }

    return await super._create(doc);
  }

  async findById(token: AuthTokenInfo, id: string): Promise<Booking> {
    return await super.findById(token, id);
  }

  async findByIdAndUpdate(
    token: AuthTokenInfo,
    id: string,
    doc: Partial<Booking>,
  ): Promise<Booking> {
    const booking: Booking = await this.findById(token, id);
    if (!booking) throw new BadRequestException();

    let newDoc: any;
    if (doc.bookingState !== BookingState.REJECT) {
      newDoc = { $set: doc, $unset: { rejectOption: 1 } };
    } else {
      newDoc = doc;
    }
    return await super.findByIdAndUpdate(token, id, newDoc);
  }

  async findByIdAndRemove(
    token: AuthTokenInfo,
    id: string,
  ): Promise<DeleteResult> {
    const booking: Booking = await this.findById(token, id);
    if (!booking) throw new BadRequestException();

    return await super.findByIdAndRemove(token, id);
  }

  async deleteManyByIds(
    token: AuthTokenInfo,
    objectIds: DeleteObjectIds,
  ): Promise<DeleteResult> {
    return await super.deleteManyByIds(token, objectIds);
  }
}
