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
  MainStatus,
} from "src/constants/maintenance.const";
import MaintenanceStored from "./section/stored";
import MaintenanceIng from "./section/ing";
import MaintenanceDone from "./section/done";
import MaintenancePaid from "./section/paid";
import MaintenanceReleased from "./section/released";
import { _aGetMaintenancesList } from "store/action/user.action";
import dayjs from "dayjs";

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
  const [searchFrom, setSearchFrom] = useState<string>();
  const [searchTo, setSearchTo] = useState<string>();
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
    // var date = new Date(searchFrom);
    // var date2 = dayjs(date).format("YYYY-MM-DD");
    // console.log("string to date", date2);
    const param: FindParameters = {
      page,
      take: 10,
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
      sFrom: searchFrom,
      sTo: searchTo,
    };

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
  console.log("sFrom", searchFrom);
  console.log("sTo", searchTo);
  return (
    <BodyWrapper>
      {/* <MaintenenanceList {...maintenanceListProps} /> */}
      <StepMaintenance {...maintenanceListProps} />
    </BodyWrapper>
  );
};

export default MaintenanceBookPage;
