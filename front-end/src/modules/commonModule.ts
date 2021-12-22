import parse from "url-parse";
import { AuthTokenInfo } from "../models/auth.entity";
import { UserAuthority } from "../models/user.entity";

/**
 * jwt를 json으로 만드는 함수
 * @param token
 * @returns
 */
export const parseJwt = (token: string): AuthTokenInfo => {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  var result = JSON.parse(payload.toString());

  return result;
};

/**
 * url 파싱하여 pathName 얻는 함수
 * @param url
 * @returns
 */
export const getPathName = (url: string): string => {
  const pathName: string = parse(url).pathname;

  return pathName;
};

export const AuthMenuList = (menu: any, token: AuthTokenInfo) => {
  const MainMenu = menu.filter((item: any) => {
    switch (token?.uAuth) {
      case UserAuthority.ADMIN:
        return item.auth === UserAuthority.ADMIN;
      case UserAuthority.OWNER:
        return (
          item.auth === UserAuthority.OWNER ||
          item.auth === UserAuthority.WORKER
        );
      case UserAuthority.WORKER:
        return item.auth === UserAuthority.WORKER;
    }
  });
  return MainMenu;
};
