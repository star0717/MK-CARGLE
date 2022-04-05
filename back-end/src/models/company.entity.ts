import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseEntity } from './base.entity';
import { prop } from '@typegoose/typegoose';
import { CompanyApproval } from 'src/constants/model.const';

export class Company extends BaseEntity {
  @ApiProperty({ description: '상호명' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [true, '상호명은 필수 항목입니다.'],
    trim: true,
  })
  public name: string;

  @ApiProperty({ description: '사업자등록번호' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: [true, '사업자등록번호는 필수 항목입니다.'],
    trim: true,
  })
  public comRegNum: string;

  @ApiProperty({ description: '정비업등록번호' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: [true, '정비업등록번호는 필수 항목입니다.'],
    trim: true,
  })
  public mbRegNum: string;

  @ApiProperty({ description: '정비업종', required: false })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [false, '정비업종은 필수 항목입니다.'],
    trim: true,
  })
  public mbTypeNum: string;

  @ApiProperty({ description: '대표명' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [false, '대표명은 필수 항목입니다.'],
    trim: true,
  })
  public ownerName: string;

  @ApiProperty({ description: '업태', required: false })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [false, '업태는 필수 항목입니다.'],
    default: '정비업',
    trim: true,
  })
  public busType: string;

  @ApiProperty({ description: '업종', required: false })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [false, '업종은 필수 항목입니다.'],
    default: '차량수리',
    trim: true,
  })
  public busItem: string;

  @ApiProperty({ description: '전화번호' })
  @IsOptional()
  @IsString()
  @prop({
    unique: true,
    required: [true, '전화번호는 필수 항목입니다.'],
  })
  public phoneNum: string;

  @ApiProperty({ description: '팩스번호' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [false, '팩스번호는 필수 항목입니다.'],
  })
  public faxNum: string;

  @ApiProperty({ description: '사업장 우편 번호' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [true, '사업장 주소는 필수 항목입니다.'],
    trim: true,
  })
  public postcode: string;

  @ApiProperty({ description: '사업장 주소' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [true, '사업장 주소는 필수 항목입니다.'],
    trim: true,
  })
  public address1: string;

  @ApiProperty({ description: '사업장 상세 주소' })
  @IsOptional()
  @IsString()
  @prop({
    unique: false,
    required: [true, '사업장 상세 주소는 필수 항목입니다.'],
    trim: true,
  })
  public address2: string;

  @ApiProperty({
    description: '승인여부',
    default: CompanyApproval.BEFORE,
    required: false,
  })
  @IsOptional()
  @prop({
    unique: false,
    required: true,
    default: CompanyApproval.BEFORE,
  })
  public approval: CompanyApproval;
}
