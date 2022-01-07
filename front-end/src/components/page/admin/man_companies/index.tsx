import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _aGetAdminManCompanies } from "../../../../../store/action/user.action";
import { _iFindCompanies } from "../../../../../store/interfaces";
import { RootStateInterface } from "../../../../../store/interfaces/RootState";
import { Step } from "../../../../configure/router.entity";
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
      take: 5,
      filterKey: "approval",
      filterValue: "done",
    };
    dispatch(_aGetAdminManCompanies(param)).then((res: _iFindCompanies) => {
      setFindResult(res.payload);
    });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const adminManComProps: _pAdminManCompanies = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
  };

  // switch (routerQuery.id) {
  //   case Step.FIRST:
  //     return (
  //       <BodyWrapper>
  //         <ManCompanyInfo {...adminManComProps} />
  //       </BodyWrapper>
  //     );
  //   default:
  //     return (
  //       <BodyWrapper>
  //         <ManCompanyList {...adminManComProps} />
  //       </BodyWrapper>
  //     );
  // }
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
