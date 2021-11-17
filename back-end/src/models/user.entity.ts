import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose"
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsMongoId, MinLength, MaxLength, IsDateString } from 'class-validator';
import { BaseEntity } from "./base.entity";
import { hashSync } from "bcrypt"
const saltRounds = 10;



/**
 * 사용자의 권한
 */
export enum UserAuthority {
    ADMIN = 'admin',    // MK의 시스템 관리자
    OWNER = 'owner',    // 카센터
    WORKER = 'worker'   // 카센터 직원
}

/**
 * 사용자 모델 스키마
 */
export class User extends BaseEntity {

    @ApiProperty({ description: "메일주소", default: "example@mklc.co.kr" })
    @IsOptional()
    @IsEmail()
    @prop({
        unique: true,
        required: [true, "메일주소는 필수 항목입니다."],
        trim: true,
    })
    public email: string;

    @ApiProperty({ description: "비밀번호. 매뉴얼 로그인에서 사용(소셜로그인에서 사용 안함)" })
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @prop({
        unique: false,
        required: true,
        trim: true,
        select: false,
        set: (val: string) => hashSync(val, saltRounds),    // 비밀번호
        get: (val: string) => val,
    })
    public password: string;

    @ApiProperty({ description: "사용자권한", default: UserAuthority.WORKER })
    @IsOptional()
    @IsEnum(UserAuthority)
    @prop({
        enum: UserAuthority,
        required: [true, "사용자권한은 필수 항목입니다."],
        default: UserAuthority.OWNER
    })
    public auth: UserAuthority;


    @ApiProperty({ description: "사용자명" })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [true, "사용자명은 필수 항목입니다."],
        trim: true,
    })
    public name: string;

    @ApiProperty({ description: "업체의 ObjectID", required: false })
    @IsOptional()
    @IsMongoId()
    @prop({
        unique: false,
        required: [false, "사업자 ID는 필수 항목입니다."],
        trim: true,
    })
    public _cID: string;

    @ApiProperty({ description: "핸드폰번호" })
    @IsOptional()
    @IsString()
    @prop({
        unique: true,
        required: [true, "핸드폰번호는 필수 항목입니다."],
        trim: true,
    })
    public hpNumber: string;

    @ApiProperty({ description: "자택 주소", required: false })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [false, "자택 주소는 필수 항목입니다."],
        trim: true,
    })
    public address: string;

    @ApiProperty({ description: "입사일", required: false })
    @IsOptional()
    @IsDateString()
    @prop({
        unique: false,
        required: [false, "입사일 주소는 필수 항목입니다."],
    })
    public joinDate: Date;

    @ApiProperty({ description: "승인여부", default: false, required: false })
    @IsOptional()
    @IsBoolean()
    @prop({
        unique: false,
        required: true,
        default: false,
    })
    public approval: boolean;
}
