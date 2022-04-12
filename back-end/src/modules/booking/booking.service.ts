import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { AuthToken } from 'src/lib/decorators/decorators';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Booking } from 'src/models/booking.entity';

@Injectable()
export class BookingService extends SafeService<Booking> {
  constructor(
    @InjectModel(Booking) readonly model: ReturnModelType<typeof Booking>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async registerBooking(token: AuthTokenInfo, doc: Booking): Promise<Booking> {
    return await this.model.create(doc);
  }
}
