import { AuthTokenInfo } from './../../models/auth.entity';
import { CommonService } from './../../lib/common/common.service';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { SetBooking } from 'src/models/booking.entity';

@Injectable()
export class SetBookingService extends SafeService<SetBooking> {
  constructor(
    @InjectModel(SetBooking) readonly model: ReturnModelType<typeof SetBooking>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async createSetBooking(
    token: AuthTokenInfo,
    doc: SetBooking,
  ): Promise<SetBooking> {
    return await this.model.create(doc);
  }

  async findByBookingId(token: AuthTokenInfo, id: string): Promise<SetBooking> {
    return await this.model.findById(id);
  }
}
