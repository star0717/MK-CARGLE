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

const MyPageWorker: NextPage = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");
  // dispatch(getWorkersListAction())
  const closeModal = () => {
    setModalOpen(false);
  };

  const WorkerModalProps = {
    setModalOpen,
    setModalOption,
    style: { height: "500px" },
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <Text>직원관리</Text>
        <TableWrapper>
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
        </TableWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MyPageWorker;
