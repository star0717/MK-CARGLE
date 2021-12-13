import type { NextPage } from "next";
import React, { useState } from "react";
import Modal from "react-modal";
import { UserAuthority } from "../../../models/user.entity";
import Header from "./header";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { UserState } from "../../../../store/interfaces";
import SignUpPresenter from "./indexPresenter";
import { WholeWrapper } from "../../styles/CommonComponents";

// modal setting
Modal.setAppElement("body");

const SignUp: NextPage<any> = () => {
  // redux store에서 user, company 정보 가져옴
  const { user, company, formInput, formCheck } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  // 이메일 종류ß
  const emailItem = [
    { key: 1, value: "", text: "직접 입력" },
    { key: 2, value: "gmail.com", text: "gmail.com" },
    { key: 3, value: "naver.com", text: "naver.com" },
    { key: 4, value: "daum.net", text: "daum.net" },
  ];


  const [userAuth, setUserAuth] = useState(UserAuthority.WORKER); // 유저 권한 종류
  const [stepNumber, setStepNumber] = useState<number>(4); // 스텝 숫자


  // component에 전달할 props들 정의
  const SignUpProps = {
    user,
    company,
    formInput,
    formCheck,
    stepNumber,
    setStepNumber,
    userAuth,
    UserAuthority,
    setUserAuth,
    emailItem,
  };

  return (
    <WholeWrapper>
      <Header {...SignUpProps} />
      <SignUpPresenter {...SignUpProps} />
    </WholeWrapper>
  );
};

export default SignUp;
