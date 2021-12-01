import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import WithdrawalModal from "./WithdrawalModal";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CheckBox,
  TextInput,
} from "../../../styles/CommonComponents";

Modal.setAppElement("body");

const Withdrawal: NextPage<any> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const setpages = props.setPages;
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  return (
    <WholeWrapper>
      <Wrapper>
        <Text>
          마이페이지{">"}계정관리{">"}회원탈퇴
        </Text>
        <Text>회원탈퇴를 위해 약관동의 후 비밀번호를 입력해주세요.</Text>
        <div>회원탈퇴 약관 영역입니다.</div>
        <Wrapper dr={`row`}>
          <Text>회원탈퇴 약관을 상세히 읽고 숙지하였으며, 동의합니다.</Text>
          <CheckBox></CheckBox>
        </Wrapper>
        <TextInput
          type="password"
          placeholder="비밀번호를 입력하세요"
        ></TextInput>
        <Wrapper dr={`row`}>
          <button onClick={() => setpages(2)}>돌아가기</button>
          <button
            type="button"
            onClick={(e) => {
              setModalOpen(!modalOpen);
            }}
          >
            회원탈퇴
          </button>
        </Wrapper>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
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
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              inset: 0,
            },
          }}
        >
          <WithdrawalModal />
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Withdrawal;
