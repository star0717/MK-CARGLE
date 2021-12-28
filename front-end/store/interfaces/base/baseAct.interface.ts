import { FindResult } from "../../../src/models/base.entity";
import { Company } from "../../../src/models/company.entity";
import { User } from "../../../src/models/user.entity";

/*****************************************************
 * 1. Action API 정의부
 * - 호출할 API를 enum 으로 선언
 *****************************************************/
export enum ActionAPIs {
  // 모델 별 공통 API
  FIND_COMPANIES = "FIND_COMPANIES", // 업체 정보 조회
  FIND_USERS = "FIND_USERS", // 사용자 정보 조회

  // 고유 API
  FIND_COMPANY_CLICK = "FIND_COMPANY_CLICK", // 업체 정보 조회(선택한 업체만)
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
// 업체 정보 조회 결과
export class _iFindCompanies implements baseActionInterface {
  type: ActionAPIs.FIND_COMPANIES;
  payload: FindResult<Company>;
}

// 사용자 정보 조회 결과
export class _iFindUsers implements baseActionInterface {
  type: ActionAPIs.FIND_USERS;
  payload: FindResult<User>;
}

/** 고유 API 인터페이스 **/

// 업체 정보 조회(선택한 업체만)
export class _iFindCompanyClick implements baseActionInterface {
  type: ActionAPIs.FIND_COMPANY_CLICK;
  payload: Company;
}

/*****************************************************
 * 3. ActionInterfaces 정의부
 * - store에 등록(Redux???)
 * => 정의한 인터페이스를 등록
 *****************************************************/
export type ActionInterfaces =
  | _iFindCompanies
  | _iFindUsers
  | _iFindCompanyClick;
