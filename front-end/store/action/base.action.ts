/*****************************************************
 * ADMIN
 *****************************************************/

import axios, { AxiosResponse } from "axios";
import { FindParameters, FindResult } from "../../src/models/base.entity";
import { Company } from "../../src/models/company.entity";
import { actionTypesUser } from "../interfaces";
import {
  ActionAPIs,
  _iFindCompanies,
} from "../interfaces/base/baseAct.interface";

// 승인요청 업체 조회
export async function _aGetAdminReivewCompanies(findParams: FindParameters) {
  const req: FindResult<Company> = await axios
    .get(`/api/admin/review/companies?${FindParameters.getQuery(findParams)}`)
    .then(
      (
        res: AxiosResponse<FindResult<Company>, Company>
      ): FindResult<Company> => {
        return res.data;
      }
    );

  const result: _iFindCompanies = {
    type: ActionAPIs.FIND_COMPANIES,
    payload: req,
  };
  return result;
}

/**
 * 업체 리스트 반환 action
 */
export async function _aGetAdminManCompanies(findParams: FindParameters) {
  const req: FindResult<Company> = await axios
    .get(`/api/admin/companies?${FindParameters.getQuery(findParams)}`)
    .then(
      (
        res: AxiosResponse<FindResult<Company>, Company>
      ): FindResult<Company> => {
        return res.data;
      }
    );

  const result: _iFindCompanies = {
    type: ActionAPIs.FIND_COMPANIES,
    payload: req,
  };
  return result;
}
