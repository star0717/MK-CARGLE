import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import TermSignUp from "./Body/term";
import FileUpload from "./Body/fileUpload";
import SignupComplete from "./Body/complete";
import SelectUser from "./Body/selectUser";
import InputAccount from "./Body/account";
import InputCompany from "./Body/company";
import { WholeWrapper, Wrapper } from "../../styles/CommonComponents";
import React from "react";

const SignUpPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const stepNumber = props.stepNumber;
  const userAuth = props.userAuth;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        {/* 바디 부분 ( 가운데 전체 영역 ) */}
        <Wrapper>
          {/* 바디 부분 ( 단계별 내용들 ) */}
          <Wrapper>
            {stepNumber === 1 && <SelectUser {...props} />}
            {stepNumber === 2 && <TermSignUp {...props} />}
            {stepNumber === 3 && <InputAccount {...props} />}
            {stepNumber === 4 &&
              (userAuth === "owner" ? (
                <InputCompany {...props} />
              ) : (
                <SignupComplete />
              ))}
            {stepNumber === 5 && <FileUpload {...props} />}
            {stepNumber === 6 && <SignupComplete {...props} />}
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default SignUpPresenter;
