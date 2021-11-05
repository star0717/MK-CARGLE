import axios, { AxiosResponse } from "axios";
import { actionTypesUser } from "../interfaces";

export async function loginUserAction(dataToSubmit: any) {
  const req = await axios
    .post("/api/auth/signin", dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNIN,
    payload: req,
  };
}
