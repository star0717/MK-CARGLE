export enum actionTypesUser {
  USER_INPUT = "USER_INPUT",
  USER_SIGNIN = "USER_SIGNIN",
  USER_SIGNOUT = "USER_SIGNOUT",
}

export type ActionsUser = UserInput | UserSignIn | UserSignOut;

// 입력값 onChange
export interface UserInput {
  type: actionTypesUser.USER_INPUT;
  data: any;
}

// 로그인
export interface UserSignIn {
  type: actionTypesUser.USER_SIGNIN;
  payload: any;
}

// 로그아웃
export interface UserSignOut {
  type: actionTypesUser.USER_SIGNOUT;
  payload: any;
}
