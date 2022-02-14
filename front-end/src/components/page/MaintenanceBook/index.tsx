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
import SelectCar from "./section/step1";
import PayComplete from "./section/step2";
import MaintenanceIng from "./section/step3";
import MaintenanceComplete from "./section/step4";
import ReleaseComplete from "./section/step5";
import { MainStatus } from "src/constants/maintenance.const";

const StepMaintenance: NextPage<_pMaintenanceProps> = (props) => {
  const router = useRouter();

  switch (router.query.step) {
    case MainStatus.STORED:
      return <SelectCar {...props} />;

    case MainStatus.ING:
      return <PayComplete />;

    case MainStatus.DONE:
      return <MaintenanceIng />;

    case MainStatus.PAID:
      return <MaintenanceComplete />;

    case MainStatus.RELEASED:
      return <ReleaseComplete />;

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
