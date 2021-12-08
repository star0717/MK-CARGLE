import { setMyInfo } from "../../action/user.action";

export enum actionTypesUser {
  USER_INIT = "USER_INIT",
  INPUT_ACCOUNT = "INPUT_ACCOUNT",
  INPUT_COMPANY = "INPUT_COMPANY",
  INPUT_FORM = "INPUT_FORM",
  FORM_CHECK = "FORM_CHECK",
  USER_SIGNIN = "USER_SIGNIN",
  USER_SIGNUP = "USER_SIGNUP",
  USER_SIGNOUT = "USER_SIGNOUT",
  TOKEN_CHECK = "TOKEN_CHECK",
  USER_EMAIL_SEND = "USER_EMAIL_SEND",
  USER_AUTHNUM_CHECK = "USER_AUTHNUM_CHECK",
  USER_COMPANY_CHECK = "USER_COMPANY_CHECK",
  USER_COMPANY_FIND = "USER_COMPANY_FIND",
  USER_FIND_EMAIL = "USER_FIND_EMAIL",
  USER_FIND_PW = "USER_FIND_PW",
  COM_FILE_UPLOAD = "COM_FILE_UPLOAD",
  MAN_FILE_UPLOAD = "MAN_FILE_UPLOAD",
  APPROVAL_REQUEST = "APPROVAL_REQUEST",
  PASSWORD_CHECK = "PASSWORD_CHECK",
  GET_MY_INFO = "GET_MY_INFO",
  SET_MY_INFO = "SET_MY_INFO",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

export type ActionsUser =
  | UserInit
  | InputAccount
  | InputCompany
  | InputForm
  | FormCheck
  | UserSignIn
  | UserSignUp
  | UserSignOut
  | TokenCheck
  | UserEmailSend
  | UserAuthNumCheck
  | UserCompanyCheck
  | UserCompanyFind
  | UserFindEamil
  | UserFindPw
  | ComFileUpload
  | ManFileUpload
  | ApprovalRequest
  | PasswordCheck
  | GetMyInfo
  | SetMyInfo
  | ChangePassword;

// 초기화
export interface UserInit {
  type: actionTypesUser.USER_INIT;
  payload: any;
}

// 계정 정보 state 변환
export interface InputAccount {
  type: actionTypesUser.INPUT_ACCOUNT;
  payload: any;
}

// 업체 정보 state 변환
export interface InputCompany {
  type: actionTypesUser.INPUT_COMPANY;
  payload: any;
}

// 그 외 form state 변환
export interface InputForm {
  type: actionTypesUser.INPUT_FORM;
  payload: any;
}

// form check 여부 변환
export interface FormCheck {
  type: actionTypesUser.FORM_CHECK;
  payload: any;
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

// 회원가입
export interface UserSignUp {
  type: actionTypesUser.USER_SIGNUP;
  payload: any;
}

/**
 * 토큰체크
 */
export interface TokenCheck {
  type: actionTypesUser.TOKEN_CHECK;
  payload: any;
}

// 이메일 인증번호 전송
export interface UserEmailSend {
  type: actionTypesUser.USER_EMAIL_SEND;
  payload: any;
}

// 인증번호 검사
export interface UserAuthNumCheck {
  type: actionTypesUser.USER_AUTHNUM_CHECK;
  payload: any;
}

// 사업자번호 유효성 검사
export interface UserCompanyCheck {
  type: actionTypesUser.USER_COMPANY_CHECK;
  payload: any;
}

// 사업자번호 검색
export interface UserCompanyFind {
  type: actionTypesUser.USER_COMPANY_FIND;
  payload: any;
}

// 이메일 찾기
export interface UserFindEamil {
  type: actionTypesUser.USER_FIND_EMAIL;
  payload: any;
}

// 비밀번호 찾기
export interface UserFindPw {
  type: actionTypesUser.USER_FIND_PW;
  payload: any;
}

// 사업자등록증 업로드
export interface ComFileUpload {
  type: actionTypesUser.COM_FILE_UPLOAD;
  payload: any;
}

// 정비업등록증 업로드
export interface ManFileUpload {
  type: actionTypesUser.MAN_FILE_UPLOAD;
  payload: any;
}

// 심사요청
export interface ApprovalRequest {
  type: actionTypesUser.APPROVAL_REQUEST;
  payload: any;
}

// 비밀번호 체크(마이페이지)
export interface PasswordCheck {
  type: actionTypesUser.PASSWORD_CHECK;
  payload: any;
}

// user, company 정보 받기
export interface GetMyInfo {
  type: actionTypesUser.GET_MY_INFO;
  payload: any;
}

// user, company 정보 업데이트
export interface SetMyInfo {
  type: actionTypesUser.SET_MY_INFO;
  payload: any;
}

// user, company 정보 업데이트
export interface ChangePassword {
  type: actionTypesUser.CHANGE_PASSWORD;
  payload: any;
}
