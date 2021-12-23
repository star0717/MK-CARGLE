import type { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { _aGetAdminReivewCompanies } from "../../../../../store/action/user.action";
import { _iFindCompanies } from "../../../../../store/interfaces";
import { _pADMIN_REVIEW_COMPANIES } from "../../../../configure/_pProps.entity";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import AdminReviewCompaniesPresenter from "./presenter";

const AdminReviewCompaniesPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //직원 명단 API Result 관련
  const [findResult, setFindResult] = useState<FindResult<Company>>(props.data);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findCompanyHandler = (page: number) => {
    const param: FindParameters = {
      page,
      take: 1,
    };
    dispatch(_aGetAdminReivewCompanies(param)).then((res: _iFindCompanies) => {
      setFindResult(res.payload);
    });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const fprops: _pADMIN_REVIEW_COMPANIES = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return <AdminReviewCompaniesPresenter {...fprops} />;
};

export default AdminReviewCompaniesPage;
