import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  RsWrapper,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { User } from "../../../../models/user.entity";
import { PagenationSection } from "../../../common/sections";
import dayjs from "dayjs";
import { _pWorkerInfoProps } from "../../../../configure/_pProps.entity";

const WorkerInfoPresenter: NextPage<_pWorkerInfoProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
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
                <TableRow
                  key={doc._id}
                  onClick={() => {
                    props.setModalOpen(!props.modalOpen);
                    props.setClickDoc(doc);
                  }}
                >
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
        <PagenationSection {...props} />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default WorkerInfoPresenter;
