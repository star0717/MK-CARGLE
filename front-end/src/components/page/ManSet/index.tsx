import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { _MainProps } from "src/configure/_props.entity";
import { useDispatch } from "react-redux";
import {
  _aDeletePartssetsOne,
  _aGetPartssetsOne,
  _aPostPartssetsOne,
} from "store/action/user.action";
import { _iDeleteByUser, _iPartssetsOne } from "store/interfaces";
import PartsSetList from "./section/partsSetList";
import Modal from "react-modal";
import { CloseButton, Wrapper } from "src/components/styles/CommonComponents";
import { IoIosCloseCircle } from "react-icons/io";
import { PartsSet } from "src/models/partsset.entity";
import PartsSetModal from "./section/partsSetModal";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { dataSort } from "src/modules/commonModule";

const ManPartsPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [partSetClass, setPartSetClass] = useState<Partial<PartsSet>[]>(
    dataSort(props.data.setList.docs, "date", 1, "createdAt")
  ); // 전체 세트 항목
  const [partSetData, setPartSetData] = useState<Partial<PartsSet>>(
    partSetClass[0]
  ); // 선택한 세트 데이터

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  // 재정렬
  useEffect(() => {
    setPartSetClass(dataSort(partSetClass, "date", 1, "createdAt"));
  }, [partSetClass, partSetData]);

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const partsSetProps: _pPartsSetProps = {
    ...props,
    setModalOpen,
    partSetData,
    setPartSetData,
    partSetClass,
    setPartSetClass,
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <BodyWrapper>
      <PartsSetList {...partsSetProps} />
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
        <PartsSetModal {...partsSetProps} />
      </Modal>
    </BodyWrapper>
  );
};

export default ManPartsPage;
