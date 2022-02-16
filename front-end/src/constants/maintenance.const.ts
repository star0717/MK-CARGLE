import { MainFindOptions } from './../models/maintenance.entity';
/***************************************************
 * Maintenance 모델 참조 상수
 ***************************************************/

/********** 정비 상태 ******************/
// 정비 상태
export enum MainStatus {
  STORED = 'stored', // 정비시작 전
  ING = 'ing', // 정비중
  DONE = 'done', // 정비완료
  PAID = 'paid', // 결재완료
  RELEASED = 'released', // 출고완료
}

// 정비 상태 리스트
export const mainStatusList = Object.values(MainStatus).map((e) => e);

/**
 * 정비상태에 따른 한글 상태값 반환
 * @param status MaintenanceStatus 값
 * @returns 한글 상태값
 */
export const getStrMainStatus = (status: MainStatus): string => {
  switch (status) {
    case MainStatus.STORED:
      return '입고';
    case MainStatus.ING:
      return '정비중';
    case MainStatus.DONE:
      return '정비완료';
    case MainStatus.PAID:
      return '결제완료';
    case MainStatus.RELEASED:
      return '출고';
    default:
      return null;
  }
};

/********** 고객 타입 ******************/
// 고객 타입
export enum MainCustomerType {
  NORMAL = 'normal',
  INSURANCE = 'insurance',
}

// 고객 타입 리스트
export const mainCustomerTypeList = Object.values(MainCustomerType).map(
  (e) => e,
);

/**
 * 고객 타입에 해당하는 한글 타입값 반환
 * @param type 고객 타입
 * @returns 한글 타입값
 */
export const getStrMainCustomerType = (type: MainCustomerType): string => {
  switch (type) {
    case MainCustomerType.NORMAL:
      return '일반';
    case MainCustomerType.INSURANCE:
      return '보험';
    default:
      return null;
  }
};

/********** 부품 타입 ******************/
// 부품 타입
export enum MainPartsType {
  A = 'a',
  B = 'b',
  C = 'c',
  F = 'f',
}

// 부품 타입 리스트
export const mainPartsTypeList = Object.values(MainPartsType).map((e) => e);

/**
 * 부품 타입에 해당하는 한글 타입값 반환
 * @param type 부품 타입
 * @returns 한글 타입값
 */
export const getStrMainPartsType = (type: MainPartsType): string => {
  switch (type) {
    case MainPartsType.A:
      return '정품';
    case MainPartsType.B:
      return '호환품';
    case MainPartsType.C:
      return '중고';
    case MainPartsType.F:
      return '재생';
    default:
      return null;
  }
};

/********** 검색 옵션 쿼리 생성 ******************/
export const genMainOptionQuery = (data: MainFindOptions) => {
  let query = '&';
  if (data?.costomerType) query += 'costomerType=' + data.costomerType + '&';
  if (data?.status) query += 'status=' + data.status + '&';
  if (data?.regNumber) query += 'regNumber=' + data.regNumber;
  return query;
};

/********** 문서 발급 형태 ******************/
// 문서 발급 타입
export enum MainDocPubType {
  NOT_ISSUED = 'n',
  PRINT = 'p',
  ONLINE = 'o',
}

// 문서 발급 타입 리스트
export const mainDocPubTypeList = Object.values(MainDocPubType).map((e) => e);

export const getStrMainDocPubType = (type: MainDocPubType): string => {
  switch (type) {
    case MainDocPubType.NOT_ISSUED:
      return '미발급';
    case MainDocPubType.PRINT:
      return '출력';
    case MainDocPubType.ONLINE:
      return '온라인';
  }
};
