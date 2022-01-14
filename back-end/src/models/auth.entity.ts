import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CompanyApproval, UserAuthority } from 'src/constants/model.const';
import { Company } from './company.entity';
import { User } from './user.entity';

/**
 * 회원 가입 정보용 DTO
 */
export class SignUpInfo {
  @ApiProperty({ description: '회원 가입에 사용할 사용자 정보' })
  @ValidateNested()
  @Type(() => User)
  public user: User;

  @ApiProperty({
    description: '회원 가입에 사용할 업체 정보 (오너 가입시에만 사용)',
  })
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
  @ApiProperty({ description: '로그인에 사용될 사용자의 식별자' })
  @IsString()
  public id: string;

  @ApiProperty({ description: '로그인에 사용될 패스워드' })
  @IsString()
  public pwd: string;
}

/**
 * 로그인 시 발급되는 토큰을 구성하는 정보
 */
export class AuthTokenInfo {
  @ApiProperty({ description: '사용자명' })
  @IsString()
  public uID: string;

  @ApiProperty({ description: '사용자 ObjectID' })
  @IsString()
  public uName: string;

  @ApiProperty({ description: '사용자 권한' })
  @IsString()
  public uAuth: UserAuthority;

  @ApiProperty({ description: '사용자 승인여부' })
  @IsString()
  public uApproval: boolean;

  @ApiProperty({ description: '업체명' })
  @IsString()
  public cID: string;

  @ApiProperty({ description: '업체 ObjectID' })
  @IsString()
  public cName: string;

  @ApiProperty({ description: '업체 승인여부' })
  @IsString()
  public cApproval: CompanyApproval;
}

/**
 * 이메일 주소 찾기에 사용될 데이터 모델
 */
export class HelpFindEmail {
  @ApiProperty({ description: '사용자명' })
  @IsString()
  public name: string;

  @ApiProperty({ description: '핸드폰번호' })
  @IsString()
  public hpNumber: string;
}

export class HelpFindPWD extends HelpFindEmail {
  @ApiProperty({ description: '이메일 주소' })
  @IsString()
  public email: string;
}

export class HelpChangePWD {
  @ApiProperty({ description: '사용자의 ObjectID' })
  @IsString()
  public _id: string;

  @ApiProperty({ description: '기존 비밀번호' })
  @IsString()
  public oldPWD: string;

  @ApiProperty({ description: '신규 비밀번호' })
  @IsString()
  public newPWD: string;
}

/// 회원탈퇴를 위한 정보
export class ConfirmPWD {
  @ApiProperty({ description: '사용자의 ObjectID' })
  @IsString()
  public _id: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  public PWD: string;
}
