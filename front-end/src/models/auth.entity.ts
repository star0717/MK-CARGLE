import { Company, CompanyApproval } from './company.entity';
import { User, UserAuthority } from './user.entity';
/**
 * 회원 가입 정보용 DTO
 */
export declare class SignUpInfo {
    user: User;
    company: Company;
}
/**
 * 로그인을 시도할 때 사용할 사용자 정보
 * 로그인에서 사용하는 AuthGuard에서는 아래 정의된 필드명을 사용자 정보로 사용함
 * - 실제 시스템에서 로그인 식별자로 email을 이용하더라도 username 필드에 email값을 채워 보내야함
 * - 실제 데이터 맵핑은 UsersService에서 조정함
 */
export declare class UserInfo {
    id: string;
    pwd: string;
}
/**
 * 로그인 시 발급되는 토큰을 구성하는 정보
 */
export declare class AuthTokenInfo {
    uID: string;
    uName: string;
    uAuth: UserAuthority;
    uApproval: boolean;
    cID: string;
    cName: string;
    cApproval: CompanyApproval;
}
/**
 * 이메일 주소 찾기에 사용될 데이터 모델
 */
export declare class HelpFindEmail {
    name: string;
    hpNumber: string;
}
export declare class HelpFindPWD extends HelpFindEmail {
    email: string;
}
export declare class HelpChangePWD {
    _id: string;
    oldPWD: string;
    newPWD: string;
}
export declare class ConfirmPWD {
    _id: string;
    PWD: string;
}
