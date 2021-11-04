import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "./base.entity";
import { prop } from "@typegoose/typegoose"

export class Company extends BaseEntity {

    @ApiProperty({ description: "상호명" })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [true, "상호명은 필수 항목입니다."],
        trim: true,
    })
    public name: string;

    @ApiProperty({ description: "사업자등록번호" })
    @IsOptional()
    @IsNumber()
    @prop({
        unique: true,
        required: [true, "사업자등록번호는 필수 항목입니다."],
    })
    public comRegNum: number;

    @ApiProperty({ description: "정비업등록번호" })
    @IsOptional()
    @IsNumber()
    @prop({
        unique: true,
        required: [true, "정비업등록번호는 필수 항목입니다."],
    })
    public mbRegNum: number;

    @ApiProperty({ description: "정비업종" })
    @IsOptional()
    @IsNumber()
    @prop({
        unique: false,
        required: [true, "정비업종은 필수 항목입니다."],
    })
    public mbTypeNum: number;

    @ApiProperty({ description: "대표명" })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [true, "대표명은 필수 항목입니다."],
        trim: true,
    })
    public ownerName: string;

    @ApiProperty({ description: "업태" })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [true, "업태는 필수 항목입니다."],
        default: "정비업",
        trim: true,
    })
    public busType: string;

    @ApiProperty({ description: "업종" })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [true, "업종은 필수 항목입니다."],
        default: "차량수리",
        trim: true,
    })
    public busItem: string;

    @ApiProperty({ description: "전화번호" })
    @IsOptional()
    @IsNumber()
    @prop({
        unique: true,
        required: [true, "전화번호는 필수 항목입니다."],
    })
    public phoneNum: number;

    @ApiProperty({ description: "팩스번호" })
    @IsOptional()
    @IsNumber()
    @prop({
        unique: true,
        required: [false, "팩스번호는 필수 항목입니다."],
    })
    public faxNum: number;

    @ApiProperty({ description: "사업장 주소" })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [true, "사업장 주소는 필수 항목입니다."],
    })
    public address: string;

    @ApiProperty({ description: "승인여부", default: false })
    @IsOptional()
    @prop({
        unique: false,
        required: true,
        default: false,
    })
    public approval: boolean;
}
