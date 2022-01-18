import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ConfirmPWD,
  HelpChangePWD,
  HelpFindEmail,
  HelpFindPWD,
  SignUpInfo,
  UserInfo,
} from "../../src/models/auth.entity";
import {
  DeleteResult,
  FindParameters,
  FindResult,
  OptionalInfo,
} from "../../src/models/base.entity";
import { Company } from "../../src/models/company.entity";
import { User } from "../../src/models/user.entity";
import {
  ActionAPIs,
  actionTypesUser,
  ApproveCompany,
  RejectCompany,
  GetWorkersList,
  PatchWorkersApprove,
  PatchWorkersChange,
  PatchWorkersDelete,
  PatchWorkersReject,
  _iPatchAdminSignUpInfo,
  _iDeleteAdminCompanies,
  _ingCompany,
  _iGetAdminUsers,
  _iGetAdminDoneCompanies,
  _iGetAdminPartGenCode,
  _iDeleteAdminPartsOne,
  _iGetAdminParts,
  _iGetAdminPartsClass,
  _iDeleteAdminPartsMany,
} from "../interfaces";

import {
  AuthApiPath,
  AdminApiPath,
  SettingsApiPath,
} from "../../src/constants/api-path.const";
import { genApiPath } from "../../src/modules/commonModule";
import { DeleteObjectIds } from "../../src/models/base.entity";
import { Part } from "../../src/models/part.entity";

// 로그인 action
export async function _aPostAuthSignin(dataToSubmit: UserInfo) {
  const req = await axios
    .post(genApiPath(AuthApiPath.signin), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNIN,
    payload: req,
  };
}

// 로그아웃 action
export async function _aGetAuthSignout() {
  const req = await axios
    .get(genApiPath(AuthApiPath.signout))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_SIGNOUT,
    payload: req,
  };
}

// 회원가입 action
export async function _aPostAuthSignup(dataToSubmit: any) {
  const req = await axios
    .post(genApiPath(AuthApiPath.signup), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);

  return {
    type: actionTypesUser.USER_SIGNUP,
    payload: req,
  };
}

// 이메일 인증번호 전송 action
export async function _aGetAuthValidateEmail(dataToSubmit: string) {
  const req = await axios
    // .get(`/api${AuthApiPath.validate_email}/${dataToSubmit}`)
    .get(genApiPath(AuthApiPath.validate_email, { id: dataToSubmit }))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_EMAIL_SEND,
    payload: req,
  };
}

// 인증번호 검사 action
export async function _aGetAuthValidateEmailToken(dataToSubmit: string) {
  const req = await axios
    .get(genApiPath(AuthApiPath.validate_email_token, { id: dataToSubmit }))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_AUTHNUM_CHECK,
    payload: req,
  };
}

// 이메일 찾기 action
export async function _aPostAuthHelpEmail(dataToSubmit: HelpFindEmail) {
  const req = await axios
    .post(genApiPath(AuthApiPath.help_email), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_FIND_EMAIL,
    payload: req,
  };
}

// 패스워드 찾기 action
export async function _aPostAuthHelpPwd(dataToSubmit: HelpFindPWD) {
  const req = await axios
    .post(genApiPath(AuthApiPath.help_pwd), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_FIND_PW,
    payload: req,
  };
}

// 사업자번호 유효성 검사 action
export async function _aGetAuthValidateComRegNumber(dataToSubmit: string) {
  const req = await axios
    .get(genApiPath(AuthApiPath.validate_com_reg_number, { id: dataToSubmit }))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_COMPANY_CHECK,
    payload: req,
  };
}

// 사업자번호 검색 action
export async function _aGetAuthCompany(dataToSubmit: string) {
  const req = await axios
    .get(genApiPath(AuthApiPath.company, { id: dataToSubmit }))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_COMPANY_FIND,
    payload: req,
  };
}

// 사업자명 검색 action
export async function _aGetAuthCompanies(dataToSubmit: string) {
  const req = await axios
    .get(genApiPath(AuthApiPath.companies, { id: dataToSubmit }))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.USER_COMPANY_FIND,
    payload: req,
  };
}

