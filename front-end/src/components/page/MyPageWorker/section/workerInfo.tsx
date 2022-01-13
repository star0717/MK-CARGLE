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
  Text,
  WholeWrapper,
  Wrapper,
  CommonTitle,
  CommonTitleWrapper,
  CommonSubTitle,
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
      <CommonTitleWrapper>
        <CommonTitle>직원관리</CommonTitle>
        <CommonSubTitle>
          이곳에서 직원 정보를 확인 및 수정할 수 있습니다.
        </CommonSubTitle>
      </CommonTitleWrapper>
      <RsWrapper ju={`flex-start`}>
        <Wrapper ju={`flex-start`} height={`auto`}>
          <Wrapper>
            <table>
              <thead>
                <tr>
                  <th>직원명</th>
                  <th>전화번호</th>
                  <th>입사일자</th>
                  <th>승인여부</th>
                </tr>
              </thead>
              <tbody>
                {props.findResult.docs.map((doc: User) => (
                  <tr
                    key={doc._id}
                    onClick={() => {
                      setModalOpen(!modalOpen);
                      setClickDoc(doc);
                    }}
                  >
                    <td width={`300px`}>{doc.name}</td>
                    <td width={`300px`}>{doc.hpNumber}</td>
                    <td width={`300px`}>
                      {dayjs(doc.joinDate).format("YYYY-MM-DD")}
                    </td>
                    {doc.approval ? (
                      <td width={`300px`}>승인</td>
                    ) : (
                      <td width={`300px`}>미승인</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Wrapper>
        </Wrapper>
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
