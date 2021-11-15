import axios, { AxiosResponse } from "axios";
import { actionTypesUser } from "../interfaces";

// 로그인 action
export async function signInUserAction(dataToSubmit: any) {
  const req = await axios
    .post(`/api/auth/signin`, dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNIN,
    payload: req,
  };
}

// 로그아웃 action
export async function signOutUserAction() {
  const req = await axios
    .get(`/api/auth/signout`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNOUT,
    payload: req,
  };
}

// 회원가입 action
export async function signUpUserAction(dataToSubmit: any) {
  console.log("액션&*&*&", dataToSubmit);
  const req = await axios
    .post(`/api/auth/signup`, dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNUP,
    payload: req,
  };
}

// 이메일 인증번호 전송 action
export async function emailSendAction(dataToSubmit: string) {
  const req = await axios
    .get(`/api/auth/validate/email/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_EMAIL_SEND,
    payload: req,
  };
}

// 인증번호 검사 action
export async function authNumCheckAction(dataToSubmit: string) {
  const req = await axios
    .get(`/api/auth/validate/crypto-text/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_AUTHNUM_CHECK,
    payload: req,
  };
}

// 사업자번호 유효성 검사 action
export async function companyCheckAction(dataToSubmit: string) {
  const req = await axios
    .get(`/api/auth/validate/com-reg-number/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_COMPANY_CHECK,
    payload: req,
  };
}

// 사업자번호 검색 action
export async function companyFindAction(dataToSubmit: string) {
  console.log(dataToSubmit);
  const req = await axios
    .get(`/api/auth/find/company/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_COMPANY_FIND,
    payload: req,
  };
}
