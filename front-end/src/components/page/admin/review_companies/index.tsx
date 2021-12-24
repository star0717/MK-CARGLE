import { Modal } from "@material-ui/core";
import dayjs from "dayjs";
import type { NextPage } from "next";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { _aGetAdminReivewCompanies } from "../../../../../store/action/user.action";
import { _iFindCompanies } from "../../../../../store/interfaces";
import { _pAdminReviewCompanies } from "../../../../configure/_pProps.entity";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { Company, CompanyApproval } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import {
  CloseButton,
  RsWrapper,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<Company>();

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
  const fprops: _pAdminReviewCompanies = {
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
