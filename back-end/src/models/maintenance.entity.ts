import { ApiProperty } from '@nestjs/swagger';
import { prop, PropType } from '@typegoose/typegoose';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  MainCustomerType,
  MainDocPubType,
  MainPartsType,
  MainStatus,
} from 'src/constants/maintenance.const';
import { BaseEntity } from './base.entity';

// 정비내역서에 들어가 차량 정보
export class MainCar {
  @ApiProperty({ description: '차명 (카렌스)' })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true })
  name: string;

  @ApiProperty({ description: '트림 (프리스티지)', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  model?: string;

  @ApiProperty({ description: '연식', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  age?: string;

  @ApiProperty({ description: '차량 등록일', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  regDate?: string;

  @ApiProperty({ description: '차대번호', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  idNumber?: string;

  @ApiProperty({ description: '차량 등록번호' })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true })
  regNumber: string;

  @ApiProperty({ description: '주행거리', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  distance?: string;
}

// 정비내역서에 들어가 고객 정보
export class MainCustomer {
  @ApiProperty({ description: '전화번호' })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
    required: true,
  })
  phoneNumber: string;

  @ApiProperty({ description: '고객명', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  name?: string;

  @ApiProperty({ description: '고객 오브젝트ID', required: false })
  @IsOptional()
  @IsMongoId()
  @prop({ trim: true })
  _oID?: string;
}

// 정비내역 정보
export class MainWork {
  @ApiProperty({ description: '작업내용/부품명. Part에서 복사' })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true })
  name: string;

  @ApiProperty({ description: '부품코드. Part에서 복사', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  code?: string;

  @ApiProperty({
    description: '국토교통부 정비내역 코드. Part에서 복사',
    required: false,
  })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  tsCode?: string;

  @ApiProperty({
    description: '부품 타입',
    default: MainPartsType.A,
    required: false,
  })
  @IsOptional()
  @IsEnum(MainPartsType)
  @prop({ trim: true })
  type?: MainPartsType; // 작업일 경우 기입 불필요

  @ApiProperty({ description: '단가' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  price: number = 0;

  @ApiProperty({ description: '수량' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  quantity: number = 1;

  @ApiProperty({ description: '기술료' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  wage: number = 0;
}

// 가격 정보
export class MainPrice {
  @ApiProperty({ description: '부가세 포함/별도 여부' })
  @IsOptional()
  @IsBoolean()
  @prop({ required: true, default: true })
  isIncluded: boolean = true;

  @ApiProperty({ description: '부품계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  partsSum: number = 0;

  @ApiProperty({ description: '기술료계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  wageSum: number = 0;

  @ApiProperty({ description: '합계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  sum: number = 0;

  @ApiProperty({ description: '할인' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  discount: number = 0;

  @ApiProperty({ description: '부가세' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  vat: number = 0;

  @ApiProperty({ description: '총계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  total: number = 0;

  @ApiProperty({ description: '현금' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  cash: number = 0;

  @ApiProperty({ description: '카드' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  credit: number = 0;

  @ApiProperty({ description: '보험' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  insurance: number = 0;

  @ApiProperty({ description: '잔액(외상)' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  balance: number = 0;
}

// 시간 정보
export class MainDates {
  @ApiProperty({ description: '입고일', required: false }) // 견적진행 클릭(DB 추가)
  @IsOptional()
  @IsString()
  @prop()
  stored?: Date;

  @ApiProperty({ description: '정비시작', required: false }) // 정비 진행 클릭
  @IsOptional()
  @IsString()
  @prop()
  startMa?: Date;

  @ApiProperty({ description: '정비완료', required: false }) // 정비 완료 클릭
  @IsOptional()
  @IsString()
  @prop()
  endMa?: Date;

  @ApiProperty({ description: '출고', required: false }) // 실제 출고시(국토부 신고)
  @IsOptional()
  @IsString()
  @prop()
  released?: Date;
}

// 문서 발급 정보(견적서와 명세서에서 사용)
export class MainDocInfo {
  @ApiProperty({ description: '문서 오브젝트ID. 가장 최근 문서를 참조' })
  @prop({ trim: true, required: true })
  _oID: string;

  @ApiProperty({ default: '출력 일자' })
  @prop()
  prAt?: Date;

  @ApiProperty({ default: '메시지 전송일자' })
  @prop()
  msgAt?: Date;
}

// 정비내역서
export class Maintenance extends BaseEntity {
  @ApiProperty({ description: '문서번호(자동생성)', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true, unique: true }) // 자동생성
  docNum?: string;

  @ApiProperty({ description: '작업자명. 작업을 시작한 사람', required: false })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
  })
  workerName?: string;

  @ApiProperty({
    description: '국토교통부 전송 문서의 ObjectID',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  @prop({
    trim: true,
  })
  public _tsID?: string;

  @ApiProperty({ description: '작업 상태', default: MainStatus.STORED })
  @IsOptional()
  @IsEnum(MainStatus)
  @prop({
    enum: MainStatus,
    required: true,
    default: MainStatus.STORED,
  })
  status: MainStatus;

  @ApiProperty({
    description: '고객 타입(기본값으로 자동기입)',
    default: MainCustomerType.NORMAL,
    required: false,
  })
  @IsOptional()
  @IsEnum(MainCustomerType)
  @prop({
    enum: MainCustomerType,
    required: true,
    default: MainCustomerType.NORMAL,
  }) // 자동 기입
  costomerType: MainCustomerType;

  @ApiProperty({
    description: '각종 시간 정보(자동생성)',
    type: MainDates,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MainDates)
  @prop({ required: true, type: () => MainDates, _id: false }) // 자동생성
  dates?: MainDates;

  @ApiProperty({ description: '차량정보', type: MainCar })
  @IsOptional()
  @ValidateNested()
  @Type(() => MainCar)
  @prop({ required: true, type: () => MainCar, _id: false })
  car: MainCar;

  @ApiProperty({ description: '작업정보', type: [MainWork], required: false })
  @IsOptional()
  @ValidateNested({ each: true }) // 배열일 경우 each 속성 추가
  @Type(() => MainWork)
  @prop({ type: () => MainWork, _id: false })
  works?: MainWork[];

  @ApiProperty({ description: '결재정보', type: MainPrice, required: false })
  @IsOptional()
  @ValidateNested() // 배열일 경우 each 속성 추가
  @Type(() => MainPrice)
  @prop({ type: () => MainPrice, _id: false })
  price?: MainPrice;

  @ApiProperty({ description: '고객정보', type: MainCustomer })
  @IsOptional()
  @ValidateNested()
  @Type(() => MainCustomer)
  @prop({ required: true, type: () => MainCustomer, _id: false })
  customer: MainCustomer;

  @ApiProperty({
    description: '견적서 정보',
    type: MainDocInfo,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MainDocInfo)
  @prop({ type: () => MainDocInfo, _id: false })
  estimate: MainDocInfo;

  @ApiProperty({
    description: '명세서 정보',
    type: MainDocInfo,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MainDocInfo)
  @prop({ type: () => MainDocInfo, _id: false })
  statement: MainDocInfo;
}

export class MainFindOptions {
  @ApiProperty({ description: '챠량 등록번호', required: false })
  @IsOptional()
  @IsString()
  regNumber?: string;

  @ApiProperty({ description: '작업 상태', required: false })
  @IsOptional()
  @IsEnum(MainStatus)
  status?: MainStatus;

  @ApiProperty({
    description: '고객 타입(기본값으로 자동기입)',
    required: false,
  })
  @IsOptional()
  @IsEnum(MainCustomerType)
  costomerType?: MainCustomerType;
}

export class MainPubDocInfo {
  @ApiProperty({
    description: '발급 타입. 프린터 or 온라인발급',
    default: MainDocPubType.ONLINE,
  })
  @IsOptional()
  @IsEnum(MainDocPubType)
  type: MainDocPubType;

  @ApiProperty({
    description: '전화번호(옵션). 미입력시 정비장부에 기입된 번호로 전송',
  })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true })
  phoneNumber?: string;
}
