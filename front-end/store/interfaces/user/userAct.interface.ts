export enum actionTypesUser {
  USER_INPUT = "USER_INPUT",
  USER_SIGNIN = "USER_SIGNIN",
}

export type ActionsUser = UserSignIn | UserInput;

export interface UserInput {
  type: actionTypesUser.USER_INPUT;
  data: any;
}

export interface UserSignIn {
  type: actionTypesUser.USER_SIGNIN;
  payload: any;
}
