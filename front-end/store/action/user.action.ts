import axios, { AxiosResponse } from "axios";
import { actionTypesUser } from "../interfaces";

export async function loginUserAction(dataToSubmit: any) {
  const req = await axios
    .post("/api/users/login", dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_LOGIN,
    payload: req,
  };
}
