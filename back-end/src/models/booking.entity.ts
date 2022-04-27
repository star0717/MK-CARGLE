import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BookingState, RejectReason } from 'src/constants/booking.const';
import { BaseEntity } from './base.entity';
import { MainCustomer, MainCar } from './maintenance.entity';

export class RejectOption {
  @ApiProperty({
    description: '전송번호',
    required: false,
  })
  @IsOptional()
  @IsString()
  @prop()
  phoneNumber?: string;

  @ApiProperty({
    description: '거절사유',
    required: false,
  })
  @IsOptional()
  @IsEnum(RejectReason)
  @prop({ enum: RejectReason })
  rejectReason?: RejectReason;

  @ApiProperty({
    description: '거절사유텍스트(직접입력시)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @prop()
  rejectText?: string;
}

export class Booking extends BaseEntity {
  @ApiProperty({ description: '예약접수번호' })
  @IsOptional()
  @IsString()
  @prop({ required: true })
  bookingNum?: string;

  @ApiProperty({ description: '정비희망일시' })
  @IsString()
  @prop({ required: true })
  mainHopeDate: Date;

  @ApiProperty({ description: '고객', type: MainCustomer })
  @ValidateNested()
  @Type(() => MainCustomer)
  @prop({ required: true, type: () => MainCustomer, _id: false })
  customer?: MainCustomer;

  @ApiProperty({ description: '차량', type: MainCar })
  @ValidateNested()
  @Type(() => MainCar)
  @prop({ required: true, type: () => MainCar, _id: false })
  car?: MainCar;

  @ApiProperty({ description: '정비요청내용', required: false })
  @IsOptional()
  @IsString()
  @prop()
  mainReContents?: string;

  @ApiProperty({
    description: '예약상태',
    default: BookingState.NEW,
    required: true,
  })
  @IsEnum(BookingState)
  @prop({ enum: BookingState, required: true, default: BookingState.NEW })
  bookingState: BookingState;

  @ApiProperty({
    description: '거절옵션',
    required: false,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => RejectOption)
  @prop({ type: () => RejectOption, _id: false })
  rejectOption?: RejectOption;
}

export class BookingFindOptions {
  @ApiProperty({ description: '챠량 등록번호', required: false })
  @IsOptional()
  @IsString()
  regNumber?: string;

  @ApiProperty({ description: '고객 전화번호', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: '정비희망일시', required: false })
  @IsOptional()
  @IsString()
  mainHopeDate?: any;

  @ApiProperty({ description: '예약상태', required: false })
  @IsOptional()
  @IsEnum(BookingState)
  bookingState?: BookingState | string;
}
