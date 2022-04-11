import { AuthTokenInfo } from 'src/models/auth.entity';
import { CommonService } from './../../lib/common/common.service';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { SetBooking } from 'src/models/booking.entity';
import { Company } from 'src/models/company.entity';

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
    const company: Company = await this.model.findOne({ _cID: token.cID });
    if (company) {
      return await this.model.findOneAndUpdate({ _cID: token.cID }, doc);
    }
    doc._cID = token.cID;
    doc._uID = token.uID;
    return await this.model.create(doc);
  }

  async findByBookingId(id: string): Promise<SetBooking> {
    return await this.model.findOne({ _cID: id });
  }
}
