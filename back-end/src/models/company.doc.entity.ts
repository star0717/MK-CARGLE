import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export class CompanyDocList {
  @ApiProperty({ description: '사업자등록증 파일명' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: false,
    trim: true,
  })
  public crn: string;

  @ApiProperty({ description: '정비업등록증 파일명' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: false,
    trim: true,
  })
  public mrn: string;

  @ApiProperty({ description: '도장 파일명' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: false,
    trim: true,
  })
  public stamp: string;
}
