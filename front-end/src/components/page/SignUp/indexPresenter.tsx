import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import TermSignUp from "./section/term";
import FileUpload from "./section/fileUpload";
import SignupComplete from "./section/complete";
import SelectUser from "./section/selectUser";
import SignAccount from "./section/signAccount";
import SignCompany from "./section/signCompany";
import { WholeWrapper, Wrapper } from "../../styles/CommonComponents";
import React from "react";

/**
 * 회원가입: Index 컴포넌트(화면)
 * @param props
 * @returns
 */
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
            {stepNumber === 3 && <SignAccount {...props} />}
            {stepNumber === 4 &&
              (userAuth === "owner" ? (
                <SignCompany {...props} />
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
