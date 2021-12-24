import type { NextPage } from "next";
import React, { useState } from "react";
import Modal from "react-modal";
import { Wrapper, CloseButton } from "../../../styles/CommonComponents";
import {
  _pWorkerData,
  _pWorkerInfoProps,
} from "../../../../configure/_pProps.entity";
import { User } from "../../../../models/user.entity";
import { _cWorkerInfoModalProps } from "../../../../configure/_cProps.entity";
import { PagenationSection } from "../../../common/sections";
import { IoIosCloseCircle } from "react-icons/io";
import WorkerInfoModal from "./workerInfoModal";
import WorkerInfoPresenter from "./workerInfoPresenter";

const workerInfo: NextPage<_pWorkerData> = (props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickDoc, setClickDoc] = useState<User>();

  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  /**
   * Worker Info modal props
   */
  const WorkerModalProps: _cWorkerInfoModalProps = {
    ...props,
    setModalOpen,
    clickDoc,
    style: { height: "500px" },
  };

  /**
   * 화면구성에 넘길 props
   */
  const fProps: _pWorkerInfoProps = {
    ...props,
    modalOpen,
    setModalOpen,
    setClickDoc,
  };

  return (
    <>
      <WorkerInfoPresenter {...fProps} />
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

export default workerInfo;
