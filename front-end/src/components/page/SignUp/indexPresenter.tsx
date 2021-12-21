import { NextPage } from "next";
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
import React from "react";
import { _cSignUpProps } from "../../../configure/_cProps.entity";

/**
 * 회원가입: Index 컴포넌트(화면)
 * @param props
 * @returns
 */
const SignUpPresenter: NextPage<_cSignUpProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper>
          {/* 바디 부분 ( 가운데 전체 영역 ) */}
          <Wrapper>
            {/* 바디 부분 ( 단계별 내용들 ) */}
            <Wrapper>
              {props.stepNumber === 1 && <SelectUser {...props} />}
              {props.stepNumber === 2 && <TermSignUp {...props} />}
              {props.stepNumber === 3 && <SignAccount {...props} />}
              {props.stepNumber === 4 &&
                (props.userAuth === "owner" ? (
                  <SignCompany {...props} />
                ) : (
                  <SignupComplete {...props} />
                ))}
              {props.stepNumber === 5 && <FileUpload {...props} />}
              {props.stepNumber === 6 && <SignupComplete {...props} />}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SignUpPresenter;
