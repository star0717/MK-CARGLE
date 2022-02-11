import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Car } from 'src/models/car.entity';

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
}
