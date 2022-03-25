import { Agency } from "src/models/agency.entity";
import { Car } from "src/models/car.entity";
import { Estimate } from "src/models/estimate.entity";
import { Maintenance } from "src/models/maintenance.entity";
import { PartsSet } from "src/models/partsset.entity";
import { Statement } from "src/models/statement.entity";
import { SignUpInfo } from "../../../src/models/auth.entity";
import { DeleteResult, FindResult } from "../../../src/models/base.entity";
import { Company } from "src/models/company.entity";
import { Part } from "src/models/part.entity";
import { User } from "src/models/user.entity";
import { RequestPayResponse } from "iamport-typings";

export enum actionTypesUser {
  USER_INIT = "USER_INIT",
  USER_SELECT = "USER_SELECT",
  INPUT_ACCOUNT = "INPUT_ACCOUNT",
  INPUT_COMPANY = "INPUT_COMPANY",
  INPUT_FORM = "INPUT_FORM",
  FORM_CHECK = "FORM_CHECK",
  USER_SIGNIN = "USER_SIGNIN",
  USER_SIGNUP = "USER_SIGNUP",
  USER_SIGNOUT = "USER_SIGNOUT",
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
  UPROAD_STAMP = "UPROAD_STAMP",
  DOWNROAD_STAMP = "DOWNROAD_STAMP",
  WITHDRAWAL = "WITHDRAWAL",
  GET_WORKERS_LIST = "GET_WORKERS_LIST",
  ADMIN_COMPANIES_LIST = "ADMIN_COMPANIES_LIST",
  ADMIN_MAIN_LIST = "ADMIN_MAIN_LIST",
  PATCH_WORKERS_APPROVE = "PATCH_WORKERS_APPROVE",
  PATCH_WORKERS_REJECT = "PATCH_WORKERS_REJECT",
  PATCH_WORKERS_CHANGE = "PATCH_WORKERS_CHANGE",
  PATCH_WORKERS_DELETE = "PATCH_WORKERS_DELETE",
}

export type ActionsUser =
  | UserInit
  | UserSelect
  | InputAccount
  | InputCompany
  | InputForm
  | _iFormCheck
  | UserSignIn
  | UserSignUp
  | UserSignOut
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
  | ChangePassword
  | UproadStamp
  | DownroadStamp
  | Withdrawal
  | GetWorkersList
  | AdminCompaniesList
  | AdminMainList
  | PatchWorkersApprove
  | PatchWorkersReject
  | PatchWorkersChange
  | PatchWorkersDelete
  | ApproveCompany;

// 초기화
export interface UserInit {
  type: actionTypesUser.USER_INIT;
  payload: any;
}

