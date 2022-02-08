import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  MaintenanceCustomerType,
  MaintenancePartsType,
  MaintenanceStatus,
} from 'src/constants/model.const';
import { BaseEntity } from './base.entity';

// 정비내역서에 들어가 차량 정보
export class CarInfo {
  @ApiProperty({ description: '차명 (카렌스)' })
  name: string;

  @ApiProperty({ description: '트림 (프리스티지)' })
  model?: string;

  @ApiProperty({ description: '연식' })
  age?: string;

  @ApiProperty({ description: '차량 등록일' })
  regDate?: string;

  @ApiProperty({ description: '차대번호' })
  idNumber: string;

  @ApiProperty({ description: '차량 등록번호' })
  regNumber: string;

  @ApiProperty({ description: '주행거리' })
  distance?: string;
}

// 정비내역서에 들어가 고객 정보
export class CustomerInfo {
  @ApiProperty({ description: '고객명' })
  name: string;

  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;
}

// 정비내역 정보
export class WorkInfo {
  @ApiProperty({ description: '작업내용/부품명. Part에서 복사' })
  name: string;

  @ApiProperty({ description: '부품코드. Part에서 복사' })
  code?: string;

  @ApiProperty({ description: '국토교통부 정비내역 코드. Part에서 복사' })
  tsCode?: string;

  @ApiProperty({ description: '부품 타입' })
  type: MaintenancePartsType;

  @ApiProperty({ description: '단가' })
  price: string;

  @ApiProperty({ description: '수량' })
  quantity: string;

  @ApiProperty({ description: '기술료' })
  wage?: string;
}

// 정비내역서
export class Maintenance extends BaseEntity {
  @ApiProperty({ description: '입고일' })
  @IsOptional()
  @IsDate()
  @prop({
    required: false,
  })
  storedAt?: Date;

  @ApiProperty({ description: '출고일' })
  @IsOptional()
  @IsDate()
  @prop({
    required: false,
  })
  releasedAt?: Date;

  @ApiProperty({ description: '작업자명. 작업을 시작한 사람' })
  @IsOptional()
  @IsString()
  @prop({
    required: true,
    trim: true,
  })
  workerName: string;

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

  @ApiProperty({ description: '작업 상태', default: MaintenanceStatus.STORED })
  @IsOptional()
  @IsEnum(MaintenanceStatus)
  @prop({
    enum: MaintenanceStatus,
    required: true,
    default: MaintenanceStatus.STORED,
  })
  status: MaintenanceStatus;

  @ApiProperty({
    description: '고객 타입',
    default: MaintenanceCustomerType.NORMAL,
  })
  @IsOptional()
  @IsEnum(MaintenanceCustomerType)
  @prop({
    enum: MaintenanceCustomerType,
    required: true,
    default: MaintenanceCustomerType.NORMAL,
  })
  costomerType: MaintenanceCustomerType;

  @ApiProperty({ description: '차량정보' })
  @IsOptional()
  @Type(() => CarInfo)
  carInfo: CarInfo;

  @ApiProperty({ description: '고객정보' })
  @IsOptional()
  @Type(() => CustomerInfo)
  customer: CustomerInfo;
}
