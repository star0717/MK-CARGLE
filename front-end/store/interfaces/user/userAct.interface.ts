export enum actionTypesUser {
  USER_LOGIN = "USER_LOGIN",
}

export type ActionsUser = UserLogin;

export interface UserLogin {
  type: actionTypesUser.USER_LOGIN;
  payload: any;
}
