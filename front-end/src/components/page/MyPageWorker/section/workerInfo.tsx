import type { NextPage } from "next";
import React, { useState } from "react";
import Modal from "react-modal";
import { _pWorkerDataProps } from "../../../../configure/_pProps.entity";
import { User } from "../../../../models/user.entity";
import { PagenationSection } from "../../../common/sections";
import { IoIosCloseCircle } from "react-icons/io";
import WorkerInfoModal from "./workerInfoModal";
import { useResizeDetector } from "react-resize-detector";
import {
  CloseButton,
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
import dayjs from "dayjs";

const WorkerInfo: NextPage<_pWorkerDataProps> = (props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickDoc, setClickDoc] = useState<User>();

  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  /**
   * Worker Info modal props
   */
  const WorkerModalProps: _pWorkerDataProps = {
    ...props,
    setModalOpen,
    clickDoc,
    style: { height: "500px" },
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <>
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
                      setModalOpen(!modalOpen);
                      setClickDoc(doc);
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
      <Modal
        isOpen={modalOpen}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 1020,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            background: "white",
            width: "45rem",
            height: "575px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "0.3rem",
            boxShadow: "0px 10px 15px rgba(220,220,220,1)",
            inset: 0,
          },
        }}
      >
        <Wrapper fontSize={`28px`} al={`flex-end`}>
          <CloseButton onClick={closeModal}>
            <IoIosCloseCircle />
          </CloseButton>
          <WorkerInfoModal {...WorkerModalProps} />
        </Wrapper>
      </Modal>
    </>
  );
};

export default WorkerInfo;
