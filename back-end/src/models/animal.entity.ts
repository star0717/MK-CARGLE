import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "./base.entity";

export class Animal extends BaseEntity {
    @ApiProperty({ description: "이름", default: "박충범" })
    @IsOptional()
    @IsString()
    @prop({
        unique: false,
        required: [true, "사업자 ID는 필수 항목입니다."],
        trim: true,
    })
    public name: string;
}
