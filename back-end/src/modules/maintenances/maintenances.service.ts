import { EstimatesService } from './../estimates/estimates.service';
import { Estimate } from './../../models/estimate.entity';
import { AuthTokenInfo } from './../../models/auth.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CommonService } from 'src/lib/common/common.service';
import { SafeService } from 'src/lib/safe-crud/safe-crud.service';
import { Car } from 'src/models/car.entity';
import {
  CarInfo,
  Dates,
  Doc,
  MainPubDocInfo,
  Maintenance,
  Price,
} from 'src/models/maintenance.entity';
import { CarsService } from '../cars/cars.service';
import {
  MainCustomerType,
  MainDocPubType,
  MainStatus,
} from 'src/constants/maintenance.const';
import { Company } from 'src/models/company.entity';
import { CompaniesService } from '../companies/companies.service';
import { CompanyInfo } from 'src/models/main.doc.entity';

@Injectable()
export class MaintenancesService extends SafeService<Maintenance> {
  constructor(
    @InjectModel(Maintenance)
    readonly model: ReturnModelType<typeof Maintenance>,
    readonly commonService: CommonService,
    readonly carsService: CarsService,
    readonly companiesService: CompaniesService,
    readonly estimatesService: EstimatesService,
  ) {
    super(model, commonService);
    this._genDocNumber();
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
    mt.docNum = await this._genDocNumber();
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

  /*********** 문서 발급 관련 *********************/
  async genEstimate(token: AuthTokenInfo, id: string): Promise<Estimate> {
    console.log('start');
    // 문서 번호 생성
    const docNum = await this.estimatesService._genDocNumber();
    console.log('hi');
    // 해당 main을 검색
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    // 업체 정보 조회
    const company: Company = await this.companiesService.findById(
      token,
      token.cID,
    );
    if (!company) throw new BadRequestException();

    const cInfo: CompanyInfo = {
      name: company.name,
      comRegNum: company.comRegNum,
      ownerName: company.ownerName,
      phoneNum: company.phoneNum,
      address: company.address1 + ' ' + company.address2,
    };
    if (company.busItem) cInfo.busItem = company.busItem;
    if (company.busType) cInfo.busType = company.busType;
    if (company.faxNum) cInfo.faxNum = company.faxNum;

    // 견적서 생성
    const estimate: Partial<Estimate> = {
      docNum,
      mainNum: main.docNum,
      customer: main.customer,
      company: cInfo,
      car: main.car,
      works: main.works,
      price: main.price,
    };

    // 견적서 저장
    const result = await this.estimatesService.create(
      token,
      estimate as Estimate,
    );

    const mainEstimate: Doc = {
      _oID: result._id,
    };
    this.findByIdAndUpdate(token, id, { estimate: mainEstimate });

    // 견적서 정보를 main에 패치
    return result;
  }

  async pubEstimate(
    token: AuthTokenInfo,
    id: string,
    doc: MainPubDocInfo,
  ): Promise<Maintenance> {
    // 해당 main을 검색
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    console.log(main.estimate);

    switch (doc.type) {
      case MainDocPubType.PRINT:
        main.estimate.prAt = new Date(Date.now());
        break;
      case MainDocPubType.ONLINE:
        main.estimate.msgAt = new Date(Date.now());
        break;
      default:
        throw new BadRequestException();
    }

    return await this.findByIdAndUpdate(token, id, { estimate: main.estimate });
  }
}
