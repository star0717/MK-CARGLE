import type { NextPage } from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../models/user.entity";
import { getWorkersListAction } from "../../../../store/action/user.action";
import { _pWorkerData } from "../../../configure/_pProps.entity";
import { _MainProps } from "../../../configure/_props.entity";
import { FindParameters, FindResult } from "../../../models/base.entity";
import { GetWorkersList } from "../../../../store/interfaces";
import WorkerInfo from "./section/workerInfo";

const MyPageWorker: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //직원 명단 API Result 관련
  const [findResult, setFindResult] = useState<FindResult<User>>(props.data);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findWorksHandler = (page: number) => {
    const param: FindParameters = {
      page,
      take: 10,
    };
    dispatch(getWorkersListAction(param)).then((res: GetWorkersList) => {
      setFindResult(res.payload);
    });
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const myPageWorkerProps: _pWorkerData = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findWorksHandler,
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return <WorkerInfo {...myPageWorkerProps} />;
};

export default MyPageWorker;
