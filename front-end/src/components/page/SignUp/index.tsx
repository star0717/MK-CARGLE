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
import { _cSignUpProps } from "../../../configure/_cProps.entity";

// modal setting
Modal.setAppElement("body");

/**
 * 회원가입: Index 컴포넌트(기능)
 * @returns
 */
const SignUp: NextPage<any> = () => {
  // redux store에서 user, company 정보 가져옴
  const { user, company, formInput, formCheck } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  const [userAuth, setUserAuth] = useState<UserAuthority>(UserAuthority.WORKER); // 유저 권한 종류
  const [stepNumber, setStepNumber] = useState<number>(1); // 스텝 숫자

  // component에 전달할 props들 정의
  const SignUpProps: _cSignUpProps = {
    user,
    company,
    formInput,
    formCheck,
    stepNumber,
    setStepNumber,
    userAuth,
    UserAuthority,
    setUserAuth,
  };

  return (
    <WholeWrapper>
      <Header {...SignUpProps} />
      <SignUpPresenter {...SignUpProps} />
    </WholeWrapper>
  );
};

export default SignUp;
