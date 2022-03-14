import { BaseEntity } from './base.entity';
import {
  MainCar,
  MainCustomer,
  MainDates,
  MainPrice,
  MainWork,
} from './maintenance.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import {
  MainCustomerType,
  MainPartsType,
} from 'src/constants/maintenance.const';

export class CompanyInfo {
  @ApiProperty({ description: '상호명' })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
    required: true,
  })
  public name: string;

  @ApiProperty({ description: '사업자등록번호' })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
    required: true,
  })
  public comRegNum: string;

  @ApiProperty({ description: '정비업등록번호' })
  @IsOptional()
  @IsString()
  @prop({
    required: [true, '정비업등록번호는 필수 항목입니다.'],
    trim: true,
  })
  public mbRegNum: string;

  @ApiProperty({ description: '대표명' })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
    required: true,
  })
  public ownerName: string;

  @ApiProperty({ description: '업태', required: false })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
  })
  public busType?: string;

  @ApiProperty({ description: '업종', required: false })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
  })
  public busItem?: string;

  @ApiProperty({ description: '전화번호' })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
    required: true,
  })
  public phoneNum: string;

  @ApiProperty({ description: '팩스번호', required: false })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
  })
  public faxNum?: string;

  @ApiProperty({ description: '주소' })
  @IsOptional()
  @IsString()
  @prop({
    trim: true,
    required: true,
  })
  public address: string;
}

export class WorkInfo {
  @ApiProperty({ description: '작업내용/부품명. Part에서 복사' })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true })
  name: string;

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

// 견적서와 명세서의 공통 항목
export class MainDoc extends BaseEntity {
  @ApiProperty({ description: '문서번호(자동생성)', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true, unique: true }) // 자동생성
  docNum: string;

  @ApiProperty({ description: '정비이력 문서번호', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true, required: true }) // 자동생성
  mainNum: string;

  @ApiProperty({ description: '고객정보', type: MainCustomer })
  @IsOptional()
  @ValidateNested()
  @Type(() => MainCustomer)
  @prop({ required: true, type: () => MainCustomer, _id: false })
  customer: MainCustomer;

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
  dates: MainDates;

  @ApiProperty({ description: '업체정보', type: CompanyInfo })
  @IsOptional()
  @ValidateNested()
  @Type(() => CompanyInfo)
  @prop({ required: true, type: () => CompanyInfo, _id: false })
  company: CompanyInfo;

  @ApiProperty({ description: '차량정보', type: MainCar })
  @IsOptional()
  @ValidateNested()
  @Type(() => MainCar)
  @prop({ required: true, type: () => MainCar, _id: false })
  car: MainCar;

  @ApiProperty({ description: '작업정보', type: [WorkInfo] })
  @IsOptional()
  @ValidateNested({ each: true }) // 배열일 경우 each 속성 추가
  @Type(() => WorkInfo)
  @prop({ required: true, type: () => WorkInfo, _id: false })
  works: WorkInfo[];

  @ApiProperty({ description: '결재정보', type: MainPrice, required: false })
  @IsOptional()
  @ValidateNested() // 배열일 경우 each 속성 추가
  @Type(() => MainPrice)
  @prop({ type: () => MainPrice, _id: false })
  price?: MainPrice;
}
