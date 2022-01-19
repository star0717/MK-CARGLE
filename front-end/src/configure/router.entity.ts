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
  REVIEW_COMPANIES: "review_companies",
  MAN_COMPANIES: "man_companies",
  USERS: "users",
  MAN_PARTS: "man_parts",
  MOLIT_ITEMS: "molit_items",
  TEST: "test",
};

export const Step = {
  FIRST: "1",
  SECOND: "2",
  THIRD: "3",
};

/**
 * 컴포넌트 전환을 위한 스탭(Query parse)
 */
export const StepQuery = {
  FIRST: "?step=1",
  SECOND: "?step=2",
  THIRD: "?step=3",
};

/**
 * 페이지 분기를 위한 링크
 */
export const BaseLink = {
  INDEX: "/",
  SIGN: "/sign",
  V: "/v",
};

/**
 * 실제 사용되는 전체 링크
 */
export const UseLink = {
  INDEX: BaseLink.INDEX,
  SIGNUP: `${BaseLink.SIGN}/${SignRoute.SIGNUP}`,
  FIND_EMAIL: `${BaseLink.SIGN}/${SignRoute.FINDEMAIL}`,
  FIND_PASSWORD: `${BaseLink.SIGN}/${SignRoute.FINDPASSWORD}`,
  MAIN: `${BaseLink.V}/${MainRoute.MAIN}`,
  MYPAGE_ACCOUNT: `${BaseLink.V}/${MainRoute.MYPAGE}/${SubRoute.ACCOUNT}`,
  MYPAGE_WORKER: `${BaseLink.V}/${MainRoute.MYPAGE}/${SubRoute.WORKER}`,
  TEST: `${BaseLink.V}/${MainRoute.TEST}`,
  ADMIN_REVIEW_COMPANIES: `${BaseLink.V}/${MainRoute.ADMIN}/${SubRoute.REVIEW_COMPANIES}`,
  ADMIN_MAN_COMPANIES: `${BaseLink.V}/${MainRoute.ADMIN}/${SubRoute.MAN_COMPANIES}`,
  ADMIN_USERS: `${BaseLink.V}/${MainRoute.ADMIN}/${SubRoute.USERS}`,
  ADMIN_MAN_PARTS: `${BaseLink.V}/${MainRoute.ADMIN}/${SubRoute.MAN_PARTS}`,
  ADMIN_MOLIT_ITEMS: `${BaseLink.V}/${MainRoute.ADMIN}/${SubRoute.MOLIT_ITEMS}`,
  ADMIN_TEST: `${BaseLink.V}/${MainRoute.ADMIN}/${SubRoute.TEST}`,
};
