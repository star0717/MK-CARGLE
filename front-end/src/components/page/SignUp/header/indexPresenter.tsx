import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonTitle,
  CommonSubTitle,
  JoinStepBarWrapper,
  JoinStepBar,
} from "../../../styles/CommonComponents";
import React from "react";
import { GoCheck } from "react-icons/go";

const SignUpHeaderPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const stepNumber = props.stepNumber;
  const userAuth = props.userAuth;
  const UserAuthority = props.UserAuthority;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      {/* <JoinStepBar
          kindOf={`complete`}
        >
          <GoCheck />
        </JoinStepBar>
        <JoinStepBar
          kindOf={`line`}
        ></JoinStepBar>
        <JoinStepBar
          kindOf={`progress`}
        >2</JoinStepBar>
        <JoinStepBar
          kindOf={`line2`}
        ></JoinStepBar>
        <JoinStepBar
          kindOf={`before`}
        >3</JoinStepBar>
        <JoinStepBar
          kindOf={`line2`}
        ></JoinStepBar>
        <JoinStepBar
          kindOf={`before`}
        >4</JoinStepBar> */}
      {/*          
      <Wrapper>
        {userAuth === "owner" &&
          (stepNumber === 3 || stepNumber === 4 || stepNumber === 5) && (
            <Wrapper>
              <Text
                style={{ backgroundColor: stepNumber === 3 ? "red" : null }}
              >
                1
              </Text>
              <Text
                style={{ backgroundColor: stepNumber === 4 ? "red" : null }}
              >
                2
              </Text>
              <Text
                style={{ backgroundColor: stepNumber === 5 ? "red" : null }}
              >
                3
              </Text>
            </Wrapper>
          )}
          */}
      <Wrapper>
        {stepNumber === 1 && (
          <Wrapper>
            <CommonTitle padding={`0px`}>회원가입</CommonTitle>
            <CommonSubTitle>가입 유형을 선택해주세요.</CommonSubTitle>
          </Wrapper>
        )}
        {stepNumber === 2 && (
          <Wrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>
              서비스 이용을 위해 약관 동의가 필요해요.
            </CommonSubTitle>
          </Wrapper>
        )}
        {stepNumber === 3 && (
          <Wrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>계정 정보를 입력해주세요.</CommonSubTitle>
          </Wrapper>
        )}
        {stepNumber === 4 && userAuth === UserAuthority.OWNER ? (
          <Wrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>사업자 정보를 입력해주세요.</CommonSubTitle>
          </Wrapper>
        ) : null}
        {stepNumber === 5 && (
          <Wrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>
              가입 승인을 위해 서류를 제출해주세요.
            </CommonSubTitle>
          </Wrapper>
        )}
      </Wrapper>

      {userAuth === UserAuthority.OWNER &&
        (stepNumber === 2 ||
          stepNumber === 3 ||
          stepNumber === 4 ||
          stepNumber === 5) && (
          <JoinStepBarWrapper>
            <JoinStepBar kindOf={stepNumber === 2 ? `progress` : `complete`}>
              {stepNumber === 2 ? `1` : <GoCheck />}
            </JoinStepBar>
            <JoinStepBar
              kindOf={stepNumber > 2 ? `line` : `line2`}
            ></JoinStepBar>
            <JoinStepBar
              kindOf={
                stepNumber < 3
                  ? `before`
                  : stepNumber === 3
                  ? `progress`
                  : `complete`
              }
            >
              {stepNumber > 3 ? <GoCheck /> : `2`}
            </JoinStepBar>
            <JoinStepBar
              kindOf={stepNumber > 3 ? `line` : `line2`}
            ></JoinStepBar>
            <JoinStepBar
              kindOf={
                stepNumber < 4
                  ? `before`
                  : stepNumber === 4
                  ? `progress`
                  : `complete`
              }
            >
              {stepNumber > 4 ? <GoCheck /> : `3`}
            </JoinStepBar>
            <JoinStepBar
              kindOf={stepNumber > 4 ? `line` : `line2`}
            ></JoinStepBar>
            <JoinStepBar kindOf={stepNumber === 5 ? `progress` : `before`}>
              4
            </JoinStepBar>
          </JoinStepBarWrapper>
        )}
    </WholeWrapper>
  );
};

export default SignUpHeaderPresenter;
