import type { NextPage } from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../models/user.entity";
import { getWorkersListAction } from "../../../../store/action/user.action";
import { WholeWrapper } from "../../styles/CommonComponents";
import MyPageWorkerPresenter from "./indexPresenter";

const MyPageWorker: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  const [docs, setDocs] = useState<User[]>([]);
  const [totalDocs, setTotalDocs] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [lastPage, setLastPage] = useState<number>();

  dispatch(getWorkersListAction()).then((res: any) => {
    setDocs(res.payload.docs);
    setTotalDocs(res.payload.totalDocs);
    setCurrentPage(res.payload.currentPage);
    setLastPage(res.payload.lastPage);
  });

  const fprops = {
    ...props,
    docs,
    setDocs,
    totalDocs,
    setTotalDocs,
    currentPage,
    setCurrentPage,
    lastPage,
    setLastPage,
  };

  return (
    <WholeWrapper>
      <MyPageWorkerPresenter {...fprops} />
    </WholeWrapper>
  );
};

export default MyPageWorker;
