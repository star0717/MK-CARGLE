import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsArray } from 'class-validator';
import { BaseEntity } from 'src/models/base.entity';

export class TimeTable extends BaseEntity {
  @ApiProperty({ description: '월요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  mon: number[];

  @ApiProperty({ description: '화요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  tue: number[];

  @ApiProperty({ description: '수요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  wed: number[];

  @ApiProperty({ description: '목요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  thu: number[];

  @ApiProperty({ description: '금요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  fri: number[];

  @ApiProperty({ description: '토요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  sat: number[];

  @ApiProperty({ description: '일요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  sun: number[];
}
