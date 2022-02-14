import { CarInfo } from 'src/models/maintenance.entity';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { Car } from 'src/models/car.entity';
import { FilterQuery } from 'mongoose';

@Injectable()
export class CarsService extends SafeService<Car> {
  constructor(
    @InjectModel(Car)
    readonly model: ReturnModelType<typeof Car>,
    readonly commonService: CommonService,
  ) {
    super(model, commonService);
  }

  async findByRegNumber(regNumber: string): Promise<Car> {
    return await this.model.findOne({ regNumber });
  }

  /**
   * CarInfo에 해당하는 Car 정보를 갱신하거나 조재하지 않을 시 추가
   * @param doc CarInfo
   * @returns Car
   */
  async updateOrInsertByCarInfo(doc: CarInfo): Promise<Car> {
    var fQuery: FilterQuery<Car> = { regNumber: doc.regNumber };
    return await this.model.findOneAndUpdate(fQuery, doc as Car, {
      upsert: true,
    });
  }
}
