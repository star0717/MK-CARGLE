import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthTokenInfo } from 'src/models/auth.entity';

/**
 * 로그인된 사용자 인증 전략
 */

/**
 * 쿠키로부터 인증 토큰을 분리하여 반환 (2/4)
 * @returns 인증 토큰
 */
const fromAuthCookie = function () {
  return function (request: any) {
    // console.log('*** fromAuthCookie in JwtStrategy (2/4)');

    let hashedToken = null;
    if (request && request.cookies) {
      hashedToken = request.cookies[process.env.TK_NAME];
      // console.log('hashedToken=> ' + hashedToken);
    }
    return hashedToken;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: fromAuthCookie(),
      ignoreExpiration: false,
      secretOrKey: process.env.TK_KEY,
    });
  }

  // /**
  //  * 인증된 사용자의 정보를 반환 (3/4)
  //  * @param payload 사용자 토큰을 포함한 payload
  //  * @returns 인증된 사용자의 정보
  //  */
  async validate(payload: any) {
    // console.log('*** validate in JwtStrategy (3/4)');
    // console.log('payload=> ' + JSON.stringify(payload) + '\n');
    return payload;
  }
}
