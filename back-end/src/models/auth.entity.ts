import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Company } from "./company.entity";
import { User } from "./user.entity";

/**
 * 회원 가입 정보용 DTO
 */
export class SignUpInfo {
    @ApiProperty({ description: "회원 가입에 사용할 사용자 정보" })
    @ValidateNested()
    @Type(() => User)
    public user: User;

    @ApiProperty({ description: "회원 가입에 사용할 업체 정보 (오너 가입시에만 사용)" })
    @IsOptional()
    @ValidateNested()
    @Type(() => Company)
    public company: Company;
}

/**
 * 로그인을 시도할 때 사용할 사용자 정보
 * 로그인에서 사용하는 AuthGuard에서는 아래 정의된 필드명을 사용자 정보로 사용함
 * - 실제 시스템에서 로그인 식별자로 email을 이용하더라도 username 필드에 email값을 채워 보내야함
 * - 실제 데이터 맵핑은 UsersService에서 조정함
 */
export class UserInfo {

    @ApiProperty({ description: "로그인에 사용될 사용자의 식별자" })
    @IsString()
    public id: string;

    @ApiProperty({ description: "로그인에 사용될 패스워드" })
    @IsString()
    public pwd: string;
}

/**
 * 로그인 시 발급되는 토큰을 구성하는 정보
 */
export class AuthTokenInfo {

    @ApiProperty({ description: "사용자명" })
    @IsString()
    public uID: string;

    @ApiProperty({ description: "사용자 ObjectID" })
    @IsString()
    public uName: string;

    @ApiProperty({ description: "업체명" })
    @IsString()
    public cID: string;

    @ApiProperty({ description: "업체 ObjectID" })
    @IsString()
    public cName: string;
}