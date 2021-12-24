import type { NextPage } from "next";
import React, { useState } from "react";
import Modal from "react-modal";
import { UserAuthority } from "../../../models/user.entity";
import Header from "./header";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { UserState } from "../../../../store/interfaces";
import { useResizeDetector } from "react-resize-detector";
import TermSignUp from "./section/term";
import FileUpload from "./section/fileUpload";
import SignupComplete from "./section/complete";
import SelectUser from "./section/selectUser";
import SignAccount from "./section/signAccount";
import SignCompany from "./section/signCompany";
import {
  WholeWrapper,
  Wrapper,
  RsWrapper,
} from "../../styles/CommonComponents";
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

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper>
      <RsWrapper>
        <Header {...SignUpProps} />
        <Wrapper>
          {/* 바디 부분 ( 가운데 전체 영역 ) */}
          <Wrapper>
            {/* 바디 부분 ( 단계별 내용들 ) */}
            <Wrapper>
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
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SignUp;