// 사업자등록증 업로드 action
export async function _aPostAuthUploadComRegDoc(dataToSubmit: FormData) {
  const req = await axios
    .post(genApiPath(AuthApiPath.upload_com_reg_doc), dataToSubmit, {
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
export async function _aPostAuthUploadManRegDoc(dataToSubmit: FormData) {
  const req = await axios
    .post(genApiPath(AuthApiPath.upload_man_reg_doc), dataToSubmit, {
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
export async function _aPatchAuthRequestCompany(dataToSubmit: string) {
  const req = await axios
    .patch(genApiPath(AuthApiPath.request_company, { id: dataToSubmit }))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.APPROVAL_REQUEST,
    payload: req,
  };
}

/**
 * 비밀번호 확인 action
 * @param dataToSubmit
 * @returns
 */
export async function _aPostAuthMyinfoConfirmPassword(
  dataToSubmit: ConfirmPWD
) {
  const req = await axios
    .post(genApiPath(SettingsApiPath.myinfo_confirm_password), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.PASSWORD_CHECK,
    payload: req,
  };
}

/**
 * user와 company정보 가져오기 action
 * @returns
 */
export async function getMyInfoAction() {
  const req = await axios
    .get(genApiPath(SettingsApiPath.myinfo))
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.GET_MY_INFO,
    payload: req,
  };
}

/**
 * user와 company정보 업데이트 action
 * @returns
 */
export async function setMyInfoAction(dataToSubmit: SignUpInfo) {
  const req = await axios
    .patch(genApiPath(SettingsApiPath.myinfo), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);

  return {
    type: actionTypesUser.SET_MY_INFO,
    payload: req,
  };
}

/**
 * 비밀번호 변경 action
 * @returns
 */
export async function changePwAction(dataToSubmit: HelpChangePWD) {
  const req = await axios
    .patch(
      genApiPath(SettingsApiPath.myinfo_change_password, {
        id: dataToSubmit._id,
      }),
      dataToSubmit
    )
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.CHANGE_PASSWORD,
    payload: req,
  };
}

/**
 * 도장 업로드 action
 * @returns
 */
export async function uploadStampAction(dataToSubmit: FormData) {
  const req = await axios
    .patch(genApiPath(SettingsApiPath.myinfo_stamp), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);
  return {
    type: actionTypesUser.UPROAD_STAMP,
    payload: req,
  };
}

/**
 * 도장 이미지 반환 action
 * @returns
 */
export async function downloadStampAction() {
  const req = await axios
    .get(genApiPath(SettingsApiPath.myinfo_stamp))
    .then((res: AxiosResponse<unknown, any>) => res.data);

  return {
    type: actionTypesUser.DOWNROAD_STAMP,
    payload: req,
  };
}

/**
 * 회원 탈퇴 기능 action
 * @returns
 */
export async function withdrawalAction(dataToSubmit: ConfirmPWD) {
  const req = await axios
    .post(genApiPath(AuthApiPath.withdrawal), dataToSubmit)
    .then((res: AxiosResponse<unknown, any>) => res.data);

  return {
    type: actionTypesUser.WITHDRAWAL,
    payload: req,
  };
}

/**
 * 작업자 조회 기능 action
 * @returns
 */
export async function getWorkersListAction(dataToSubmit: FindParameters) {
  const req: FindResult<User> = await axios
    .get(
      genApiPath(SettingsApiPath.management_workers, {
        findParams: dataToSubmit,
      })
    )
    .then((res: AxiosResponse<FindResult<User>, any>): FindResult<User> => {
      return res.data;
    });

  const result: GetWorkersList = {
    type: actionTypesUser.GET_WORKERS_LIST,
    payload: req,
  };
  return result;
}

/**
 * 작업자 승인 허가 action
 * @param dataToSubmit
 * @returns
 */
export async function patchWorkerApproveAction(dataToSubmit: string) {
  const req = await axios
    .patch(
      genApiPath(SettingsApiPath.management_approve_workers, {
        id: dataToSubmit,
      })
    )
    .then((res: AxiosResponse<User, any>) => res.data);

  const result: PatchWorkersApprove = {
    type: actionTypesUser.PATCH_WORKERS_APPROVE,
    payload: req,
  };
  return result;
}

/**
 * 작업자 승인 거부 action
 * @param dataToSubmit
 * @returns
 */
export async function patchWorkerRejectAction(dataToSubmit: string) {
  const req = await axios
    .patch(
      genApiPath(SettingsApiPath.management_reject_workers, {
        id: dataToSubmit,
      })
    )
    .then((res: AxiosResponse<User, any>) => res.data);

  const result: PatchWorkersReject = {
    type: actionTypesUser.PATCH_WORKERS_REJECT,
    payload: req,
  };
  return result;
}

/**
 * 작업자 정보 변경 action
 * @param dataToSubmit
 * @returns
 */
export async function patchWorkerChangeAction(
  id: string,
  dataToSubmit: Partial<User>
) {
  const req = await axios
    .patch(
      genApiPath(SettingsApiPath.management_workers, { id: id }),
      dataToSubmit
    )
    .then((res: AxiosResponse<User, any>) => res.data);

  const result: PatchWorkersChange = {
    type: actionTypesUser.PATCH_WORKERS_CHANGE,
    payload: req,
  };
  return result;
}

/**
 * 작업자 삭제 action
 * @param dataToSubmit
 * @returns
 */
export async function patchWorkerDeleteAction(dataToSubmit: string) {
  const req = await axios
    .patch(
      genApiPath(SettingsApiPath.management_delete_workers, {
        id: dataToSubmit,
      })
    )
    .then((res: AxiosResponse<DeleteResult, any>) => res.data);

  const result: PatchWorkersDelete = {
    type: actionTypesUser.PATCH_WORKERS_DELETE,
    payload: req,
  };
  return result;
}

/**
 * 사업자 등록증 반환
 * @param id
 * @returns
 */
export async function getComRegFile(id: string) {
  const req = await axios
    .get(genApiPath(AdminApiPath.review_comRegDoc, { id: id }))
    .then((res: AxiosResponse<unknown, any>) => res.data);

  const result = {
    type: actionTypesUser.ADMIN_COMPANIES_LIST,
    payload: req,
  };
  return result;
}

/**
 * 정비업 등록증 반환
 * @param id
 * @returns
 */
export async function getMainRegFile(id: string) {
  const req = await axios
    .get(genApiPath(AdminApiPath.review_mainRegDoc, { id: id }))
    .then((res: AxiosResponse<unknown, any>) => res.data);

  const result = {
    type: actionTypesUser.ADMIN_MAIN_LIST,
    payload: req,
  };
  return result;
}

/**
 * 업체와 대표자 정보 변경
 * @param id
 * @param dataToSubmit
 * @returns
 */
export async function _aPatchAdminSignUpInfo(
  id: string,
  dataToSubmit: SignUpInfo
) {
  const req: SignUpInfo = await axios
    .patch(genApiPath(AdminApiPath.signup_info, { id: id }), dataToSubmit)
    .then((res: AxiosResponse<SignUpInfo, SignUpInfo>): SignUpInfo => {
      return res.data;
    });

  const result: _iPatchAdminSignUpInfo = {
    type: ActionAPIs.ADMIN_PATCH_SINGUP_INFO,
    payload: req,
  };
  return result;
}

/**
 * 업체, 직원 정보 삭제
 * @param id
 * @returns
 */
export async function _aDeleteAdminCompanies(id: string) {
  const req: DeleteResult = await axios
    .delete(genApiPath(AdminApiPath.review_delete_companies, { id: id }))
    .then((res: AxiosResponse<DeleteResult, string>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteAdminCompanies = {
    type: ActionAPIs.ADMIN_DELETE_COMPANIES,
    payload: req,
  };
  return result;
}

/**
 * 업체와 대표자 사용 승인
 * /busItem, busType도 동시변경 가능
 * @param id _cID
 */
export async function approveCompany(id: string) {
  const req = await axios
    .patch(genApiPath(AdminApiPath.review_approve_companies, { id: id }))
    .then((res: AxiosResponse<unknown, any>) => res.data);

  const result: ApproveCompany = {
    type: ActionAPIs.APPROVE_COMPANY,
    payload: req,
  };
  return result;
}

/**
 * 업체 승인요청 거절
 * /대표자의 승인도 동시 취소
 * /e-mail 로 반려 사유 전송
 * @param id _cID
 * @param dataToSubmit OptionalInfo
 */
export async function rejectCompany(id: string, dataToSubmit: OptionalInfo) {
  const req = await axios
    .patch(
      genApiPath(AdminApiPath.review_reject_companies, { id: id }),
      dataToSubmit
    )
    .then((res: AxiosResponse<unknown, any>) => res.data);

  const result: RejectCompany = {
    type: ActionAPIs.REJECT_COMPANY,
    payload: req,
  };
  return result;
}

/**
 * approval 이 ing 단계인 업체 정보를 페이징 정보와 함께 반환
 * @param FindParameters
 */
export async function ingCompany(findParams: FindParameters) {
  const req: FindResult<Company> = await axios
    .get(genApiPath(AdminApiPath.ing_companies, { findParams: findParams }))
    .then(
      (
        res: AxiosResponse<FindResult<Company>, Company>
      ): FindResult<Company> => {
        return res.data;
      }
    );

  const result: _ingCompany = {
    type: ActionAPIs.ING_COMPANY,
    payload: req,
  };
  return result;
}

/**
 * approval이 done인 업체 정보를 페이징 정보와 함께 반환
 * @param FindParameters
 */
export async function _aGetAdminDoneCompanies(findParams: FindParameters) {
  const req: FindResult<Company> = await axios
    .get(genApiPath(AdminApiPath.done_companies, { findParams: findParams }))
    .then(
      (
        res: AxiosResponse<FindResult<Company>, Company>
      ): FindResult<Company> => {
        return res.data;
      }
    );

  const result: _iGetAdminDoneCompanies = {
    type: ActionAPIs.ADMIN_GET_DONE_COMPANIES,
    payload: req,
  };
  return result;
}

/**
 * 모든 직원 리스트 반환
 * @param findParams
 * @returns
 */
export async function _aGetAdminUsers(findParams: FindParameters) {
  const req: FindResult<User> = await axios
    .get(genApiPath(AdminApiPath.users, { findParams: findParams }))
    .then((res: AxiosResponse<FindResult<User>, User>): FindResult<User> => {
      return res.data;
    });

  const result: _iGetAdminUsers = {
    type: ActionAPIs.ADMIN_GET_USERS,
    payload: req,
  };
  return result;
}

/**
 * 해당 직원 리스트 반환
 * @param id
 * @param findParams
 * @returns
 */
export async function _aGetAdminUsersId(
  id: string,
  findParams: FindParameters
) {
  const req: FindResult<User> = await axios
    .get(genApiPath(AdminApiPath.users, { id: id, findParams: findParams }))
    .then((res: AxiosResponse<FindResult<User>, User>): FindResult<User> => {
      return res.data;
    });

  const result: _iGetAdminUsers = {
    type: ActionAPIs.ADMIN_GET_USERS,
    payload: req,
  };
  return result;
}

/**
 * 해당 직원 리스트 반환
 * @param id
 * @returns
 */
export async function _aGetAdminPartGenCode(id: string) {
  console.log("ID", id);
  const req: string = await axios
    .get(genApiPath(AdminApiPath.part_genCode, { id: id }))
    .then((res: AxiosResponse<string, string>): string => {
      return res.data;
    });

  const result: _iGetAdminPartGenCode = {
    type: ActionAPIs.ADMIN_DELETE_COMPANIES,
    payload: req,
  };
  return result;
}

/**
 * 부품 전체 리스트 반환
 * @returns
 */
export async function _aGetAdminParts() {
  const req: FindResult<Part> = await axios
    .get(genApiPath(AdminApiPath.parts))
    .then((res: AxiosResponse<FindResult<Part>, Part>): FindResult<Part> => {
      return res.data;
    });

  const result: _iGetAdminParts = {
    type: ActionAPIs.ADMIN_GET_PARTS,
    payload: req,
  };
  return result;
}

/**
 * 부품 선택 리스트 반환
 * @returns
 */
export async function _aGetAdminPartsClass(label: string) {
  const req: FindResult<Part> = await axios
    .get(genApiPath(AdminApiPath.parts_Class, { id: label }))
    .then((res: AxiosResponse<FindResult<Part>, Part>): FindResult<Part> => {
      return res.data;
    });

  const result: _iGetAdminPartsClass = {
    type: ActionAPIs.ADMIN_GET_PARTS_CLASS,
    payload: req,
  };
  return result;
}

/**
 * 부품 하나 삭제
 * @param id
 * @returns
 */
export async function _aDeleteAdminPartsOne(id: string) {
  const req: DeleteResult = await axios
    .delete(genApiPath(AdminApiPath.parts, { id: id }))
    .then((res: AxiosResponse<DeleteResult, string>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteAdminPartsOne = {
    type: ActionAPIs.ADMIN_DELETE_PARTS_ONE,
    payload: req,
  };
  return result;
}

/**
 * 부품 여러개 삭제
 * @param id
 * @returns
 */
export async function _aDeleteAdminPartsMany(ids: string[]) {
  const oids: DeleteObjectIds = {
    ids,
  };
  const req: DeleteResult = await axios
    .post(genApiPath(AdminApiPath.part_deletemany), oids)
    .then((res: AxiosResponse<DeleteResult, string[]>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteAdminPartsMany = {
    type: ActionAPIs.ADMIN_DELETE_PARTS_MANY,
    payload: req,
  };
  return result;
}
