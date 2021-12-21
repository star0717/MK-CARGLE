import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import WithdrawalModal from "./withdrawalModal";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
} from "../../../styles/CommonComponents";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { pwCheckAction } from "../../../../../store/action/user.action";
import WithdrawalPresenter from "./withdrawalPresenter";
import {
  _cMyPageAccount,
  _cWithdrawalModalProps,
} from "../../../../configure/_cProps.entity";
import { _fWithdrawal } from "../../../../configure/_fProps.entity";
import { _pWithdrawalProps } from "../../../../configure/_pProps.entity";

Modal.setAppElement("body");

/**
 * 마이 페이지: 계정관리 회원탈퇴 컴포넌트(기능)
 * @param props
 * @returns
 */
const Withdrawal: NextPage<_cMyPageAccount> = (props) => {
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // 필요한 props 재정의
  const accountInfo = props.accountInfo;

  // state 관리
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달 창 여부
  const [password, setPassword] = useState<string>(""); // 비밀번호 input
  const [termCheck, setTermCheck] = useState<boolean>(false); // 약관 동의 여부

  /**
   * 모달 창 닫기
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * 비밀번호 체크 및 회원탈퇴 모달 open handler
   * @param data
   */
  const pwCheckHandler: SubmitHandler<_fWithdrawal> = (data) => {
    const confirmPWD = {
      _id: accountInfo.user._uID,
      PWD: password,
    };
    dispatch(pwCheckAction(confirmPWD)).then((res: any) => {
      if (res.payload === true) {
        setModalOpen(!modalOpen);
      } else {
        alert("비밀번호가 틀립니다.");
      }
    });
  };

  // 회원탈퇴 모달 props
  const WithdrawalModalProps: _cWithdrawalModalProps = {
    password,
    accountInfo,
    setModalOpen,
    style: { height: "500px" },
  };

  // 화면구성에 넘길 props
  const fProps: _pWithdrawalProps = {
    ...props,
    handleSubmit,
    register,
    errors,
    setPassword,
    pwCheckHandler,
    termCheck,
    setTermCheck,
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <WithdrawalPresenter {...fProps} />
      </Wrapper>
      <Wrapper>
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
      </Wrapper>
    </WholeWrapper>
  );
};

export default Withdrawal;
