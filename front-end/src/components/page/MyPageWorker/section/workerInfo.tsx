import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
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
  WholeWrapper,
  Wrapper,
  CommonTitle,
  CommonTitleWrapper,
  CommonSubTitle,
  TableWrapper,
  TableHead,
  TableBody,
  TableRow,
  TableRowLIST,
  TableHeadLIST,
} from "../../../styles/CommonComponents";
import dayjs from "dayjs";

const WorkerInfo: NextPage<_pWorkerDataProps> = (props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickDoc, setClickDoc] = useState<User>();

  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

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
    <WholeWrapper ref={ref} padding={`0px`}>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>직원관리</CommonTitle>
          <CommonSubTitle>
            이곳에서 직원 정보를 확인 및 수정할 수 있습니다.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <TableWrapper margin={`50px 0px 0px`} kindOf={`list`}>
          <TableHead>
            <TableHeadLIST width={`25%`}>직원명</TableHeadLIST>
            <TableHeadLIST width={`25%`}>전화번호</TableHeadLIST>
            <TableHeadLIST width={`25%`}>입사일자</TableHeadLIST>
            <TableHeadLIST width={`25%`}>승인여부</TableHeadLIST>
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
                <TableRowLIST width={`25%`}>{doc.name}</TableRowLIST>
                <TableRowLIST width={`25%`}>{doc.hpNumber}</TableRowLIST>
                {doc.joinDate ? (
                  <TableRowLIST width={`25%`}>
                    {dayjs(doc.joinDate).format("YYYY-MM-DD")}
                  </TableRowLIST>
                ) : (
                  <TableRowLIST width={`25%`}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
                  </TableRowLIST>
                )}

                {doc.approval ? (
                  <TableRowLIST width={`25%`}>승인</TableRowLIST>
                ) : (
                  <TableRowLIST width={`25%`}>미승인</TableRowLIST>
                )}
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
        <PagenationSection {...props} />
      </RsWrapper>
      <Modal
        isOpen={modalOpen}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(71, 71, 71, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            background: "white",
            width: "500px",
            height: "800px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "0.3rem",
            boxShadow: "0px 10px 15px rgba(61,61,61,1)",
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
    </WholeWrapper>
  );
};

export default WorkerInfo;
