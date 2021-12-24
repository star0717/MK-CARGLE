import { NextPage } from "next";
import React from "react";
import WorkerInfo from "./section/workerInfo";
import { _pWorkerData } from "../../../configure/_pProps.entity";

const MyPageWorkerPresenter: NextPage<_pWorkerData> = (props) => {
  return <WorkerInfo {...props} />;
};

export default MyPageWorkerPresenter;
