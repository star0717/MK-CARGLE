import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
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
  MainPartsType,
  MainStatus,
} from 'src/constants/maintenance.const';

import { BaseEntity } from './base.entity';

// 정비내역서에 들어가 차량 정보
export class CarInfo {
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
export class Customer {
  @ApiProperty({ description: '전화번호' })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true })
  phoneNumber: string;

  @ApiProperty({ description: '고객 오브젝트ID', required: false })
  @IsOptional()
  @IsMongoId()
  @prop({ trim: true })
  _oID?: string;
}

// 정비내역 정보
export class Work {
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
export class Price {
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
export class Dates {
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

// 정비내역서
export class Maintenance extends BaseEntity {
  @ApiProperty({ description: '문서번호(자동생성)', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true }) // 자동생성
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
    type: Dates,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Dates)
  @prop({ required: true, type: () => Dates, _id: false }) // 자동생성
  dates?: Dates;

  @ApiProperty({ description: '차량정보', type: CarInfo })
  @IsOptional()
  @ValidateNested()
  @Type(() => CarInfo)
  @prop({ required: true, type: () => CarInfo, _id: false })
  car: CarInfo;

  @ApiProperty({ description: '작업정보', type: [Work], required: false })
  @IsOptional()
  @ValidateNested({ each: true }) // 배열일 경우 each 속성 추가
  @Type(() => Work)
  @prop({ type: () => Work, _id: false })
  works?: Work[];

  @ApiProperty({ description: '결재정보', type: Price, required: false })
  @IsOptional()
  @ValidateNested() // 배열일 경우 each 속성 추가
  @Type(() => Price)
  @prop({ type: () => Price, _id: false })
  price?: Price;

  @ApiProperty({ description: '고객정보', type: Customer })
  @IsOptional()
  @ValidateNested()
  @Type(() => Customer)
  @prop({ required: true, type: () => Customer, _id: false })
  customer: Customer;
}