// 유저 종류 선택
export interface UserSelect {
  type: actionTypesUser.USER_SELECT;
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
export interface _iFormCheck {
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
// 도장 업로드
export interface UproadStamp {
  type: actionTypesUser.UPROAD_STAMP;
  payload: any;
}
// 도장 다운로드
export interface DownroadStamp {
  type: actionTypesUser.DOWNROAD_STAMP;
  payload: any;
}
//회원탈퇴
export interface Withdrawal {
  type: actionTypesUser.WITHDRAWAL;
  payload: any;
}
//작업자 조회
export interface GetWorkersList {
  type: actionTypesUser.GET_WORKERS_LIST;
  payload: FindResult<User>;
}
//업체 조회
export interface AdminCompaniesList {
  type: actionTypesUser.ADMIN_COMPANIES_LIST;
  payload: any;
}

//업체 조회????
export interface AdminMainList {
  type: actionTypesUser.ADMIN_MAIN_LIST;
  payload: any;
}

//작업자 승인 허가
export interface PatchWorkersApprove {
  type: actionTypesUser.PATCH_WORKERS_APPROVE;
  payload: User;
}
//작업자 승인 거부
export interface PatchWorkersReject {
  type: actionTypesUser.PATCH_WORKERS_REJECT;
  payload: User;
}
//작업자 정보 변경
export interface PatchWorkersChange {
  type: actionTypesUser.PATCH_WORKERS_CHANGE;
  payload: User;
}
//작업자 삭제
export interface PatchWorkersDelete {
  type: actionTypesUser.PATCH_WORKERS_DELETE;
  payload: DeleteResult;
}

/*****************************************************
 * 1. Action API 정의부
 * - 호출할 API를 enum 으로 선언
 *****************************************************/
export enum ActionAPIs {
  // 모델 별 공통 API
  FIND_USERS = "FIND_USERS", // 사용자 정보 조회
  APPROVE_COMPANY = "APPROVE_COMPANY", //업체 승인
  REJECT_COMPANY = "REJECT_COMPANY", //업체 승인요청 반려
  ING_COMPANY = "ING_COMPANY",
  ADMIN_GET_DONE_COMPANIES = "ADMIN_GET_DONE_COMPANIES", // done 업체 리스트
  ADMIN_GET_USERS = "ADMIN_GET_USERS", // 모든 직원 리스트 반환
  ADMIN_GET_USERS_ID = "ADMIN_GET_USERS_ID", // 해당 직원 리스트 반환
  ADMIN_PARTS = "ADMIN_PARTS", //부품 추가,반환,수정...

  // 고유 API
  ADMIN_PATCH_SINGUP_INFO = "ADMIN_PATCH_SINGUP_INFO", // 업체 가입 정보 수정
  ADMIN_DELETE_COMPANIES = "ADMIN_DELETE_COMPANIES", // 업체, 대표, 직원 정보 삭제
  ADMIN_GET_PART_GENCODE = "ADMIN_GET_PART_GENCODE", // 부품 코드번호 반환
  ADMIN_GET_PARTS = "ADMIN_GET_PARTS", // 부품 전체 리스트 반환
  ADMIN_GET_PARTS_CLASS = "ADMIN_GET_PARTS_CLASS", // 부품 선택 리스트 반환
  ADMIN_DELETE_PARTS_ONE = "ADMIN_DELETE_PARTS_ONE", // 부품 하나 삭제
  ADMIN_DELETE_PARTS_MANY = "ADMIN_DELETE_PARTS_MANY", // 부품 하나 삭제

