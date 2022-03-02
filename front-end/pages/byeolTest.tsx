import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Modal from "react-modal";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CommonButton,
  Switch,
  SwitchInput,
  SwitchSlider,
  Wrapper,
  Image,
  Text,
  RsWrapper,
  WholeWrapper,
  CloseButton,
} from "../src/components/styles/CommonComponents";
import styled from "styled-components";
import router from "next/router";
import { UseLink } from "../src/configure/router.entity";
import { BsEmojiDizzyFill } from "react-icons/bs";
import { AiFillHome, AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import MolitSettingModal from "src/components/page/MaintenanceBook/section/molitSettingModal";

/**
 * 테스트 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 내용
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  // handler(기능) 관리

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  // 도장 modal props
  const ModalProps = {
    setModalOpen,
    style: { height: "1200px" },
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return (
    <BodyWrapper>
      <WholeWrapper>
        <CommonButton
          onClick={() => {
            setModalOption("molit");
            setModalOpen(!modalOpen);
          }}
        >
          국토부 전송 모달
        </CommonButton>
      </WholeWrapper>
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
            width: "1200px",
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
        </Wrapper>
        {/* {modalOption === "molit" ? (
           <MolitModal {...partsSetProps} />
         ) : modalOption === "payment" ? (
           <PaymentModal {...partsSetProps} />
         ) : (
           <DocumentModal {...partsSetProps} />
         )} */}
        <MolitSettingModal />
      </Modal>
    </BodyWrapper>
  );
};

export default ByeolTest;
