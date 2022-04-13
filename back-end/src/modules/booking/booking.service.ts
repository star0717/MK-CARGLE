import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Booking } from 'src/models/booking.entity';
import { SetbookingService } from '../setbooking/setbooking.service';

@Injectable()
export class BookingService extends SafeService<Booking> {
  constructor(
    @InjectModel(Booking)
    readonly model: ReturnModelType<typeof Booking>,
    readonly commonService: CommonService,
    readonly setBookingService: SetbookingService,
  ) {
    super(model, commonService);
  }

  async create(token: AuthTokenInfo, doc: Booking): Promise<Booking> {
    return await super.create(token, doc);
  }

  async findByIdAndUpdate(
    token: AuthTokenInfo,
    id: string,
    doc: Partial<Booking>,
  ): Promise<Booking> {
    return await super.findByIdAndUpdate(token, id, doc);
  }

  async findByBookingId(token: AuthTokenInfo, id: string): Promise<Booking> {
    return await super.findById(token, id);
  }
}
