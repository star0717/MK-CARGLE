import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  isBoolean,
  IsBoolean,
  isBooleanString,
  IsBooleanString,
  IsNotEmpty,
  isNumber,
  isNumberString,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { TypegooseModule } from 'nestjs-typegoose';

/**
 * DB의 스키마로 사용할 모든 데이터 모델 클래스에 상속되는 기본 클래스
 */
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
   * @IsOptional(): 데이터 패치시 생략되어도 class-validator에 의해 exception이 발생되지 않도록 주입
   *                - 데이터 포스트시 필수 항목은 prop의 required 항목에서 설정
   *                - 사실상 모든 필드에 본 옵션을 주입해야 함
   * @IsEmail(): class-validator의 데이터 타입 검증을 위해 주입(해당하는 타입으로 주입)
   * @prop(): 스키마 옵션으로 사용
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
  @prop({ type: Number, select: false })
  __v: number;
}

// 페이지당 출력될 문서의 수의 기봅값
const defTakeNum: number = 30;
// 페이지장 출력될 문서의 최소 수
const minTakeNum: number = 1;
// 페이지장 출력될 문서의 최대 수
const maxTakeNum: number = 100;

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
  take: number = defTakeNum;

  @ApiProperty({ description: '검색 조건 필드', required: false })
  @IsOptional()
  filterKey: string;

  @ApiProperty({ description: '검색어', required: false })
  @IsOptional()
  filterValue: string;

  @ApiProperty({
    description: '검색어 포함 정규식 사용 여부',
    default: false,
    required: false,
  })
  @IsOptional()
  @Transform(strToBoolean)
  useRegSearch: boolean = false;

  // Back-end 전용. 내부 필요로 활용
  filter: Object = null;

  // Back-end 전용. 프로젝션으로 활용
  projection: string = null;

  getQuery() {
    let query = '?page=' + this.page;
    if (this.filterKey && this.filterValue) {
      query =
        query +
        '&searchField=' +
        this.filterKey +
        '&searchKeyword=' +
        this.filterValue;
      if (this.useRegSearch == true) {
        query = query + '&useRegSearch=' + this.useRegSearch;
      }
    }
    return query;
  }
}

// 페이지번호 검증
export function getValidPageNumber(params: TransformFnParams) {
  // console.log("getValidPageNumber");
  // console.log("input: " + params.value);

  params.value = parseInt(params.value);

  if (!isNumber(params.value)) {
    params.value = 1;
  }
  if (params.value <= 0) {
    params.value = 1;
  }
  return params.value;
}

// 페이지당 출력 문서 수 검증
export function getValidTakeNumber(params: TransformFnParams) {
  // console.log("getValidTakeNumber");
  // console.log("input: " + params.value);
  params.value = parseInt(params.value);

  if (!isNumber(params.value)) {
    params.value = defTakeNum;
  }

  if (params.value <= 0) {
    params.value = defTakeNum;
  } else if (params.value > maxTakeNum) {
    params.value = maxTakeNum;
  }
  return params.value;
}

export function strToBoolean(params: TransformFnParams) {
  if (params.value == 'true' || params.value == true) {
    params.value = true;
  } else {
    params.value = false;
  }
  return params.value;
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
}

export class DeleteResult {
  @ApiProperty({ description: '삭제된 데이터의 수' })
  deletedCount: number;
}

export class DbErrorInfo {
  name: string;
  code: string | number;
  codeName: string;
  key?: string;
}
