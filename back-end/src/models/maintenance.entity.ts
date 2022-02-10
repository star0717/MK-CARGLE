import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import {
  MainCustomerType,
  MainPartsType,
  MainStatus,
} from 'src/constants/maintenance.const';

import { BaseEntity } from './base.entity';

// 정비내역서에 들어가 차량 정보
export class Car {
  @ApiProperty({ description: '차명 (카렌스)' })
  @IsOptional()
  @IsString()
  @prop()
  name?: string;

  @ApiProperty({ description: '트림 (프리스티지)' })
  @IsOptional()
  @IsString()
  @prop()
  model?: string;

  @ApiProperty({ description: '연식' })
  @IsOptional()
  @IsString()
  @prop()
  age?: string;

  @ApiProperty({ description: '차량 등록일' })
  @IsOptional()
  @IsString()
  @prop()
  regDate?: string;

  @ApiProperty({ description: '차대번호' })
  @IsOptional()
  @IsString()
  @prop({ required: true })
  idNumber: string;

  @ApiProperty({ description: '차량 등록번호' })
  @IsOptional()
  @IsString()
  @prop()
  regNumber?: string;

  @ApiProperty({ description: '주행거리' })
  @IsOptional()
  @IsString()
  @prop()
  distance?: string;
}

// 정비내역서에 들어가 고객 정보
export class Customer {
  @ApiProperty({ description: '전화번호' })
  @IsOptional()
  @IsString()
  @prop()
  phoneNumber: string;

  @ApiProperty({ description: '고객 오브젝트ID' })
  @IsOptional()
  @IsMongoId()
  @prop()
  _oID?: string;
}

// 정비내역 정보
export class Work {
  @ApiProperty({ description: '작업내용/부품명. Part에서 복사' })
  @IsOptional()
  @IsString()
  @prop({ required: true })
  name: string;

  @ApiProperty({ description: '부품코드. Part에서 복사' })
  @IsOptional()
  @IsString()
  @prop()
  code?: string;

  @ApiProperty({ description: '국토교통부 정비내역 코드. Part에서 복사' })
  @IsOptional()
  @IsString()
  @prop()
  tsCode?: string;

  @ApiProperty({ description: '부품 타입', default: MainPartsType.A })
  @IsOptional()
  @IsEnum(MainPartsType)
  @prop()
  type?: MainPartsType;

  @ApiProperty({ description: '단가' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  price: number;

  @ApiProperty({ description: '수량' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  quantity: number;

  @ApiProperty({ description: '기술료' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  wage: number;
}

// 가격 정보
export class Price {
  @ApiProperty({ description: '부가세 포함/별도 여부' })
  @IsOptional()
  @IsBoolean()
  @prop({ required: true, default: true })
  isIncluded: boolean;

  @ApiProperty({ description: '부품계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  partsSum: number;

  @ApiProperty({ description: '기술료계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  wageSum: number;

  @ApiProperty({ description: '합계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  sum: number;

  @ApiProperty({ description: '할인' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  discount: number;

  @ApiProperty({ description: '부가세' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  vat: number;

  @ApiProperty({ description: '총계' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  total: number;

  @ApiProperty({ description: '현금' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  cash: number;

  @ApiProperty({ description: '카드' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  credit: number;

  @ApiProperty({ description: '보험' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  insurance: number;

  @ApiProperty({ description: '잔액(외상)' })
  @IsOptional()
  @IsNumber()
  @prop({ required: true })
  balance: number;
}

// 시간 정보
export class Dates {
  @ApiProperty({ description: '입고일' }) // 견적진행 클릭(DB 추가)
  @IsOptional()
  @IsString()
  @prop()
  stored?: Date;

  @ApiProperty({ description: '정비시작' }) // 정비 진행 클릭
  @IsOptional()
  @IsString()
  @prop()
  startMa?: Date;

  @ApiProperty({ description: '정비완료' }) // 정비 완료 클릭
  @IsOptional()
  @IsString()
  @prop()
  endMa?: Date;

  @ApiProperty({ description: '출고' }) // 실제 출고시(국토부 신고)
  @IsOptional()
  @IsString()
  @prop()
  released?: Date;
}

// 정비내역서
export class Maintenance extends BaseEntity {
  @ApiProperty({ description: '문서번호(자동생성)' })
  docNum?: string;

  @ApiProperty({ description: '작업자명. 작업을 시작한 사람' })
  @IsOptional()
  @IsString()
  @prop({
    required: true,
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
    required: false,
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
    description: '고객 타입',
    default: MainCustomerType.NORMAL,
  })
  @IsOptional()
  @IsEnum(MainCustomerType)
  @prop({
    enum: MainCustomerType,
    required: true,
    default: MainCustomerType.NORMAL,
  })
  costomerType: MainCustomerType;

  @ApiProperty({ description: '각종 시간 정보', type: Dates })
  @IsOptional()
  @ValidateNested()
  @Type(() => Dates)
  @prop({ type: () => Dates, _id: false })
  dates: Dates;

  @ApiProperty({ description: '차량정보', type: Car })
  @IsOptional()
  @ValidateNested()
  @Type(() => Car)
  @prop({ type: () => Car, _id: false })
  car: Car;

  @ApiProperty({ description: '작업정보', type: [Work] })
  @IsOptional()
  @ValidateNested({ each: true }) // 배열일 경우 each 속성 추가
  @Type(() => Work)
  @prop({ type: () => Work, _id: false })
  works: Work[];

  @ApiProperty({ description: '결재정보', type: Price })
  @IsOptional()
  @ValidateNested() // 배열일 경우 each 속성 추가
  @Type(() => Price)
  @prop({ type: () => Price, _id: false })
  price: Price;

  @ApiProperty({ description: '고객정보', type: Customer })
  @IsOptional()
  @ValidateNested()
  @Type(() => Customer)
  @prop({ type: () => Customer, _id: false })
  customer: Customer;
}
