export enum actionTypesUser {
  USER_SIGNIN = "USER_SIGNIN",
}

export type ActionsUser = UserSignIn;

export interface UserSignIn {
  type: actionTypesUser.USER_SIGNIN;
  payload: any;
}
