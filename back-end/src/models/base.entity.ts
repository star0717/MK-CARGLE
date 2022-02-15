import { ApiProperty } from '@nestjs/swagger';
import { index, prop } from '@typegoose/typegoose';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { TypegooseModule } from 'nestjs-typegoose';
import {
  getValidPageNumber,
  getValidSearchYear,
  getValidTakeNumber,
  strToBoolean,
} from 'src/lib/toolkit/back-end.toolkit';
import { defTakeNum, maxTakeNum, minTakeNum } from 'src/constants/model.const';

/**
 * DB의 스키마로 사용할 모든 데이터 모델 클래스에 상속되는 기본 클래스
 */
@index({ createdAt: 1 })
export class BaseEntity extends TypegooseModule {
  /**
   * 데이터 모델 개발법
   * 단일 클래스를 Schema, CreateDto, UpdateDto용으로 혼용하는 것을 목적으로 함
   * - CreateDto: 데이터 생성시 사용
   *              - 데이터 생성에 필요한 항목들은 @isString 등의 데코레이터가 주입됨
   * - UpdateDto: 데이터 패치시 사용. CreateDto의 전체 혹은 일부 항목들을 허용해야 함(PartialType)
   *              - 항목 생략을 허용하기 위해 모든 항목들은 @isOptional 데코레이터가 주입됨
   * - Schema: @prop 데코레이터를 통해 스키마 옵션 설정
   *              - 설정 된 옵션을 데이터 생성(추가)시 적용되는 옵션을 의미함
   *
   * 데코레이터 주입 방법
   * 하단의 4종의 데코레이터를 용도에 맞게 사용
   * @ApiProperty(): Swagger를 통한 API 문서 생성용 주석 주입에 사용
   *  - 필수가 아닐 경우 required: false 추가
   * @IsOptional(): 데이터 패치시 생략되어도 class-validator에 의해 exception이 발생되지 않도록 주입
   *                - 데이터 포스트시 필수 항목은 prop의 required 항목에서 설정
   *                - 사실상 모든 필드에 본 옵션을 주입해야 함
   * @IsEmail(): class-validator의 데이터 타입 검증을 위해 주입(해당하는 타입으로 주입)
   * @prop(): 스키마 옵션으로 사용
   *  - 필수일 경우 , required: true 추가. 기본값은 false
   *
   * required 처리
   * - 실제 key 선언에서 ? 처리
   * - true: prop에 required:true 추가. 기본값은 false
   * - false: ApiProperty에 required:false 추가. 기본값은 true
   * - DTO로는 불필요하지만 스키마로는 필요하다면 ApiProperty에 required:false,
   *   ApiProperty에 required:false로 설정
   */

  @ApiProperty({ description: '오브젝트 ID (자동 생성)', required: false })
  public _id: string;

  @ApiProperty({ description: '데이터 생성 시점 (자동 생성)', required: false })
  @prop()
  public createdAt: Date;

  @ApiProperty({ description: '데이터 갱신 시점 (자동 갱신)', required: false })
  @prop()
  public updatedAt: Date;

  @ApiProperty({ description: '데이서 소유 업체 (자동 주입)', required: false })
  @prop()
  public _cID: string;

  @ApiProperty({
    description: '데이터 작성자의 오브젝트 ID (자동 주입)',
    required: false,
  })
  @prop()
  public _uID: string;

  /**  버전값 (조회되진 않음) */
  @prop({ type: Number, select: false }) // 버전값은 조회되지 않도록 할 때
  // @prop()
  __v?: number;
}

export class FindParameters {
  @ApiProperty({
    description: '요청 페이지',
    default: 1,
    required: false,
  })
  @IsOptional()
  @Transform(getValidPageNumber)
  page?: number = 1;

  @ApiProperty({
    description: '페이지당 결과 수, 1 ~ 100 사이의 정수',
    default: defTakeNum,
    minimum: minTakeNum,
    maximum: maxTakeNum,
    required: false,
  })
  @IsOptional()
  @Transform(getValidTakeNumber)
  take?: number = defTakeNum;

  @ApiProperty({ description: '검색 조건 필드', required: false })
  @IsOptional()
  filterKey?: string;

  @ApiProperty({ description: '검색어', required: false })
  @IsOptional()
  filterValue?: string;

  @ApiProperty({
    description: '검색어 포함 정규식 사용 여부',
    default: false,
    required: false,
  })
  @IsOptional()
  @Transform(strToBoolean)
  useRegSearch?: boolean = false;

  /** 검색 기간 조건 */
  // Back-end 전용. 기간 검색 사용 여부
  useDurationSearch?: boolean;

  @ApiProperty({
    description: '검색 시작일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sFrom?: Date;

  @ApiProperty({
    description: '검색 종료일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sTo?: Date;

  @ApiProperty({
    description: '검색 연도. 검색 시작일과 종료일 값이 없을 때만 동작',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(2022)
  @Max(2032)
  @Transform(getValidSearchYear)
  sYear?: number;

  // Back-end 전용. 내부 필요로 활용
  filter?: Object = null;

  // Back-end 전용. 프로젝션으로 활용
  projection?: string = null;
}

export class FindResult<T> {
  @ApiProperty({ description: '검색 결과' })
  docs: T[];

  @ApiProperty({ description: '검색 조건에 해당하는 전체 데이터의 수' })
  totalDocs: number;

  @ApiProperty({ description: '현재 페이지' })
  currentPage: number;

  @ApiProperty({ description: '마지막 페이지' })
  lastPage: number;

  @ApiProperty({
    description: '검색 연도',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(2022)
  @Max(2032)
  @Transform(getValidSearchYear)
  sYear?: number;

  @ApiProperty({
    description: '검색 시작일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sFrom?: Date;

  @ApiProperty({
    description: '검색 종료일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sTo?: Date;
}

export class DeleteObjectIds {
  @ApiProperty({ description: '삭제할 데이터들의 오브젝트 ID들' })
  @IsArray()
  ids: string[];
}

export class DeleteResult {
  @ApiProperty({ description: '삭제된 데이터의 수' })
  deletedCount: number;
}

export class DbErrorInfo {
  name: string;
  code?: string | number;
  key?: string;
}

// 부가정보. Post나 Patch시 전달할 정보
export class OptionalInfo {
  @ApiProperty({ description: '부가정보1' })
  @IsOptional()
  @IsString()
  public info1?: string | null;

  @ApiProperty({ description: '부가정보2' })
  @IsOptional()
  @IsString()
  public info2?: string | null;

  @ApiProperty({ description: '부가정보3' })
  @IsOptional()
  @IsString()
  public info3?: string | null;
}
