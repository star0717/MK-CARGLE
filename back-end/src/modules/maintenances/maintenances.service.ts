import { AuthTokenInfo } from './../../models/auth.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import {
  getStartOfDayDateTime as getStartOfDayDateTime,
  getStrDate,
} from 'src/lib/toolkit/back-end.toolkit';
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
    console.log(doc);
    // 차량 정보 갱신 (신규차량일 경우 등록)
    this.carsService.updateOrInsertByCarInfo(doc.car);

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

    return await this.create(token, mt);
  }

  async startMain(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    let src = await this._validateReq(token, id, doc);

    //정비 내역과 작업자명이 존재하는지 확인
    // if (!doc.works || doc.works.length == 0 || !doc.workerName) {
    //   throw new BadRequestException();
    // }

    src.works = doc.works;
    src.workerName = doc.workerName;
    src.status = MainStatus.ING;
    src.dates.startMa = new Date(Date.now());

    return await this.findByIdAndUpdate(token, id, src);
  }

  async endMain(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    console.log(doc);
    let src = await this._validateReq(token, id, doc);

    src.status = MainStatus.DONE;
    src.dates.endMa = new Date(Date.now());
    src.price = new Price();

    return await this.findByIdAndUpdate(token, id, src);
  }

  async payMain(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    let src = await this._validateReq(token, id, doc);

    if (!doc.price) throw new BadRequestException();
    src.price = doc.price;
    src.status = MainStatus.PAID;

    return await this.findByIdAndUpdate(token, id, src);
  }

  async releaseMain(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    let src = await this._validateReq(token, id, doc);

    src.dates.released = new Date(Date.now());
    src.status = MainStatus.RELEASED;

    return await this.findByIdAndUpdate(token, id, src);
  }

  /**
   * 요청 유효성 검사. 요청한 클라이언트가 유효한지 확인
   * @param token
   * @param id
   * @param doc
   */
  private async _validateReq(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    const src: Maintenance = await this.findById(token, id);
    if (!src) throw new BadRequestException();
    if (src.docNum != doc.docNum) throw new BadRequestException();
    return src;
  }
}
