import type { NextPage } from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWorkersListAction } from "../../../../../store/action/user.action";
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
  SmallButton,
} from "../../../styles/CommonComponents";
import { User } from "../../../../models/user.entity";

const workerInfo: NextPage<any> = (props) => {
  // const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");

  // const docs = props.docs;
  // const setDocs = props.setDocs;
  // const totalDocs = props.totalDocs;
  // const setTotalDocs = props.setTotalDocs;
  // const currentPage = props.currentPage;
  // const setCurrentPage = props.setCurrentPage;
  // const lastPage = props.lastPage;
  // const setLastPage = props.setLastPage;

  const [docs, setDocs] = useState<User[]>(props.docs);
  const [totalDocs, setTotalDocs] = useState<number>(props.totalDocs);
  const [currentPage, setCurrentPage] = useState<number>(props.currentPage);
  const [lastPage, setLastPage] = useState<number>(props.lastPage);

  // const getDate = () => {
  //   dispatch(getWorkersListAction()).then((res: any) => {
  //     setDocs(res.payload.docs);
  //     setTotalDocs(res.payload.totalDocs);
  //     setCurrentPage(res.payload.currentPage);
  //     setLastPage(res.payload.lastPage);
  //   });
  // };

  const closeModal = () => {
    setModalOpen(false);
  };

  const WorkerModalProps = {
    setModalOpen,
    setModalOption,
    style: { height: "500px" },
  };

  const toggleComment = () => {
    // setDocs(prevDocs => ({
    //   ...docs,
    //   [docs.approval] :
    // }));
    // setDocs(prevDocs => ({
    //   ...docs,
    //   [approval] : !prevDocs[approval]
    // }));
  };

  return (
    <WholeWrapper>
      <Wrapper width={`1200px`}>
        <Text>직원관리</Text>

        <TableWrapper>
          <TableHead>
            <TableHeadLIST width={`300px`}>직원명</TableHeadLIST>
            <TableHeadLIST width={`300px`}>전화번호</TableHeadLIST>
            <TableHeadLIST width={`300px`}>입사일자</TableHeadLIST>
            <TableHeadLIST width={`300px`}>승인여부</TableHeadLIST>
          </TableHead>
          <TableBody>
            {docs.map((doc) => (
              <TableRow>
                <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.hpNumber}</TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.joinDate}</TableRowLIST>
                <TableRowLIST width={`300px`}>{doc.approval}</TableRowLIST>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
      </Wrapper>
      <Wrapper>
        <SmallButton
          type="button"
          onClick={() => {
            console.log("TotalDocs =>", totalDocs);
            console.log("CurrentPage =>", currentPage);
            console.log("LastPage => ", lastPage);
            console.log("Docs => ", docs);
          }}
        >
          ㅈㅓㅇ보
        </SmallButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default workerInfo;
