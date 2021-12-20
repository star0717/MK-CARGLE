/**
 * 계정 페이지(토큰 x) url
 */
export const SignRoute = {
  SIGNUP: "signup",
  FINDEMAIL: "findemail",
  FINDPASSWORD: "findpassword",
};

/**
 * 메인 페이지(토큰 o) url[0]
 */
export const MainRoute = {
  MAIN: "main",
  MYPAGE: "mypage",
  TEST: "test",
  ADMIN: "admin",
};

/**
 * 메인 페이지(토큰 o) url[1]
 */
export const SubRoute = {
  ACCOUNT: "account",
  WORKER: "worker",
  COMPANIES: "companies",
};

export const BaseLink = {
  INDEX: "/",
  SIGN: "/sign",
  V: "/v",
};

export const UseLink = {
  INDEX: BaseLink.INDEX,
  SIGNUP: `${BaseLink.SIGN}/${SignRoute.SIGNUP}`,
  FIND_EMAIL: `${BaseLink.SIGN}/${SignRoute.FINDEMAIL}`,
  FIND_PASSWORD: `${BaseLink.SIGN}/${SignRoute.FINDPASSWORD}`,
  MAIN: `${BaseLink.V}/${MainRoute.MAIN}`,
  MYPAGE_ACCOUNT: `${BaseLink.V}/${MainRoute.MYPAGE}/${SubRoute.ACCOUNT}`,
  MYPAGE_WORKER: `${BaseLink.V}/${MainRoute.MYPAGE}/${SubRoute.WORKER}`,
  TEST: `${BaseLink.V}/${MainRoute.TEST}`,
  ADMIN_COMPANIES: `${BaseLink.V}/${MainRoute.ADMIN}/${SubRoute.COMPANIES}`,
};
