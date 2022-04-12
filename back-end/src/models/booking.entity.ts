import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { BookingState } from 'src/constants/booking.const';
import { BaseEntity } from './base.entity';
import { MainCustomer, MainCar } from './maintenance.entity';

export class Booking extends BaseEntity {
  @ApiProperty({ description: '예약접수일자' })
  @IsDate()
  @prop({ required: true, type: Date })
  bookingDate: Date;

  @ApiProperty({ description: '정비희망일자' })
  @IsDate()
  @prop({ required: true, type: Date })
  mainHopeDate: Date;

  @ApiProperty({ description: '고객' })
  @Type(() => MainCustomer)
  @prop({ required: true, type: MainCustomer, _id: false })
  customer: MainCustomer;

  @ApiProperty({ description: '차량' })
  @Type(() => MainCar)
  @prop({ required: true, type: MainCar, _id: false })
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
  @IsString()
  @prop({ required: true, default: BookingState.NEW })
  bookingState: BookingState;
}
