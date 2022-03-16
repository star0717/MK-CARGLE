import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ingCompany } from "../../../../../store/action/user.action";
import { _ingCompany } from "../../../../../store/interfaces";
import { _pAdminReviewCompanies } from "../../../../configure/_pProps.entity";
import { _MainProps } from "../../../../configure/_props.entity";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import { getQuery } from "../../../../modules/commonModule";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import AdminReviewCompaniesinfo from "./reviewCompaniesInfo";
import AdminReviewCompaniesList from "./reviewCompaniesList";

const AdminReviewCompaniesPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Page configuration
   *********************************************************************/
  const dispatch = useDispatch();
  const router = useRouter();
  const routerQuery = getQuery(router.asPath);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //modal 창 여부
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  //직원 명단 API Result 관련
  const [findResult, setFindResult] = useState<FindResult<Company>>(props.data);
  //직원 명단 API Result 관련
  const [searchOption, setSearchOption] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<string>("");

  /*********************************************************************
   * 3. Handlers
   *********************************************************************

  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findCompanyHandler = (page: number) => {
    const param: FindParameters = {
      page,
      take: 10,
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
    };
    dispatch(ingCompany(param)).then((res: _ingCompany) => {
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
    searchOption,
    setSearchOption,
    filterValue,
    setFilterValue,
    findDocHandler: findCompanyHandler,
  };

  if (routerQuery.id) {
    return (
      <BodyWrapper>
        <AdminReviewCompaniesinfo {...adminReviewComProps} />
      </BodyWrapper>
    );
  } else {
    return (
      <BodyWrapper>
        <AdminReviewCompaniesList {...adminReviewComProps} />
      </BodyWrapper>
    );
  }
};

export default AdminReviewCompaniesPage;
