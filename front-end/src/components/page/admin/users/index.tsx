import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  _aGetAdminManCompanies,
  _aGetAdminUsers,
} from "../../../../../store/action/user.action";
import {
  _iFindCompanies,
  _iGetAdminUsers,
} from "../../../../../store/interfaces";
import {
  _pAdminManCompanies,
  _pAdminUsers,
} from "../../../../configure/_pProps.entity";
import { _MainProps } from "../../../../configure/_props.entity";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { Company } from "../../../../models/company.entity";
import { User } from "../../../../models/user.entity";
import { getQuery } from "../../../../modules/commonModule";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import UserList from "./userList";

const AdminUsersPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Page configuration
   *********************************************************************/
  const dispatch = useDispatch();
  const router = useRouter();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //직원 명단 API Result 관련
  const [findResult, setFindResult] = useState<FindResult<User>>(props.data);
  const [searchOption, setSearchOption] = useState<string>("name"); // 검색 옵션
  const [filterValue, setFilterValue] = useState<string>(""); // 검색 내용
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findUserHandler = (page: number) => {
    const param: FindParameters = {
      take: 10,
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
    };
    dispatch(_aGetAdminUsers(param)).then((res: _iGetAdminUsers) => {
      setFindResult(res.payload);
    });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const adminUsersListProps: _pAdminUsers = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findUserHandler,
    searchOption,
    setSearchOption,
    filterValue,
    setFilterValue,
  };

  return (
    <BodyWrapper>
      <UserList {...adminUsersListProps} />
    </BodyWrapper>
  );
};

export default AdminUsersPage;
