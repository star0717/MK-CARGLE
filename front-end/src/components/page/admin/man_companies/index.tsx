import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { _aGetAdminDoneCompanies } from "../../../../../store/action/user.action";
import { _iGetAdminDoneCompanies } from "../../../../../store/interfaces";
import { _pAdminManCompanies } from "../../../../configure/_pProps.entity";
import { _MainProps } from "../../../../configure/_props.entity";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import { getQuery } from "../../../../modules/commonModule";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import ManCompanyInfo from "./manCompanyInfo";
import ManCompanyList from "./manCompanyList";

const AdminManCompaniesPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Page configuration
   *********************************************************************/
  const dispatch = useDispatch();
  const router = useRouter();
  const routerQuery = getQuery(router.asPath);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //직원 명단 API Result 관련
  const [findResult, setFindResult] = useState<FindResult<Company>>(props.data);
  const [searchOption, setSearchOption] = useState<string>("name"); // 검색 옵션
  const [filterValue, setFilterValue] = useState<string>(""); // 검색 내용
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  useEffect(() => {
    setFindResult(props.data);
  }, [props]);

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
    dispatch(_aGetAdminDoneCompanies(param)).then(
      (res: _iGetAdminDoneCompanies) => {
        setFindResult(res.payload);
      }
    );
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const adminManComProps: _pAdminManCompanies = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
    searchOption,
    setSearchOption,
    filterValue,
    setFilterValue,
  };

  if (routerQuery.id) {
    return (
      <BodyWrapper>
        <ManCompanyInfo {...adminManComProps} />
      </BodyWrapper>
    );
  } else {
    return (
      <BodyWrapper>
        <ManCompanyList {...adminManComProps} />
      </BodyWrapper>
    );
  }
};

export default AdminManCompaniesPage;
