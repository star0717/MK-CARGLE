/*****************************************************************
 * 국토부 정비이력 관련 체계
 *****************************************************************/

import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { removePropertyWithEmptyValue } from 'src/lib/toolkit/back-end.toolkit';
import { BaseEntity } from './base.entity';

// 부품 아이템 클래스
export class Part extends BaseEntity {
  @ApiProperty({
    description: '분류 레이블 (A부터 O까지의 대문자 알파벳)',
  })
  @IsOptional()
  @IsString()
  @prop({
    required: true,
    trim: true,
  })
  label: string;

  @ApiProperty({
    description: '부품명',
  })
  @IsOptional()
  @IsString()
  @prop({
    required: true,
    trim: true,
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: '별칭. 부품 동의어',
  })
  @IsOptional()
  @IsArray()
  @prop({ type: String })
  nickName: string[];

  @ApiProperty({
    description: '부품 코드',
  })
  @IsOptional()
  @IsString()
  @prop({
    required: true,
    trim: true,
    unique: true,
  })
  code: string;

  @ApiProperty({
    description: '국토부 정비이력 코드 (ex. B01)',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @Transform(removePropertyWithEmptyValue)
  @prop({
    required: false,
    trim: true,
  })
  tsCode?: string;

  @ApiProperty({
    description: '버전값. Back-end에서 자동 기입',
  })
  @prop()
  __v?: number;
}
