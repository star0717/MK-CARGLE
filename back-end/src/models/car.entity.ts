import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';

// 정비내역서에 들어가 차량 정보
export class Car extends BaseEntity {
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
  @prop({ trim: true, required: true, unique: true })
  regNumber: string;

  @ApiProperty({ description: '주행거리', required: false })
  @IsOptional()
  @IsString()
  @prop({ trim: true })
  distance?: string;
}
