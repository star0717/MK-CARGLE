import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { _MainProps } from "src/configure/_props.entity";
import MaintenenanceList from "./section/maintenanceList";
import { useDispatch } from "react-redux";
import { Agency } from "src/models/agency.entity";
import { FindResult, FindParameters } from "src/models/base.entity";
import { _pMaintenanceProps } from "src/configure/_pProps.entity";
import { useRouter } from "next/router";
import {
  genMainOptionQuery,
  MainCustomerType,
  MainStatus,
} from "src/constants/maintenance.const";
import MaintenanceStored from "./section/stored";
import MaintenanceIng from "./section/ing";
import MaintenanceDone from "./section/done";
import MaintenancePaid from "./section/paid";
import MaintenanceReleased from "./section/released";
import { _aGetMaintenancesList } from "store/action/user.action";
import { MainFindOptions } from "../../../../../back-end/src/models/maintenance.entity";
import dayjs from "dayjs";
import { MaintenancesApiPath } from "src/constants/api-path.const";
import { genApiPath } from "src/modules/commonModule";

const StepMaintenance: NextPage<_pMaintenanceProps> = (props) => {
  const router = useRouter();

  switch (router.query.step) {
    case MainStatus.STORED:
      return <MaintenanceStored {...props} />;

    case MainStatus.ING:
      return <MaintenanceIng />;

    case MainStatus.DONE:
      return <MaintenanceDone />;

    case MainStatus.PAID:
      return <MaintenancePaid />;

    case MainStatus.RELEASED:
      return <MaintenanceReleased />;

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
  const [findResult, setFindResult] = useState<FindResult<any>>(props.data);
  const [searchOption, setSearchOption] = useState<string>("name"); // 검색 옵션
  const [filterValue, setFilterValue] = useState<string>(""); // 검색 내용
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");
  const [searchDetails, setSearchDetails] = useState<MainFindOptions>({
    costomerType: MainCustomerType.INSURANCE,
    status: MainStatus.STORED,
    regNumber: "152머1535",
  });
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
    var sFromDate: Date = new Date(searchFrom);
    var sToDate: Date = new Date(searchTo);

    // console.log("sFrom", sFromDate);
    // console.log("sTo", sToDate);

    const param: FindParameters = {
      page,
      take: 10,
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
    };
    if (searchFrom) param.sFrom = sFromDate;
    if (searchTo) param.sTo = sToDate;

    console.log("param: ", param);

    console.log(
      "여기",
      genApiPath(MaintenancesApiPath.maintenances, { findParams: param })
    );
    dispatch(_aGetMaintenancesList(param)).then((res: any) => {
      setFindResult(res.payload);
    });

    // dispatch(_aGetAgencies(param)).then((res: any) => {
    //   setFindResult(res.payload);
    // });
  };
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
    setSearchFrom,
    setSearchTo,
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
