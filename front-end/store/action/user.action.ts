import { SmsApiPath } from "src/constants/api-path.const";
import { genMainOptionQuery } from "src/constants/maintenance.const";
import axios, { AxiosResponse } from "axios";
import {
  ConfirmPWD,
  HelpChangePWD,
  HelpFindEmail,
  HelpFindPWD,
  SignUpInfo,
  UserInfo,
} from "src/models/auth.entity";
import {
  DeleteResult,
  FindParameters,
  FindResult,
  OptionalInfo,
} from "src/models/base.entity";
import { Company } from "src/models/company.entity";
import { User } from "src/models/user.entity";
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
  _iAdminParts,
  _iAgencies,
  _iAgency,
  _iDeleteByUser,
  _iPartssetsOne,
  _iPartssets,
  _iGetMaintenancesCarInfo,
  _iMaintenances,
  _iMaintenancesOne,
  _iEstimate,
  _iStatement,
  _iPayment,
  _iSms,
  _iPaymentComplete,
  ComFileUpload,
  ManFileUpload,
  UserCompanyFind,
} from "../interfaces";

import {
  AuthApiPath,
  AdminApiPath,
  SettingsApiPath,
  AgenciesApiPath,
  PartsSetsApiPath,
  EstimatesApiPath,
  MaintenancesApiPath,
  PaymentApiPath,
  StatementsApiPath,
} from "src/constants/api-path.const";
import { genApiPath } from "src/modules/commonModule";
import { DeleteObjectIds } from "src/models/base.entity";
import { Part } from "src/models/part.entity";
import { Agency } from "src/models/agency.entity";
import { PartsSet } from "src/models/partsset.entity";
import { Car } from "src/models/car.entity";
import {
  MainFindOptions,
  MainPubDocInfo,
  Maintenance,
} from "src/models/maintenance.entity";
import { Estimate } from "src/models/estimate.entity";
import { Statement } from "src/models/statement.entity";
import {
  CancelData,
  PayData,
  PayResult,
  RequestCustomResponse,
} from "src/models/payment.entity";
import { GetMessagesResponse } from "src/models/sms.entity";
import { CompanyDocList } from "src/models/company.doc.entity";

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

