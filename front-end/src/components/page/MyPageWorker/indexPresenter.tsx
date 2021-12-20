import { NextPage } from "next";
import { WholeWrapper } from "../../styles/CommonComponents";
import React from "react";
import WorkerInfo from "./section/workerInfo";

const MyPageWorkerPresenter: NextPage<any> = (props) => {
  return (
    <WholeWrapper>
      <WorkerInfo {...props} />
    </WholeWrapper>
  );
};

export default MyPageWorkerPresenter;
