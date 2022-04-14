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
import { BookingState } from 'src/constants/booking.const';
import { BaseEntity } from './base.entity';
import { MainCustomer, MainCar } from './maintenance.entity';

export class Booking extends BaseEntity {
  @ApiProperty({ description: '예약접수번호' })
  @IsString()
  @prop({ required: true })
  bookingNum: string;

  @ApiProperty({ description: '예약접수일자' })
  @IsString()
  @prop({ required: true })
  bookingDate: Date;

  @ApiProperty({ description: '정비희망일자' })
  @IsString()
  @prop({ required: true })
  mainHopeDate: Date;

  @ApiProperty({ description: '고객', type: MainCustomer })
  @ValidateNested()
  @Type(() => MainCustomer)
  @prop({ required: true, type: () => MainCustomer, _id: false })
  customer: MainCustomer;

  @ApiProperty({ description: '차량', type: MainCar })
  @ValidateNested()
  @Type(() => MainCar)
  @prop({ required: true, type: () => MainCar, _id: false })
  car: MainCar;

  @ApiProperty({ description: '정비요청내용', required: false })
  @IsString()
  @prop()
  mainReContents: string;

  @ApiProperty({
    description: '예약상태',
    default: BookingState.NEW,
    required: true,
  })
  @IsEnum(BookingState)
  @prop({ enum: BookingState, required: true, default: BookingState.NEW })
  bookingState: BookingState;
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
}
