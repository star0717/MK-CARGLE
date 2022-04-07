import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseEntity } from './base.entity';

export class Hours {
  @ApiProperty({ description: '영업시작시간', required: false })
  @IsOptional()
  @IsDate()
  @prop()
  openingHours?: Date;

  @ApiProperty({ description: '영업종료시간', required: false })
  @IsOptional()
  @IsDate()
  @prop()
  closingHours?: Date;

  @ApiProperty({ description: '휴식시작시간', required: false })
  @IsOptional()
  @IsDate()
  @prop()
  breakTime?: Date;

  @ApiProperty({ description: '휴식종료시간', required: false })
  @IsOptional()
  @IsDate()
  @prop()
  breakEndTime?: Date;
}

export class OfficeHours {
  @ApiProperty({ description: '월요일', required: false })
  @IsOptional()
  @Type(() => Hours)
  @prop()
  MON?: Hours;

  @ApiProperty({ description: '화요일', required: false })
  @IsOptional()
  @Type(() => Hours)
  @prop()
  TUE?: Hours;

  @ApiProperty({ description: '수요일', required: false })
  @IsOptional()
  @Type(() => Hours)
  @prop()
  WED?: Hours;

  @ApiProperty({ description: '목요일', required: false })
  @IsOptional()
  @Type(() => Hours)
  @prop()
  THU?: Hours;

  @ApiProperty({ description: '금요일', required: false })
  @IsOptional()
  @Type(() => Hours)
  @prop()
  FRI?: Hours;

  @ApiProperty({ description: '토요일', required: false })
  @IsOptional()
  @Type(() => Hours)
  @prop()
  SET?: Hours;

  @ApiProperty({ description: '일요일', required: false })
  @IsOptional()
  @Type(() => Hours)
  @prop()
  SUN?: Hours;
}

export class Mprice {
  @ApiProperty({ description: '정비항목', required: false })
  @IsOptional()
  @IsString()
  @prop()
  mainItems?: string;

  @ApiProperty({ description: '가격', required: false })
  @IsOptional()
  @IsNumber()
  @prop()
  mainPrice?: number;
}

export class SetBooking extends BaseEntity {
  @ApiProperty({ description: '카센터 소개글', required: false })
  @IsOptional()
  @IsString()
  @prop()
  intro?: string;

  @ApiProperty({ description: '휴무일', required: false })
  @IsOptional()
  @IsArray()
  @prop()
  dayOff?: string[];

  @ApiProperty({ description: '영업시간' })
  @Type(() => OfficeHours)
  @prop({ required: true })
  officeHour: OfficeHours;

  @ApiProperty({ description: '리프트 수량', required: false })
  @IsOptional()
  @IsNumber()
  @prop()
  lift?: number;

  @ApiProperty({ description: '주요 정비 가격', required: false })
  @IsOptional()
  @IsArray()
  @prop()
  mPrice?: Mprice[];
}
