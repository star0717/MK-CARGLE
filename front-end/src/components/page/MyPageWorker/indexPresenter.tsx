import { NextPage } from "next";
import { WholeWrapper } from "../../styles/CommonComponents";
import React from "react";
import WorkerInfo from "./section/workerInfo";
import { _pWorkerData } from "../../../configure/_pProps.entity";

const MyPageWorkerPresenter: NextPage<_pWorkerData> = (props) => {
  return (
    <WholeWrapper>
      <WorkerInfo {...props} />
    </WholeWrapper>
  );
};

export default MyPageWorkerPresenter;
