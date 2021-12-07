import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokenInfo } from 'src/models/auth.entity';
import { CompanyApproval } from 'src/models/company.entity';
import { UserAuthority as UAuth } from 'src/models/user.entity';

export const Public = () => SetMetadata('isPublic', true);

export const AuthToken = createParamDecorator(
  (
    params: Partial<AuthTokenParas> = new AuthTokenParas(),
    ctx: ExecutionContext,
  ) => {
    console.log('deco');
    if (!params.auth) params.auth = UAuth.WORKER;

    const req = ctx.switchToHttp().getRequest();

    const token: AuthTokenInfo = req['user'] as AuthTokenInfo;

    // 토큰 추출에 실패하면
    if (!token) throw new UnauthorizedException();

    // 오브젝트 ID 값들이 누락되었을 경우 익셉션 발생
    if (!token.uID || !token.cID || token.uID == '' || token.cID == '') {
      throw new UnauthorizedException();
    }

    // 승인된 사용자인이 여부 확인
    var approved: boolean;
    if (token.cApproval == CompanyApproval.DONE && token.uApproval == true) {
      approved = true;
    } else {
      approved = false;
    }
    // console.log(token);
    // console.log(params);
    // console.log(approved);

    // 시스템 어드민의 경우 통과
    if (token.uAuth == UAuth.ADMIN && approved) {
      // 실제 어드민들의 uID와 비교하는 로직 추가 필요
      return token;
    }
    // 작업자가 오너 이상의 API를 호출할 경우 익셉션 발생
    else if (token.uAuth == UAuth.OWNER && params.auth != UAuth.ADMIN) {
      if (approved) return token;
      else if (params.allowUnapproved) return token;
      else throw new UnauthorizedException();
    }
    // 작업자가
    else if (token.uAuth == UAuth.WORKER && params.auth == UAuth.WORKER) {
      if (approved) return token;
      else if (params.allowUnapproved) return token;
      else throw new UnauthorizedException();
    }
    // 그 외에는 모두 익셉션
    else {
      throw new UnauthorizedException();
    }
  },
);

export class AuthTokenParas {
  auth: UAuth = UAuth.WORKER;
  allowUnapproved: boolean = false;
}