// 업체ID 검색 action
export async function _aGetAuthCompanyId(id: string) {
  const req: Company = await axios
    .get(genApiPath(AuthApiPath.companyId, { id: id }))
    .then((res: AxiosResponse<Company, string>) => res.data);

  const result: UserCompanyFind = {
    type: actionTypesUser.USER_COMPANY_FIND,
    payload: req,
  };

  return result;
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

// // 사업자등록증 업로드 action
// export async function _aPostAuthUploadComRegDoc(dataToSubmit: FormData) {
//   const req = await axios
//     .post(genApiPath(AuthApiPath.upload_com_reg_doc), dataToSubmit, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res: AxiosResponse<unknown, any>) => res.data);
//   return {
//     type: actionTypesUser.COM_FILE_UPLOAD,
//     payload: req,
//   };
// }

// // 정비업등록증 업로드 action
// export async function _aPostAuthUploadManRegDoc(dataToSubmit: FormData) {
//   const req = await axios
//     .post(genApiPath(AuthApiPath.upload_man_reg_doc), dataToSubmit, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res: AxiosResponse<unknown, any>) => res.data);
//   return {
//     type: actionTypesUser.MAN_FILE_UPLOAD,
//     payload: req,
//   };
// }

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

/**
 * 새로운 Part를 추가
 * @param id
 * @returns
 */
export async function _aPostAdminPart(setPart: Partial<Part>) {
  const req = await axios
    .post(genApiPath(AdminApiPath.parts), setPart)
    .then((res: AxiosResponse<string, string[]>): string => {
      return res.data;
    });

  const result: _iAdminParts = {
    type: ActionAPIs.ADMIN_PARTS,
    payload: req,
  };
  return result;
}

/**
 * Part 데이터 갱신
 * @param id
 * @returns
 */
export async function _aPatchAdminPart(id: string, setPart: Partial<Part>) {
  const req = await axios
    .patch(genApiPath(AdminApiPath.parts, { id: id }), setPart)
    .then((res: AxiosResponse<string, string[]>): string => {
      return res.data;
    });

  const result: _iAdminParts = {
    type: ActionAPIs.ADMIN_PARTS,
    payload: req,
  };
  return result;
}

/**
 * Part 데이터 반환
 * @param id
 * @returns
 */
export async function _aGetAdminPart(id: string) {
  const req = await axios
    .get(genApiPath(AdminApiPath.parts, { id: id }))
    .then((res: AxiosResponse<string, string[]>): string => {
      return res.data;
    });

  const result: _iAdminParts = {
    type: ActionAPIs.ADMIN_PARTS,
    payload: req,
  };
  return result;
}

/**
 * 부품 세트 데이터 전체 리스트 반환
 * @returns
 */
export async function _aGetPartssets() {
  const req = await axios
    .get(genApiPath(PartsSetsApiPath.partsSets))
    .then(
      (
        res: AxiosResponse<FindResult<PartsSet>, PartsSet>
      ): FindResult<PartsSet> => {
        return res.data;
      }
    );

  const result: _iPartssets = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 부품 세트 데이터 반환
 * @param id
 * @returns
 */
export async function _aGetPartssetsOne(id: string) {
  const req = await axios
    .get(genApiPath(PartsSetsApiPath.partsSets, { id: id }))
    .then((res: AxiosResponse<PartsSet, string>): PartsSet => {
      return res.data;
    });

  const result: _iPartssetsOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 부품 세트 추가
 * @param partSet
 * @returns
 */
export async function _aPostPartssetsOne(partSet: Partial<PartsSet>) {
  const req = await axios
    .post(genApiPath(PartsSetsApiPath.partsSets), partSet)
    .then((res: AxiosResponse<PartsSet, PartsSet>): PartsSet => {
      return res.data;
    });

  const result: _iPartssetsOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 부품 세트 수정
 * @param partSet
 * @returns
 */
export async function _aPatchPartssetsOne(
  id: string,
  partSet: Partial<PartsSet>
) {
  const req = await axios
    .patch(genApiPath(PartsSetsApiPath.partsSets, { id: id }), partSet)
    .then((res: AxiosResponse<PartsSet, PartsSet>): PartsSet => {
      return res.data;
    });

  const result: _iPartssetsOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 부품 세트 삭제
 * @param id
 * @returns
 */
export async function _aDeletePartssetsOne(id: string) {
  const req = await axios
    .delete(genApiPath(PartsSetsApiPath.partsSets, { id: id }))
    .then((res: AxiosResponse<DeleteResult, string>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteByUser = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

// /**
//  * 모든 직원 리스트 반환
//  * @param findParams
//  * @returns
//  */
//  export async function _aGetAdminUsers(findParams: FindParameters) {
//   const req: FindResult<User> = await axios
//     .get(genApiPath(AdminApiPath.users, { findParams: findParams }))
//     .then((res: AxiosResponse<FindResult<User>, User>): FindResult<User> => {
//       return res.data;
//     });

//   const result: _iGetAdminUsers = {
//     type: ActionAPIs.ADMIN_GET_USERS,
//     payload: req,
//   };
//   return result;
// }

/**
 * Agency 데이터 반환
 * @param findParams
 * @returns
 */
export async function _aGetAgencies(findParams: FindParameters) {
  const req: FindResult<Agency> = await axios
    .get(genApiPath(AgenciesApiPath.agencies, { findParams: findParams }))
    .then(
      (res: AxiosResponse<FindResult<Agency>, Agency>): FindResult<Agency> => {
        return res.data;
      }
    );

  const result: _iAgencies = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Agency 데이터 추가
 * @param dataToSubmit
 * @returns
 */
export async function _aPostAgency(dataToSubmit: Partial<Agency>) {
  const req = await axios
    .post(genApiPath(AgenciesApiPath.agencies), dataToSubmit)
    .then((res: AxiosResponse<Agency, Agency[]>): Agency => {
      return res.data;
    });

  const result: _iAgency = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Agency 데이터 갱신
 * @param id _id
 * @param dataToSubmit Agency
 * @returns
 */
export async function _aPatchAgency(id: string, dataToSubmit: Partial<Agency>) {
  const req = await axios
    .patch(genApiPath(AgenciesApiPath.agencies, { id: id }), dataToSubmit)
    .then((res: AxiosResponse<Agency, Agency[]>): Agency => {
      return res.data;
    });

  const result: _iAgency = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Agency 데이터 삭제
 * @param id _id
 * @returns
 */
export async function _aDeleteAgency(id: string) {
  const req: DeleteResult = await axios
    .delete(genApiPath(AgenciesApiPath.agencies, { id: id }))
    .then((res: AxiosResponse<DeleteResult, string>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteByUser = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Agency 데이터 삭제
 * @param ids DeleteObjectIds
 * @returns
 */
export async function _aPostAgenciesDeleteMany(ids: string[]) {
  const oids: DeleteObjectIds = {
    ids,
  };
  const req: DeleteResult = await axios
    .post(genApiPath(AgenciesApiPath.agencies_deleteMany), oids)
    .then((res: AxiosResponse<DeleteResult, string>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteByUser = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 차량정보 조회
 * @param id _id
 * @returns
 */
export async function _aGetMaintenancesCarInfo(id: string) {
  const req: Car = await axios
    .get(genApiPath(MaintenancesApiPath.carinfo, { id: id }))
    .then((res: AxiosResponse<Car, string>): Car => {
      return res.data;
    });

  const result: _iGetMaintenancesCarInfo = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 리스트 조회
 * @param findParams param
 * @param options costomerType,status,regNumber
 * @returns
 */
export async function _aGetMaintenancesList(
  findParams: FindParameters,
  options: MainFindOptions
) {
  const req: FindResult<Maintenance> = await axios
    .get(
      genApiPath(MaintenancesApiPath.maintenances, { findParams: findParams }) +
        genMainOptionQuery(options)
    )
    .then(
      (
        res: AxiosResponse<FindResult<Maintenance>, Maintenance>
      ): FindResult<Maintenance> => {
        return res.data;
      }
    );

  const result: _iMaintenances = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * id에 해당하는 Maintenances 조회
 * @param id _id
 * @returns
 */
export async function _aGetMaintenancesOne(id: string) {
  const req: Maintenance = await axios
    .get(genApiPath(MaintenancesApiPath.maintenances, { id: id }))
    .then((res: AxiosResponse<Maintenance, string>): Maintenance => {
      return res.data;
    });

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 추가(차량입고)
 * @param data
 * @returns
 */
export async function _aPostMaintenancesStore(data: Partial<Maintenance>) {
  const req: Maintenance = await axios
    .post(genApiPath(MaintenancesApiPath.store), data)
    .then(
      (res: AxiosResponse<Maintenance, Partial<Maintenance>>): Maintenance => {
        return res.data;
      }
    );

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 추가(정비시작)
 * @param data
 * @returns
 */
export async function _aPatchMaintenancesStart(
  id: string,
  data: Partial<Maintenance>
) {
  const req: Maintenance = await axios
    .patch(genApiPath(MaintenancesApiPath.start, { id: id }), data)
    .then(
      (res: AxiosResponse<Maintenance, Partial<Maintenance>>): Maintenance => {
        return res.data;
      }
    );

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 추가(정비완료)
 * @param data
 * @returns
 */
export async function _aPatchMaintenancesEnd(
  id: string,
  data: Partial<Maintenance>
) {
  const req: Maintenance = await axios
    .patch(genApiPath(MaintenancesApiPath.end, { id: id }), data)
    .then(
      (res: AxiosResponse<Maintenance, Partial<Maintenance>>): Maintenance => {
        return res.data;
      }
    );

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 추가(결제완료)
 * @param data
 * @returns
 */
export async function _aPatchMaintenancesPay(
  id: string,
  data: Partial<Maintenance>
) {
  const req: Maintenance = await axios
    .patch(genApiPath(MaintenancesApiPath.pay, { id: id }), data)
    .then(
      (res: AxiosResponse<Maintenance, Partial<Maintenance>>): Maintenance => {
        return res.data;
      }
    );

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 추가(출고완료)
 * @param data
 * @returns
 */
export async function _aPatchMaintenancesRelease(
  id: string,
  data: Partial<Maintenance>
) {
  const req: Maintenance = await axios
    .patch(genApiPath(MaintenancesApiPath.release, { id: id }), data)
    .then(
      (res: AxiosResponse<Maintenance, Partial<Maintenance>>): Maintenance => {
        return res.data;
      }
    );

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 저장
 * @param data
 * @returns
 */
export async function _aPatchMaintenancesSaveWorks(
  id: string,
  data: Partial<Maintenance>
) {
  const req: Maintenance = await axios
    .patch(genApiPath(MaintenancesApiPath.works, { id: id }), data)
    .then(
      (res: AxiosResponse<Maintenance, Partial<Maintenance>>): Maintenance => {
        return res.data;
      }
    );

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 삭제(한개)
 * @param id _id
 * @returns
 */
export async function _aDeleteMaintenancesDelete(id: string) {
  const req: DeleteResult = await axios
    .delete(genApiPath(MaintenancesApiPath.maintenances, { id: id }))
    .then((res: AxiosResponse<DeleteResult, string>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteByUser = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 데이터 삭제(여러개)
 * @param ids DeleteObjectIds
 * @returns
 */
export async function _aPostMaintenancesDeleteMany(ids: string[]) {
  const oids: DeleteObjectIds = {
    ids,
  };
  const req: DeleteResult = await axios
    .post(genApiPath(MaintenancesApiPath.deleteMany), oids)
    .then((res: AxiosResponse<DeleteResult, string>): DeleteResult => {
      return res.data;
    });

  const result: _iDeleteByUser = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 견적서 생성
 * @param id
 * @returns
 */
export async function _aGetMaintenancesGenEstimate(id: string) {
  const req: Maintenance = await axios
    .get(genApiPath(MaintenancesApiPath.gen_estimate, { id: id }))
    .then((res: AxiosResponse<Maintenance, string>): Maintenance => {
      return res.data;
    });

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 명세서 생성
 * @param id
 * @returns
 */
export async function _aGetMaintenancesGenStatement(id: string) {
  const req: Maintenance = await axios
    .get(genApiPath(MaintenancesApiPath.gen_statement, { id: id }))
    .then((res: AxiosResponse<Maintenance, string>): Maintenance => {
      return res.data;
    });

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 견적서 발급(프린트 or 온라인)
 * @param id
 * @param data
 * @returns
 */
export async function _aPatchMaintenancesPubEsitmate(
  id: string,
  data: MainPubDocInfo
) {
  const req: Maintenance = await axios
    .patch(genApiPath(MaintenancesApiPath.pub_estimate, { id: id }), data)
    .then((res: AxiosResponse<Maintenance, string>): Maintenance => {
      return res.data;
    });

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * Maintenances 명세서 발급(프린트 or 온라인)
 * @param id
 * @param data
 * @returns
 */
export async function _aPatchMaintenancesPubStatement(
  id: string,
  data: MainPubDocInfo
) {
  const req: Maintenance = await axios
    .patch(genApiPath(MaintenancesApiPath.pub_statement, { id: id }), data)
    .then((res: AxiosResponse<Maintenance, string>): Maintenance => {
      return res.data;
    });

  const result: _iMaintenancesOne = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 견적서 데이터 반환
 * @param id
 * @returns
 */
export async function _aGetEstimates(id: string) {
  const req: Estimate = await axios
    .get(genApiPath(EstimatesApiPath.BASE, { id: id }))
    .then((res: AxiosResponse<Estimate, string>): Estimate => {
      return res.data;
    });

  const result: _iEstimate = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 명세서 데이터 반환
 * @param id
 * @returns
 */
export async function _aGetStatement(id: string) {
  const req: Statement = await axios
    .get(genApiPath(StatementsApiPath.BASE, { id: id }))
    .then((res: AxiosResponse<Statement, string>): Statement => {
      return res.data;
    });

  const result: _iStatement = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 결제모듈 처리완료 api
 * @param data
 * @returns
 */
export async function _aPostPaymentComplete(data: PayData) {
  const req: PayResult = await axios
    .post(genApiPath(PaymentApiPath.complete), data)
    .then((res: AxiosResponse<PayResult, PayData>): PayResult => {
      return res.data;
    });

  const result: _iPaymentComplete = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 결제 조회
 * @param id
 * @returns
 */
export async function _aGetPaymentData(id: string) {
  const req: RequestCustomResponse = await axios
    .get(genApiPath(PaymentApiPath.payment, { id: id }))
    .then(
      (
        res: AxiosResponse<RequestCustomResponse, string>
      ): RequestCustomResponse => {
        return res.data;
      }
    );

  const result: _iPayment = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * 결제 환불
 * @param data
 * @returns
 */
export async function _aPostPayCancel(data: CancelData) {
  const req: PayResult = await axios
    .post(genApiPath(PaymentApiPath.cancel), data)
    .then((res: AxiosResponse<PayResult, CancelData>): PayResult => {
      return res.data;
    });

  const result: _iPaymentComplete = {
    type: ActionAPIs.USER_API,
    payload: req,
  };
  return result;
}

/**
 * SMS 알림톡 api
 * @returns
 */
export async function _aPostSms() {
  const req: GetMessagesResponse = await axios
    .post(genApiPath(SmsApiPath.send))
    .then(
      (res: AxiosResponse<GetMessagesResponse, any>): GetMessagesResponse => {
        return res.data;
      }
    );

  const result: _iSms = {
    type: ActionAPIs.USER_API,
    payload: req,
  };

  return result;
}

/***************************************************
 * 파일 업로드 테스트 시작
 ***************************************************/
// 사업자등록증 업로드 action
export async function _aPostAuthUploadComRegName(
  fileName: Partial<CompanyDocList>
) {
  const req: Company = await axios
    .post(genApiPath(AuthApiPath.upload_com_reg_name), fileName)
    .then((res: AxiosResponse<Company, string>) => res.data);

  const result: ComFileUpload = {
    type: actionTypesUser.COM_FILE_UPLOAD,
    payload: req,
  };

  return result;
}

// 정비업등록증 업로드 action
export async function _aPostAuthUploadManRegName(
  fileName: Partial<CompanyDocList>
) {
  const req: Company = await axios
    .post(genApiPath(AuthApiPath.upload_man_reg_name), fileName)
    .then((res: AxiosResponse<Company, string>) => res.data);
  const result: ManFileUpload = {
    type: actionTypesUser.MAN_FILE_UPLOAD,
    payload: req,
  };
  return result;
}
/***************************************************
 * 테스트 끝
 ***************************************************/
