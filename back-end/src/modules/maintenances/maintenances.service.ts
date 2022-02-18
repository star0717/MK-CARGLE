import { StatementsService } from './../statements/statements.service';
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
import { Statement } from 'src/models/statement.entity';
import {
  decMainCustomer,
  encMainCustomer,
} from 'src/lib/toolkit/back-end.toolkit';

@Injectable()
export class MaintenancesService extends SafeService<Maintenance> {
  constructor(
    @InjectModel(Maintenance)
    readonly model: ReturnModelType<typeof Maintenance>,
    readonly commonService: CommonService,
    readonly carsService: CarsService,
    readonly companiesService: CompaniesService,
    readonly estimatesService: EstimatesService,
    readonly statementsService: StatementsService,
  ) {
    super(model, commonService);
    this._genDocNumber('정비이력');
  }
  /********** 공통 API ***********************/
  async findById(token: AuthTokenInfo, id: string): Promise<Maintenance> {
    let result: Maintenance = await super.findById(token, id);
    if (result.customer) result.customer = decMainCustomer(result.customer);
    return result;
  }

  /********** 전용 API **********************/
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
    mt.customer = encMainCustomer(doc.customer);

    let result: Maintenance = await this.create(token, mt);
    if (result.customer) result.customer = decMainCustomer(result.customer);
    return result;
  }

  async startMain(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    let src = await this._validateReq(token, id, doc);

    // 정비 내역과 작업자명이 존재하는지 확인
    if (!doc.works || doc.works.length == 0 || !doc.workerName) {
      throw new BadRequestException();
    }

    src.works = doc.works;
    src.workerName = doc.workerName;
    src.status = MainStatus.ING;
    src.dates.startMa = new Date(Date.now());
    let result: Maintenance = await this.findByIdAndUpdate(token, id, src);
    if (result.customer) result.customer = decMainCustomer(result.customer);
    return result;
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

    let result: Maintenance = await this.findByIdAndUpdate(token, id, src);
    if (result.customer) result.customer = decMainCustomer(result.customer);
    return result;
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

    let result: Maintenance = await this.findByIdAndUpdate(token, id, src);
    if (result.customer) result.customer = decMainCustomer(result.customer);
    return result;
  }

  async releaseMain(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    let src = await this._validateReq(token, id, doc);

    src.dates.released = new Date(Date.now());
    src.status = MainStatus.RELEASED;

    let result: Maintenance = await this.findByIdAndUpdate(token, id, src);
    if (result.customer) result.customer = decMainCustomer(result.customer);
    return result;
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
  // 견적서 생성. 미발급 상태에서는 갱신
  async genEstimate(token: AuthTokenInfo, id: string): Promise<Estimate> {
    // 해당 main을 검색
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    // 업체 정보 조회
    const company: Company = await this.companiesService.findById(
      token,
      token.cID,
    );
    if (!company) throw new BadRequestException();

    // 견적서에 주입할 업체 정보 준비
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
      mainNum: main.docNum,
      customer: main.customer,
      company: cInfo,
      car: main.car,
      works: main.works,
      price: main.price,
    };

    let result: Estimate;
    // 이미 견적서가 생성되었으나 발급 사실이 없으면 기존 견적서 수정
    if (main.estimate?._oID && !main.estimate?.msgAt && !main.estimate?.prAt) {
      console.log('갱신');
      result = await this.estimatesService.findByIdAndUpdate(
        token,
        main.estimate._oID,
        estimate,
      );
    }
    // 생성된 견적서가 없거나 발급 사실이 있으면 새롭게 견적서 생성
    else {
      console.log('생성');
      // 문서 번호 생성
      estimate.docNum = await this.estimatesService._genDocNumber();

      // 견적서 생성
      result = await this.estimatesService.create(token, estimate as Estimate);

      // 정비이력에 견적서 참조 정보 갱신
      const mainEstimate: Doc = {
        _oID: result._id,
      };
      this.findByIdAndUpdate(token, id, { estimate: mainEstimate });
    }

    // 견적서 정보를 main에 패치
    return result;
  }

  // 견적서 발급
  async pubEstimate(
    token: AuthTokenInfo,
    id: string,
    doc: MainPubDocInfo,
  ): Promise<Maintenance> {
    // 해당 main을 검색
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    switch (doc.type) {
      case MainDocPubType.PRINT:
        main.estimate.prAt = new Date(Date.now());
        break;
      case MainDocPubType.ONLINE:
        main.estimate.msgAt = new Date(Date.now());
        // 향후 알림토 전송 기능 추가
        break;
      case MainDocPubType.BOTH:
        main.estimate.prAt = new Date(Date.now());
        main.estimate.msgAt = main.estimate.prAt;
        break;
      default:
        throw new BadRequestException();
    }

    return await this.findByIdAndUpdate(token, id, { estimate: main.estimate });
  }

  // 견적서 생성. 미발급 상태에서는 갱신
  async genStatement(token: AuthTokenInfo, id: string): Promise<Statement> {
    // 해당 main을 검색
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    // 업체 정보 조회
    const company: Company = await this.companiesService.findById(
      token,
      token.cID,
    );
    if (!company) throw new BadRequestException();

    // 견적서에 주입할 업체 정보 준비
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
    const statement: Partial<Statement> = {
      mainNum: main.docNum,
      customer: main.customer,
      company: cInfo,
      car: main.car,
      works: main.works,
      price: main.price,
    };

    let result: Statement;
    // 이미 견적서가 생성되었으나 발급 사실이 없으면 기존 견적서 수정
    if (
      main.statement?._oID &&
      !main.statement?.msgAt &&
      !main.statement?.prAt
    ) {
      console.log('갱신');
      result = await this.statementsService.findByIdAndUpdate(
        token,
        main.statement._oID,
        statement,
      );
    }
    // 생성된 견적서가 없거나 발급 사실이 있으면 새롭게 견적서 생성
    else {
      console.log('생성');
      // 문서 번호 생성
      statement.docNum = await this.statementsService._genDocNumber();

      // 견적서 생성
      result = await this.statementsService.create(
        token,
        statement as Statement,
      );

      // 정비이력에 견적서 참조 정보 갱신
      const mainStatement: Doc = {
        _oID: result._id,
      };
      this.findByIdAndUpdate(token, id, { statement: mainStatement });
    }

    // 견적서 정보를 main에 패치
    return result;
  }

  // 견적서 발급
  async pubStatement(
    token: AuthTokenInfo,
    id: string,
    doc: MainPubDocInfo,
  ): Promise<Maintenance> {
    // 해당 main을 검색
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    switch (doc.type) {
      case MainDocPubType.PRINT:
        main.statement.prAt = new Date(Date.now());
        break;
      case MainDocPubType.ONLINE:
        main.statement.msgAt = new Date(Date.now());
        // 향후 알림토 전송 기능 추가
        break;
      case MainDocPubType.BOTH:
        main.statement.prAt = new Date(Date.now());
        main.statement.msgAt = main.statement.prAt;
        break;
      default:
        throw new BadRequestException();
    }

    return await this.findByIdAndUpdate(token, id, {
      statement: main.statement,
    });
  }
}