  ADMIN_API = "ADMIN_API", // 관리자용 기본 API
  USER_API = "USER_API", // 사용자용 기본 API
}

/*****************************************************
 * 2. Interface 정의부
 * - 페이지로 전달할 API 호출 결과
 * - 모든 인터페이스는 baseActionInterface를 구현함
 *****************************************************/

// 기본 인터페이스. 모든 인터페이스는 이 이턴페이스를 구현함
export interface baseActionInterface {
  type: ActionAPIs;
  payload: any;
}

/** 모델 별 공통 인터페이스 **/

// 사용자 정보 조회 결과
export class _iFindUsers implements baseActionInterface {
  type: ActionAPIs.FIND_USERS;
  payload: FindResult<User>;
}

//업체 승인
export class ApproveCompany implements baseActionInterface {
  type: ActionAPIs.APPROVE_COMPANY;
  payload: any;
}

//업체 승인요청 반려
export class RejectCompany implements baseActionInterface {
  type: ActionAPIs.REJECT_COMPANY;
  payload: any;
}

//approval 이 ing 상태인 업체 반환
export class _ingCompany implements baseActionInterface {
  type: ActionAPIs.ING_COMPANY;
  payload: any;
}

/** 고유 API 인터페이스 **/
export class _iGetAdminDoneCompanies implements baseActionInterface {
  type: ActionAPIs.ADMIN_GET_DONE_COMPANIES;
  payload: FindResult<Company>;
}
// 관리자: 업체, 대표자 정보 변경
export class _iPatchAdminSignUpInfo implements baseActionInterface {
  type: ActionAPIs.ADMIN_PATCH_SINGUP_INFO;
  payload: SignUpInfo;
}

// 관리자: 업체, 대표자, 직원 삭제
export class _iDeleteAdminCompanies implements baseActionInterface {
  type: ActionAPIs.ADMIN_DELETE_COMPANIES;
  payload: DeleteResult;
}

// 관리자: 모든 직원
export class _iGetAdminUsers implements baseActionInterface {
  type: ActionAPIs.ADMIN_GET_USERS;
  payload: FindResult<User>;
}

// 관리자: 해당 직원
export class _iGetAdminUsersId implements baseActionInterface {
  type: ActionAPIs.ADMIN_GET_USERS_ID;
  payload: FindResult<User>;
}

// 관리자: 해당 직원
export class _iGetAdminPartGenCode implements baseActionInterface {
  type: ActionAPIs.ADMIN_DELETE_COMPANIES;
  payload: string;
}

// 관리자: 부품 전체 리스트 반환
export class _iGetAdminParts implements baseActionInterface {
  type: ActionAPIs.ADMIN_GET_PARTS;
  payload: FindResult<Part>;
}

// 관리자: 부품 선택 리스트 반환
export class _iGetAdminPartsClass implements baseActionInterface {
  type: ActionAPIs.ADMIN_GET_PARTS_CLASS;
  payload: FindResult<Part>;
}

// 관리자: 부품 하나 삭제
export class _iDeleteAdminPartsOne implements baseActionInterface {
  type: ActionAPIs.ADMIN_DELETE_PARTS_ONE;
  payload: DeleteResult;
}

// 관리자: 부품 하나 삭제
export class _iDeleteAdminPartsMany implements baseActionInterface {
  type: ActionAPIs.ADMIN_DELETE_PARTS_MANY;
  payload: DeleteResult;
}

export class _iAdminParts implements baseActionInterface {
  type: ActionAPIs.ADMIN_PARTS;
  payload: string;
}

/**
 * 공통 인터페이스
 */
export class _iDeleteByAdmin implements baseActionInterface {
  type: ActionAPIs.ADMIN_API;
  payload: DeleteResult;
}

export class _iDeleteByUser implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: DeleteResult;
}

/** 부품 세트 인터페이스 */
export class _iPartssets implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: FindResult<PartsSet>;
}
export class _iPartssetsOne implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: PartsSet;
}

/** 거래처 인터페이스 */

export class _iAgencies implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: FindResult<Agency>;
}

export class _iAgency implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: Agency;
}

/** 정비장부 인터페이스 */
export class _iGetMaintenancesCarInfo implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: Car;
}

export class _iMaintenances implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: FindResult<Maintenance>;
}

export class _iMaintenancesOne implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: Maintenance;
}

export class _iEstimate implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: Estimate;
}

export class _iStatement implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: Statement;
}

/** 결제모듈 인터페이스 */
export class _iPayment implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: RequestPayResponse;
}

/** SMS 전송 */
export class _iSms implements baseActionInterface {
  type: ActionAPIs.USER_API;
  payload: any;
}

/*****************************************************
 * 3. ActionInterfaces 정의부
 * - store에 등록(Redux???)
 * => 정의한 인터페이스를 등록
 *****************************************************/
export type ActionInterfaces =
  | _iFindUsers
  | _iPatchAdminSignUpInfo
  | _iGetAdminUsers
  | _iGetAdminUsersId
  | _iGetAdminPartGenCode
  | _iGetAdminParts
  | _iGetAdminPartsClass
  | _iDeleteAdminPartsOne
  | _iDeleteAdminPartsMany
  | _iAdminParts
  | _iDeleteByAdmin
  | _iDeleteByUser
  | _iPartssetsOne
  | _iAgencies
  | _iMaintenances
  | _iMaintenancesOne
  | _iEstimate
  | _iStatement
  | _iPayment
  | _iSms;
