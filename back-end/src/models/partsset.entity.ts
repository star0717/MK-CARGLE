import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';

export class PartsSet extends BaseEntity {
  @ApiProperty({ description: '부품세트명' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: true,
    trim: true,
  })
  name: string;

  @ApiProperty({ description: '부품세트에 포함된 부품들의 code들' })
  @IsOptional()
  @IsArray()
  @prop({ type: String }) // SubDocument Array를 만들 땐 타입만 선언
  partsCodes: string[];
}
