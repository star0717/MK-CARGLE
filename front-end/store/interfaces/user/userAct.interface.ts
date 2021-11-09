export enum actionTypesUser {
  // USER_INPUT = "USER_INPUT",
  USER_SIGNIN = "USER_SIGNIN",
  USER_SIGNOUT = "USER_SIGNOUT",
  USER_EMAIL_SEND = "USER_EMAIL_SEND",
}

export type ActionsUser = UserSignIn | UserSignOut | UserEmailSend;

// // 입력값 onChange
// export interface UserInput {
//   type: actionTypesUser.USER_INPUT;
//   data: any;
// }

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

// 이메일 인증번호 전송
export interface UserEmailSend {
  type: actionTypesUser.USER_EMAIL_SEND;
  payload: any;
}
