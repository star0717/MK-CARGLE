import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import {
  CloseButton,
  RsWrapper,
  SmallButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import Modal from "react-modal";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const AdminReviewCompaniesModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  console.log("props=>", props);

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
   const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달 창 여부
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  // 모달 창 닫기
  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return <WholeWrapper ref={ref}>
          <RsWrapper>
            <Wrapper>
              <Text>승인처리</Text>
            </Wrapper>
            <Wrapper>
              <Wrapper dr={`row`}>
                <Text>승인여부</Text>
                <SmallButton
                type="button"
                kindOf={`default`}
                margin={`0px 0px 0px 20px`}
                onClick={() => {}}
              >
                승인
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  onClick={() => {}}
                >
                  반려
                </SmallButton>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Text width={`130px`}>반려사유</Text>
                <TextInput2 placeholder="반려 사유를 입력하세요." type="text" />
              </Wrapper>
              <Wrapper dr={`row`}>
                <Text width={`130px`}>E-Mail</Text>
                <TextInput2 value='{comData.ownerName}' type="text" readOnly />
              </Wrapper>
              <Wrapper dr={`row`}>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  onClick={() => {}}
                >
                  저장
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  onClick={() => {closeModal}}
                >
                  취소
                </SmallButton>
              </Wrapper>
            </Wrapper>
            </RsWrapper>
          <Wrapper>
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
              </Wrapper>
            </Modal>
            </Wrapper>
          </WholeWrapper>;
};

export default AdminReviewCompaniesModal;
