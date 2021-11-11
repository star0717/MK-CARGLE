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
     * @IsOptional(): 데이터 패치시 생략되어도 class-validator에 의해 exception이 발생되지 않도록 주입
     *                - 데이터 포스트시 필수 항목은 prop의 required 항목에서 설정
     *                - 사실상 모든 필드에 본 옵션을 주입해야 함
     * @IsEmail(): class-validator의 데이터 타입 검증을 위해 주입(해당하는 타입으로 주입)
     * @prop(): 스키마 옵션으로 사용
     */
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export declare class PaginateOptions {
    static defaultTakeNumber: number;
    static maxTakeNumber: number;
    page?: number;
    readonly take: number;
    searchField: string;
    searchKeyword: string;
    useRegSearch: boolean;
    getQuery(): string;
}
export declare function getValidPageNumber(params: TransformFnParams): any;
export declare function getValidTakeNumber(params: TransformFnParams): any;
export declare function strToBoolean(params: TransformFnParams): boolean;
export declare class PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    currentPage: number;
    lastPage: number;
}
export declare class DeleteResult {
    deletedCount: number;
}
