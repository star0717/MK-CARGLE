import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsArray } from 'class-validator';
import { BaseEntity } from 'src/models/base.entity';

export class TimeTable extends BaseEntity {
  @ApiProperty({ description: '월요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  mon: string[];

  @ApiProperty({ description: '화요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  tue: string[];

  @ApiProperty({ description: '수요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  wed: string[];

  @ApiProperty({ description: '목요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  thu: string[];

  @ApiProperty({ description: '금요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  fri: string[];

  @ApiProperty({ description: '토요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  sat: string[];

  @ApiProperty({ description: '일요일 예약여부' })
  @IsArray()
  @prop({ required: true })
  sun: string[];
}
