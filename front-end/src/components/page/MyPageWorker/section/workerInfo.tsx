import type { NextPage } from "next";
import dayjs from "dayjs";
import { useState } from "react";
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
  RsWrapper,
} from "../../../styles/CommonComponents";
import { _pWorkerData } from "../../../../configure/_pProps.entity";
import { User } from "../../../../models/user.entity";
import { _cWorkerInfoModalProps } from "../../../../configure/_cProps.entity";
import { PagenationSection } from "../../../common/sections";

const workerInfo: NextPage<_pWorkerData> = (props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");

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
      <RsWrapper>
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
              {props.findResult.docs.map((doc: User) => (
                <TableRow key={doc._id}>
                  <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.hpNumber}</TableRowLIST>
                  <TableRowLIST width={`300px`}>
                    {dayjs(doc.joinDate).format("YYYY-MM-DD")}
                  </TableRowLIST>
                  {doc.approval ? (
                    <TableRowLIST width={`300px`}>승인</TableRowLIST>
                  ) : (
                    <TableRowLIST width={`300px`}>미승인</TableRowLIST>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        </Wrapper>
        <Wrapper>
          <SmallButton
            type="button"
            onClick={() => {
              console.log("TotalDocs =>", props.findResult.totalDocs);
              console.log("CurrentPage =>", props.findResult.currentPage);
              console.log("LastPage => ", props.findResult.lastPage);
              console.log("Docs => ", props.findResult.docs);
            }}
          >
            정보
          </SmallButton>
        </Wrapper>
        <PagenationSection {...props} />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default workerInfo;
