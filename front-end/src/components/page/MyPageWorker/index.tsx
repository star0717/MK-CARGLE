import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../models/user.entity";
import { getWorkersListAction } from "../../../../store/action/user.action";
import { WholeWrapper } from "../../styles/CommonComponents";
import MyPageWorkerPresenter from "./indexPresenter";
import { _pTermProps, _pWorkerData } from "../../../configure/_pProps.entity";
import { _MainProps } from "../../../configure/_props.entity";
import { FindParameters } from "../../../models/base.entity";

const MyPageWorker: NextPage<_MainProps> = (props) => {
  const dispatch = useDispatch();

  //직원 명단 API Result 관련
  const [docs, setDocs] = useState<User[]>([]);
  const [totalDocs, setTotalDocs] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [lastPage, setLastPage] = useState<number>();

  //컴포넌트 전환시 1번만 실행
  const [loadData, setLoadData] = useState<boolean>(false);

  //직원 관리 page 설정 관련
  const [pageData, setPageData] = useState<FindParameters>({
    page: 1,
    take: 30,
    useRegSearch: false,
  });

  useEffect(() => {
    if (loadData === false) {
      dispatch(getWorkersListAction(pageData)).then((res: any) => {
        setDocs(res.payload.docs);
        setTotalDocs(res.payload.totalDocs);
        setCurrentPage(res.payload.currentPage);
        setLastPage(res.payload.lastPage);
      });
      setLoadData(true);
    }
    console.log("ok!");
    console.log(pageData);
  }, [loadData]);

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
    pageData,
    setPageData,
    setLoadData,
  };

  return (
    <WholeWrapper>
      <MyPageWorkerPresenter {...fprops} />
    </WholeWrapper>
  );
};

export default MyPageWorker;
