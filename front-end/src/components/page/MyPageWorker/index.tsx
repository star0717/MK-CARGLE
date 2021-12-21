import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../models/user.entity";
import { getWorkersListAction } from "../../../../store/action/user.action";
import { WholeWrapper } from "../../styles/CommonComponents";
import MyPageWorkerPresenter from "./indexPresenter";
import { _pTermProps, _pWorkerData } from "../../../configure/_pProps.entity";
import { FindParameters, FindResult } from "../../../models/base.entity";

const MyPageWorker: NextPage<_pWorkerData> = (props) => {
  const dispatch = useDispatch();

  const [docs, setDocs] = useState<User[]>([]);
  const [totalDocs, setTotalDocs] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [lastPage, setLastPage] = useState<number>();
  const [loadData, setLoadData] = useState(false);

  const FindWorker = {
    page: 2,
    take: 30,
    useRegSearch: false,
  };
  const query = `page=${FindWorker.page}&take=${FindWorker.take}&useRegSearch=${FindWorker.useRegSearch}`;

  useEffect(() => {
    if (loadData === false) {
      dispatch(getWorkersListAction(query)).then((res: any) => {
        setDocs(res.payload.docs);
        setTotalDocs(res.payload.totalDocs);
        setCurrentPage(res.payload.currentPage);
        setLastPage(res.payload.lastPage);
      });
      setLoadData(true);
    }
  }, [docs]);

  const fprops: _pWorkerData = {
    ...props,
    docs,
    setDocs,
    totalDocs,
    setTotalDocs,
    currentPage,
    setCurrentPage,
    lastPage,
    setLastPage,
    setLoadData,
  };

  return (
    <WholeWrapper>
      <MyPageWorkerPresenter {...fprops} />
    </WholeWrapper>
  );
};

export default MyPageWorker;
