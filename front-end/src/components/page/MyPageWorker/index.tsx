import type { NextPage } from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWorkersListAction } from "../../../../store/action/user.action";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRowLIST,
  TableRow,
} from "../../styles/CommonComponents";
import { FindResult } from "../../../models/base.entity";
import { Button } from "@material-ui/core";
import { LastPage } from "@material-ui/icons";

const MyPageWorker: NextPage = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");
  const [docs, setDocs] = useState([]);
  const [totalDocs, setTotalDocs] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [lastPage, setLastPage] = useState<number>();

  // const workerData:FindResult = {
  //   docs : [docs],
  //   totalDocs : totalDocs,
  //   currentPage : currentPage,
  //   lastPage : lastPage,
  // };

  const getDate = () => {
    dispatch(getWorkersListAction()).then((res: any) => {
      setDocs(res.payload.docs);
      setTotalDocs(res.payload.totalDocs);
      setCurrentPage(res.payload.currentPage);
      setLastPage(res.payload.lastPage);
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const WorkerModalProps = {
    setModalOpen,
    setModalOption,
    style: { height: "500px" },
  };
  // const Tablerow = () => {
  //   const tablerow = docs.map((_id, name) => <li key={_id}>{name}</li>);
  //   console.log("함수 실행");
  // };

  // const Tablerow = docs.map((_id, name) => <li key={_id}>{name}</li>);

  // function render<any>({ doc:any }){
  //   return (
  //     <TableRow>
  //       <TableRowLIST>{doc.name}</TableRowLIST>
  //       <TableRowLIST>{doc.hpNumber}</TableRowLIST>
  //       <TableRowLIST>{doc.joinDate}</TableRowLIST>
  //       <TableRowLIST>{doc.approval}</TableRowLIST>
  //     </TableRow>
  //   );
  // };

  // const Tablerow = docs.map((docs) => <render docs={docs} key={docs._id} />);

  return (
    <WholeWrapper>
      <Wrapper>
        <Text>직원관리</Text>
        {/* <TableWrapper>
          <TableHead>
            <TableHeadLIST>직원명</TableHeadLIST>
            <TableHeadLIST>전화번호</TableHeadLIST>
            <TableHeadLIST>입사일자</TableHeadLIST>
            <TableHeadLIST>승인여부</TableHeadLIST>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableRowLIST>ㅈㅓㅇ구혁</TableRowLIST>
              <TableRowLIST>01034244028</TableRowLIST>
              <TableRowLIST>21.12.05</TableRowLIST>
              <TableRowLIST>승인</TableRowLIST>
            </TableRow>
          </TableBody>
        </TableWrapper> */}
        {/* // {docs.map(doc => (<render doc = {doc} key={doc._id}/>))} */}
      </Wrapper>
      <Button
        type="button"
        onClick={() => {
          getDate();
          console.log("TotalDocs =>", totalDocs);
          console.log("CurrentPage =>", currentPage);
          console.log("LastPage => ", lastPage);
          console.log("Docs => ", docs[0].name);
        }}
      >
        ㅈㅓㅇ보
      </Button>
    </WholeWrapper>
  );
};

export default MyPageWorker;
