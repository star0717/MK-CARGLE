import axios, { AxiosResponse } from "axios";
import { actionTypesUser } from "../interfaces";

// 로그인 action
export async function signInUserAction(dataToSubmit: any) {
  const req = await axios
    .post("/api/auth/signin", dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNIN,
    payload: req,
  };
}

// 로그아웃 action
export async function signOutUserAction() {
  const req = await axios
    .get("/api/auth/signout")
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNOUT,
    payload: req,
  };
}
