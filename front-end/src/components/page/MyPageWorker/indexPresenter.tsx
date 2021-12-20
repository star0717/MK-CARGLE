import { NextPage } from "next";
import { WholeWrapper } from "../../styles/CommonComponents";
import React from "react";
import workerInfo from "./section/workerInfo";

const MyPageWorkerPresenter: NextPage<any> = (props) => {
  return <WholeWrapper>{<workerInfo {...props} />}</WholeWrapper>;
};

export default MyPageWorkerPresenter;
