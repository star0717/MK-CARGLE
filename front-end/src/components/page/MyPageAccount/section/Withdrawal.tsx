import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import WithdrawalModal from "./WithdrawalModal";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
} from "../../../styles/CommonComponents";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordCheck } from "../../../../../store/action/user.action";

Modal.setAppElement("body");

const Withdrawal: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const accountInfo = props.accountInfo;
  const setAccountInfo = props.setAccountInfo;
  const setpages = props.setPages;
  const [password, setPassword] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmPWD = {
    _id: accountInfo.user._uID,
    PWD: password,
  };

  const WithdrawalModalProps = {
    accountInfo,
    setModalOpen,
    style: { height: "500px" },
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  const pass: SubmitHandler<any> = (data) => {
    dispatch(passwordCheck(confirmPWD)).then((res: any) => {
      if (res.payload === true) {
        setModalOpen(!modalOpen);
      } else {
        alert("비밀번호가 틀립니다.");
      }
    });
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <form onSubmit={handleSubmit(pass)}>
          <Text>
            마이페이지{">"}계정관리{">"}회원탈퇴
          </Text>
          <Text>회원탈퇴를 위해 약관동의 후 비밀번호를 입력해주세요.</Text>
          <div>회원탈퇴 약관 영역입니다.</div>
          <Wrapper dr={`row`}>
            <Text>회원탈퇴 약관을 상세히 읽고 숙지하였으며, 동의합니다.</Text>
            {/* <CheckBox></CheckBox> */}
          </Wrapper>
          <TextInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Wrapper dr={`row`}>
            <button onClick={() => setpages(2)}>돌아가기</button>
            <button type="submit">회원탈퇴</button>
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
            <WithdrawalModal {...WithdrawalModalProps} />
          </Modal>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Withdrawal;
