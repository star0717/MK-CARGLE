import axios, { AxiosResponse } from "axios";
import { ConfirmPWD, HelpChangePWD } from "../../src/models/auth.entity";
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
  const req = await axios
    .post(`/api/auth/signup`, dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNUP,
    payload: req,
  };
}

/**
 *
 * 토큰 체크 기능
 * @returns
 */
export async function tokenCheckAction() {
  const req = await axios
    .get(`/api/auth/profile`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.TOKEN_CHECK,
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
    .get(`/api/auth/validate/email-token/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_AUTHNUM_CHECK,
    payload: req,
  };
}

// 이메일 찾기 action
export async function findEmailAction(dataToSubmit: any) {
  const req = await axios
    .post(`/api/auth/help/email`, dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_FIND_EMAIL,
    payload: req,
  };
}

// 패스워드 찾기 action
export async function findPWAction(dataToSubmit: any) {
  const req = await axios
    .post(`/api/auth/help/pwd`, dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);

  return {
    type: actionTypesUser.USER_FIND_PW,
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
  const req = await axios
    .get(`/api/auth/find/company/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_COMPANY_FIND,
    payload: req,
  };
}

// 사업자번호 검색 action
export async function companyFindbyNameAction(dataToSubmit: string) {
  const req = await axios
    .get(`/api/auth/find/companies/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_COMPANY_FIND,
    payload: req,
  };
}

// 사업자등록증 업로드 action
export async function comFileUploadAction(dataToSubmit: any) {
  const req = await axios
    .post(`/api/auth/upload/com-reg-doc`, dataToSubmit, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.COM_FILE_UPLOAD,
    payload: req,
  };
}

// 정비업등록증 업로드 action
export async function manFileUploadAction(dataToSubmit: any) {
  const req = await axios
    .post(`/api/auth/upload/man-reg-doc`, dataToSubmit, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.MAN_FILE_UPLOAD,
    payload: req,
  };
}

// 가입 심사 요청 action (업체)
export async function approvalReqAction(dataToSubmit: any) {
  const req = await axios
    .patch(`/api/auth/request/company/${dataToSubmit}`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.APPROVAL_REQUEST,
    payload: req,
  };
}

// 비밀번호 확인 action
export async function passwordCheck(dataToSubmit: ConfirmPWD) {
  const req = await axios
    .post(`/api/settings/myinfo/confirm/password`, dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.PASSWORD_CHECK,
    payload: req,
  };
}

/**
 * user와 company정보 가져오기
 * @returns
 */
export async function getMyInfo() {
  const req = await axios
    .get(`/api/settings/myinfo`)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.GET_MY_INFO,
    payload: req,
  };
}

/**
 * user와 company정보 업데이트
 * @returns
 */
export async function setMyInfo(dataToSubmit: any) {
  const req = await axios
    .patch(`/api/settings/myinfo`, dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.SET_MY_INFO,
    payload: req,
  };
}

/**
 * 비밀번호 변경
 * @returns
 */
export async function changePass(dataToSubmit: HelpChangePWD) {
  const req = await axios
    .patch(
      `/api/settings/myinfo/change/password/${dataToSubmit._id}`,
      dataToSubmit
    )
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.CHANGE_PASSWORD,
    payload: req,
  };
}

/**
 * 도장 업로드
 * @returns
 */
export async function uploadStamp(dateToSubmit: any) {
  const req = await axios
    .patch(`/api/settings/myinfo/stamp`, dateToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.UPROAD_STAMP,
    payload: req,
  };
}

/**
 * 도장 이미지 반환
 * @returns
 */
export async function downloadStamp() {
  const req = await axios
    .get(`/api/settings/myinfo/stamp`)
    .then((res: AxiosResponse<unknown, any>) => res.data);

  return {
    type: actionTypesUser.DOWNROAD_STAMP,
    payload: req,
  };
}
