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
  MainCar,
  MainDates,
  MainDocInfo,
  MainPubDocInfo,
  Maintenance,
  MainPrice,
} from 'src/models/maintenance.entity';
import { CarsService } from '../cars/cars.service';
import {
  MainCustomerType,
  MainDocPubType,
  MainStatus,
} from 'src/constants/maintenance.const';
import { Company } from 'src/models/company.entity';
import { CompaniesService } from '../companies/companies.service';
import { CompanyInfo, MainDoc } from 'src/models/main.doc.entity';
import { Statement } from 'src/models/statement.entity';
import { DeleteObjectIds, DeleteResult } from 'src/models/base.entity';
import { FilterQuery } from 'mongoose';
import { UserAuthority } from 'src/constants/model.const';

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
    return await super.findById(token, id);
  }

  async findByIdAndRemove(
    token: AuthTokenInfo,
    id: string,
  ): Promise<DeleteResult> {
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    if (main.estimate)
      this.estimatesService.findByIdAndRemove(token, main.estimate._oID);
    if (main.statement)
      this.statementsService.findByIdAndRemove(token, main.statement._oID);

    return await super.findByIdAndRemove(token, id);
  }

  async deleteManyByIds(
    token: AuthTokenInfo,
    objectIds: DeleteObjectIds,
  ): Promise<DeleteResult> {
    // 삭제할 정비이력을 먼저 조회
    let fQuery: FilterQuery<MainDoc> = {
      _id: {
        $in: objectIds.ids,
      },
    };
    if (token.uAuth != UserAuthority.ADMIN) {
      fQuery._cID = token.cID;
    }
    const mains: Maintenance[] = await this.model.find(fQuery);

    // 삭제할 견적서와 명세서의 ObjectID를 정리
    let eIds: DeleteObjectIds = { ids: [] }; //삭제할 견적서 ID들
    let sIds: DeleteObjectIds = { ids: [] }; // 삭제할 명세서 ID들
    mains.map((main: Maintenance) => {
      if (main.estimate) eIds.ids.push(main.estimate._oID);
      if (main.statement) sIds.ids.push(main.statement._oID);
    });
    // 명세서 삭제
    if (eIds.ids.length > 0) {
      console.log('eIds.length: ' + eIds.ids.length);
      this.estimatesService.deleteManyByIds(token, eIds);
    }
    // 견적서 삭제
    if (sIds.ids.length > 0) {
      console.log('sIds.length: ' + sIds.ids.length);
      this.estimatesService.deleteManyByIds(token, sIds);
    }

    return await super.deleteManyByIds(token, objectIds);
  }

  /********** 전용 API **********************/
  async findCarByRegNumber(id: string): Promise<MainCar> {
    const car: Car = await this.carsService.findByRegNumber(id);
    if (!car) return null;

    const carInfo: MainCar = {
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

    let src: Maintenance = new Maintenance();
    src.docNum = await this._genDocNumber();
    src.status = MainStatus.STORED;
    src.costomerType = MainCustomerType.NORMAL;
    const mtDates: MainDates = {
      stored: new Date(Date.now()),
    };
    src.dates = mtDates;
    src.car = doc.car;
    src.customer = doc.customer;
    src.price = new MainPrice();

    console.log('mt', src);
    return await this.create(token, src);
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
    src.costomerType = doc.costomerType;
    src.status = MainStatus.ING;
    src.dates.startMa = new Date(Date.now());
    src.price = doc.price;
    return await this.findByIdAndUpdate(token, id, src);
  }

  async endMain(
    token: AuthTokenInfo,
    id: string,
    doc: Maintenance,
  ): Promise<Maintenance> {
    console.log(doc);
    let src = await this._validateReq(token, id, doc);

    src.works = doc.works;
    src.costomerType = doc.costomerType;
    src.status = MainStatus.DONE;
    src.dates.endMa = new Date(Date.now());
    src.price = doc.price;

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

    src.works = doc.works;
    src.costomerType = doc.costomerType;
    src.dates.released = new Date(Date.now());
    src.status = MainStatus.RELEASED;
    src.price = doc.price;

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
  // 견적서 생성. 미발급 상태에서는 갱신
  async genEstimate(token: AuthTokenInfo, id: string): Promise<Estimate> {
    // 해당 main을 검색
    const main: Maintenance = await this.findById(token, id);
    if (!main) throw new BadRequestException();

    // 견적서 생성
    const estimate: Partial<Estimate> = {
      mainNum: main.docNum,
      customer: main.customer,
      car: main.car,
      works: main.works,
      price: main.price,
    };

    let result: Estimate;

    // 이미 견적서가 생성되었으나 발급 사실이 없으면 기존 견적서 수정
    if (main.estimate?._oID) {
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
      // 업체 정보 조회
      const company: Company = await this.companiesService.findById(
        token,
        token.cID,
      );
      if (!company) throw new BadRequestException();

      // 견적서에 주입할 업체 정보 준비
      let cInfo: CompanyInfo = {
        name: company.name,
        comRegNum: company.comRegNum,
        ownerName: company.ownerName,
        phoneNum: company.phoneNum,
        address: company.address1 + ' ' + company.address2,
      };
      if (company.busItem) cInfo.busItem = company.busItem;
      if (company.busType) cInfo.busType = company.busType;
      if (company.faxNum) cInfo.faxNum = company.faxNum;
      estimate.company = cInfo;
      // 문서 번호 생성
      estimate.docNum = await this.estimatesService._genDocNumber();

      // 견적서 생성
      result = await this.estimatesService.create(token, estimate as Estimate);
    }
    // 정비이력에 견적서 참조 정보 갱신
    const mainEstimate: MainDocInfo = {
      _oID: result._id,
    };
    this.findByIdAndUpdate(token, id, { estimate: mainEstimate });

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

    // 견적서 생성
    const statement: Partial<Statement> = {
      mainNum: main.docNum,
      customer: main.customer,
      // company: cInfo,
      car: main.car,
      works: main.works,
      price: main.price,
    };

    let result: Statement;

    // 이미 견적서가 생성되었으나 발급 사실이 없으면 기존 견적서 수정
    if (main.statement?._oID) {
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
      // 업체 정보 조회
      const company: Company = await this.companiesService.findById(
        token,
        token.cID,
      );
      if (!company) throw new BadRequestException();

      // 견적서에 주입할 업체 정보 준비
      let cInfo: CompanyInfo = {
        name: company.name,
        comRegNum: company.comRegNum,
        ownerName: company.ownerName,
        phoneNum: company.phoneNum,
        address: company.address1 + ' ' + company.address2,
      };
      if (company.busItem) cInfo.busItem = company.busItem;
      if (company.busType) cInfo.busType = company.busType;
      if (company.faxNum) cInfo.faxNum = company.faxNum;
      statement.company = cInfo;
      // 문서 번호 생성
      statement.docNum = await this.statementsService._genDocNumber();

      // 견적서 생성
      result = await this.statementsService.create(
        token,
        statement as Statement,
      );
    }

    // 정비이력에 견적서 참조 정보 갱신
    const mainStatement: MainDocInfo = {
      _oID: result._id,
    };
    this.findByIdAndUpdate(token, id, { statement: mainStatement });

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
