import { TypegooseModule } from 'nestjs-typegoose';
/**
 * DB의 스키마로 사용할 모든 데이터 모델 클래스에 상속되는 기본 클래스
 */
export declare class BaseEntity extends TypegooseModule {
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
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    _cID: string;
    _uID: string;
    /**  버전값 (조회되진 않음) */
    __v?: number;
}
export declare class FindParameters {
    page?: number;
    take?: number;
    filterKey?: string;
    filterValue?: string;
    useRegSearch?: boolean;
    /** 검색 기간 조건 */
    useDurationSearch?: boolean;
    sFrom?: Date;
    sTo?: Date;
    sYear?: number;
    filter?: Object;
    projection?: string;
}
export declare class FindResult<T> {
    docs: T[];
    totalDocs: number;
    currentPage: number;
    lastPage: number;
    sYear?: number;
    sFrom?: Date;
    sTo?: Date;
}
export declare class DeleteObjectIds {
    ids: string[];
}
export declare class DeleteResult {
    deletedCount: number;
}
export declare class DbErrorInfo {
    name: string;
    code?: string | number;
    key?: string;
}
export declare class OptionalInfo {
    info1?: string | null;
    info2?: string | null;
    info3?: string | null;
}
