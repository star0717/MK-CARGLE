import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';

/**
 * 거래처의 연락처 정보를 저장하는 스키마
 */
export class Agency extends BaseEntity {
  @ApiProperty({ description: '상호명' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [true, '상호명은 필수 항목입니다.'],
    trim: true,
  })
  public name: string;

  @ApiProperty({ description: '담당자' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: false,
    trim: true,
  })
  public manager: string;

  @ApiProperty({ description: '전화번호' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: false,
  })
  public phoneNum: string;

  @ApiProperty({ description: '휴대전화 번호' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: false,
  })
  public hpNum: string;

  @ApiProperty({ description: '사업장 주소' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: false,
    trim: true,
  })
  public address1: string;

  @ApiProperty({ description: '사업장 상세 주소' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: false,
    trim: true,
  })
  public address2: string;

  @ApiProperty({ description: '메모' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: false,
    trim: true,
  })
  public memo?: string;
}
