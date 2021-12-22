import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../models/user.entity";
import { getWorkersListAction } from "../../../../store/action/user.action";
import { WholeWrapper } from "../../styles/CommonComponents";
import MyPageWorkerPresenter from "./indexPresenter";
import { _pTermProps, _pWorkerData } from "../../../configure/_pProps.entity";
import { _MainProps } from "../../../configure/_props.entity";
import { FindParameters, FindResult } from "../../../models/base.entity";
import { LastPage } from "@material-ui/icons";

const MyPageWorker: NextPage<_MainProps> = (props) => {
  const dispatch = useDispatch();

  //직원 명단 API Result 관련
  const [pageNation, setPageNation] = useState([]);
  const [findResult, setFindResult] = useState<FindResult<User>>(props.data);

  console.log(props.data);

  const fprops: _pWorkerData = {
    ...props,
    findResult,
    setFindResult,
  };

  return (
    <WholeWrapper>
      <MyPageWorkerPresenter {...fprops} />
    </WholeWrapper>
  );
};

export default MyPageWorker;
