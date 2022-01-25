import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { PagenationSection } from "../../common/sections";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { _MainProps } from "src/configure/_props.entity";
import ManBusinessList from "./businessList";
import { Agency } from "src/models/agency.entity";
import { FindParameters, FindResult } from "src/models/base.entity";

const ManPartsPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [findResult, setFindResult] = useState<FindResult<Agency>>(props.data);
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

    // dispatch(_aGetAdminDoneCompanies(param)).then(
    //   (res: _iGetAdminDoneCompanies) => {
    //     setFindResult(res.payload);
    //   }
    // );
  };
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const businessListProps: any = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
    searchOption,
    setSearchOption,
    filterValue,
    setFilterValue,
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <BodyWrapper>
      <ManBusinessList {...businessListProps} />
    </BodyWrapper>
  );
};

export default ManPartsPage;
