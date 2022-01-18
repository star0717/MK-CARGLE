import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';

export class Maintenance extends BaseEntity {
  @ApiProperty({ description: '작업자명' })
  @IsOptional()
  @IsString()
  @prop({
    required: true,
    trim: true,
  })
  workerName: string;
}
