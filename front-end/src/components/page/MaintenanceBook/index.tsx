import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { _MainProps } from "src/configure/_props.entity";
import MaintenenanceList from "./section/maintenanceList";
import { useDispatch } from "react-redux";
import { FindResult, FindParameters } from "src/models/base.entity";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { useRouter } from "next/router";
import { MainStatus } from "src/constants/maintenance.const";
import { _aGetMaintenancesList } from "store/action/user.action";
import MaintenanceCreate from "./section/create";
import MaintenanceStored from "./section/stored";
import MaintenanceIng from "./section/ing";
import MaintenanceDone from "./section/done";
import MaintenancePaid from "./section/paid";
import MaintenanceReleased from "./section/released";
import { Maintenance } from "src/models/maintenance.entity";
import { Statement } from "src/models/statement.entity";
import { Estimate } from "src/models/estimate.entity";

const StepMaintenance: NextPage<_pMaintenanceProps> = (props) => {
  const router = useRouter();

  switch (router.query.step) {
    case "c":
      return <MaintenanceCreate />;

    case MainStatus.STORED:
      return <MaintenanceStored {...props} />;

    case MainStatus.ING:
      return <MaintenanceIng {...props} />;

    case MainStatus.DONE:
      return <MaintenanceDone {...props} />;

    case MainStatus.PAID:
      return <MaintenanceReleased {...props} />;

    case MainStatus.RELEASED:
      return <MaintenanceReleased {...props} />;

    default:
      return <MaintenenanceList {...props} />;
  }
};

const MaintenanceBookPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [findResult, setFindResult] = useState<FindResult<Maintenance>>(
    props.data
  );
  const [searchOption, setSearchOption] = useState<string>("name"); // 검색 옵션
  const [filterValue, setFilterValue] = useState<string>(""); // 검색 내용
  const [searchList, setSearchList] = useState({
    sFrom: props.data.sFrom,
    sTo: props.data.sTo,
    regNumber: "",
    costomerType: "all",
    status: "all",
  });

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
      take: 10,
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
    };
    if (searchList.sFrom !== "") {
      var sFromDate: Date = new Date(searchList.sFrom);
      param.sFrom = sFromDate;
    }
    if (searchList.sTo !== "") {
      var sToDate: Date = new Date(searchList.sTo);
      param.sTo = sToDate;
    }
    //searchDetails 빈 json 생성
    const searchDetails: any = {};
    //차량번호
    if (searchList.regNumber !== "")
      searchDetails.regNumber = searchList.regNumber;
    else delete searchDetails.regNumber;
    //구분
    if (searchList.costomerType !== "all")
      searchDetails.costomerType = searchList.costomerType;
    else delete searchDetails.costomerType;
    //정비상태
    if (searchList.status !== "all") searchDetails.status = searchList.status;
    else delete searchDetails.status;

    dispatch(_aGetMaintenancesList(param, searchDetails)).then((res: any) => {
      setFindResult(res.payload);
    });
  };
  console.log("@@@@@", findResult);
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const maintenanceListProps: _pMaintenanceProps = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
    searchOption,
    setSearchOption,
    filterValue,
    setFilterValue,
    searchList,
    setSearchList,
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <BodyWrapper>
      {/* <MaintenenanceList {...maintenanceListProps} /> */}
      <StepMaintenance {...maintenanceListProps} />
    </BodyWrapper>
  );
};

export default MaintenanceBookPage;
