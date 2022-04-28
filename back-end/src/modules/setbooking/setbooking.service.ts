import { Injectable, BadRequestException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { DeleteResult } from 'mongodb';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Company } from 'src/models/company.entity';
import { SetBooking } from 'src/models/setbooking.entity';

@Injectable()
export class SetbookingService extends SafeService<SetBooking> {
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
    // let setBooking: SetBooking = {
    //   ...doc,
    //   _cID: token.cID,
    //   _uID: token.uID,
    // };
    doc._cID = token.cID;
    doc._uID = token.uID;

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
