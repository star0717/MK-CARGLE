import { AuthTokenInfo } from './../../models/auth.entity';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import {
  getStartOfDayDateTime as getStartOfDayDateTime,
  getStrDate,
} from 'src/constants/back-end.toolkit';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Car } from 'src/models/car.entity';
import {
  CarInfo,
  Dates,
  Maintenance,
  Price,
} from 'src/models/maintenance.entity';
import { CarsService } from '../cars/cars.service';
import { MainCustomerType, MainStatus } from 'src/constants/maintenance.const';

@Injectable()
export class MaintenancesService extends SafeService<Maintenance> {
  constructor(
    @InjectModel(Maintenance)
    readonly model: ReturnModelType<typeof Maintenance>,
    readonly commonService: CommonService,
    readonly carsService: CarsService,
  ) {
    super(model, commonService);
    this.genDocNumber();
  }

  /**
   * 오늘 생성된 문서 수 반환
   * @returns 오늘 생성된 문서의 수
   */
  private async numOfDocsToday(): Promise<number> {
    return await this.model.countDocuments({
      createdAt: {
        $gte: getStartOfDayDateTime(),
      },
    });
  }

  /**
   * 문서번호를 생성하여 반환
   * @returns 생성된 문서번호
   */
  private async genDocNumber(): Promise<string> {
    const index = await this.numOfDocsToday();
    const docNum = `${getStrDate()}${(index + 1).toString().padStart(7, '0')}`;

    console.log(docNum);

    return docNum;
  }

  async findCarByRegNumber(id: string): Promise<CarInfo> {
    const car: Car = await this.carsService.findByRegNumber(id);
    if (!car) return null;
    const carInfo: CarInfo = {
      name: car.name,
      regNumber: car.regNumber,
    };
    if (car.model) carInfo.model = car.model;
    if (car.age) carInfo.age = car.age;
    if (car.regDate) carInfo.regDate = car.regDate;
    if (car.idNumber) carInfo.idNumber = car.idNumber;

    return carInfo;
  }

  async storeCar(token: AuthTokenInfo, doc: Maintenance): Promise<Maintenance> {
    // console.log('오리지날', doc);

    let mt: Maintenance = new Maintenance();
    mt.docNum = await this.genDocNumber();
    mt.status = MainStatus.STORED;
    mt.costomerType = MainCustomerType.NORMAL;
    const mtDates: Dates = {
      stored: new Date(Date.now()),
    };
    mt.dates = mtDates;
    mt.car = doc.car;
    mt.customer = doc.customer;

    console.log(mt);

    return await this.create(token, mt);
  }
}
