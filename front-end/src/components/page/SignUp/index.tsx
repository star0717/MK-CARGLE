import type { NextPage } from "next";
import React, { useState } from "react";
import Modal from "react-modal";
import { UserAuthority } from "../../../models/user.entity";
import Header from "./header";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { UserState } from "../../../../store/interfaces";
import TermSignUp from "./section/term";
import FileUpload from "./section/fileUpload";
import SignupComplete from "./section/complete";
import SelectUser from "./section/selectUser";
import SignAccount from "./section/signAccount";
import SignCompany from "./section/signCompany";
import { _pSignUpProps } from "../../../configure/_pProps.entity";

// modal setting
Modal.setAppElement("body");

/**
 * 회원가입: Index 컴포넌트(기능)
 * @returns
 */
const SignUp: NextPage = () => {
  // redux store에서 user, company 정보 가져옴
  const { user, company, formInput, formCheck } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  const [userAuth, setUserAuth] = useState<UserAuthority>(UserAuthority.WORKER); // 유저 권한 종류
  const [stepNumber, setStepNumber] = useState<number>(1); // 스텝 숫자

  // component에 전달할 props들 정의
  const SignUpProps: _pSignUpProps = {
    user,
    company,
    formInput,
    formCheck,
    stepNumber,
    setStepNumber,
    userAuth,
    setUserAuth,
  };

  return (
    <>
      <Header {...SignUpProps} />
      {stepNumber === 1 && <SelectUser {...SignUpProps} />}
      {stepNumber === 2 && <TermSignUp {...SignUpProps} />}
      {stepNumber === 3 && <SignAccount {...SignUpProps} />}
      {stepNumber === 4 &&
        (userAuth === "owner" ? (
          <SignCompany {...SignUpProps} />
        ) : (
          <SignupComplete {...SignUpProps} />
        ))}
      {stepNumber === 5 && <FileUpload {...SignUpProps} />}
      {stepNumber === 6 && <SignupComplete {...SignUpProps} />}
    </>
  );
};

export default SignUp;
