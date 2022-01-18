import { FindParameters } from "../models/base.entity";

/***************************************************
 * Base 모델 참조 상수
 ***************************************************/
export const genFindParamQuery = (data: FindParameters) => {
  let query = "";
  if (data?.page) query = query + "?page=" + data.page;
  else query = query + "?page=1";
  if (data?.take) query = query + "&take=" + data.take;
  if (data?.filterKey && data?.filterValue) {
    query =
      query +
      "&filterKey=" +
      data.filterKey +
      "&filterValue=" +
      data.filterValue;
    if (data.useRegSearch == true) {
      query = query + "&useRegSearch=" + data.useRegSearch;
    }
  }
  return query;
};

// 페이지당 출력될 문서의 수의 기봅값
export const defTakeNum: number = 30;
// 페이지장 출력될 문서의 최소 수
export const minTakeNum: number = 1;
// 페이지장 출력될 문서의 최대 수
export const maxTakeNum: number = 100;

/***************************************************
 * Company 모델 참조 상수
 ***************************************************/
export enum CompanyApproval {
  BEFORE = "before", // 심사 전. 회원가입 후 서류 제출 완료 전
  ING = "ing", // 심사 중. 회원가입 및 서류 제출 완료
  DONE = "done", // 승인완료
}

/***************************************************
 * User 모델 참조 상수
 ***************************************************/
export enum UserAuthority {
  ADMIN = "admin", // MK의 시스템 관리자
  OWNER = "owner", // 카센터
  WORKER = "worker", // 카센터 직원
}
