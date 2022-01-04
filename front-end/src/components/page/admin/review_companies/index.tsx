import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  _aGetAdminManCompanies,
  _aGetAdminReivewCompanies,
} from "../../../../../store/action/user.action";
import { _iFindCompanies } from "../../../../../store/interfaces";
import { Step } from "../../../../configure/router.entity";
import { _pAdminReviewCompanies } from "../../../../configure/_pProps.entity";
import { _MainProps } from "../../../../configure/_props.entity";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import { getQuery } from "../../../../modules/commonModule";
import AdminReviewCompaniesinfo from "./reviewCompaniesInfo";
import AdminReviewCompaniesList from "./reviewCompaniesList";

const AdminReviewCompaniesPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Page configuration
   *********************************************************************/
  const dispatch = useDispatch();
  const router = useRouter();
  const routerQuery = getQuery(router.asPath);

  // const { company } = useSelector(
  //   (state: RootStateInterface): BaseState => state.baseAll
  // );

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //modal 창 여부
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
      take: 5,
    };
    dispatch(_aGetAdminReivewCompanies(param)).then((res: _iFindCompanies) => {
      setFindResult(res.payload);
    });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const adminReviewComProps: _pAdminReviewCompanies = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
  };
  console.log(routerQuery);
  switch (routerQuery.step) {
    case Step.FIRST:
      return <AdminReviewCompaniesinfo {...adminReviewComProps} />;
    default:
      return <AdminReviewCompaniesList {...adminReviewComProps} />;
  }
};

export default AdminReviewCompaniesPage;
