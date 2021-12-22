import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  CommonTitle,
  CommonSubTitle,
  CommonTitleWrapper,
  JoinStepBarWrapper,
  JoinStepBar,
} from "../../../styles/CommonComponents";
import React from "react";
import { GoCheck } from "react-icons/go";
import { _cSignUpProps } from "../../../../configure/_cProps.entity";

/**
 * 회원가입: 공통 헤더 컴포넌트(화면)
 * @param props
 * @returns
 */
const SignUpHeaderPresenter: NextPage<_cSignUpProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        {props.stepNumber === 1 && (
          <CommonTitleWrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>가입 유형을 선택해주세요.</CommonSubTitle>
          </CommonTitleWrapper>
        )}
        {props.stepNumber === 2 && (
          <CommonTitleWrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>
              서비스 이용을 위해 약관 동의가 필요해요.
            </CommonSubTitle>
          </CommonTitleWrapper>
        )}
        {props.stepNumber === 3 && (
          <CommonTitleWrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>계정 정보를 입력해주세요.</CommonSubTitle>
          </CommonTitleWrapper>
        )}
        {props.stepNumber === 4 &&
        props.userAuth === props.UserAuthority.OWNER ? (
          <CommonTitleWrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>사업자 정보를 입력해주세요.</CommonSubTitle>
          </CommonTitleWrapper>
        ) : null}
        {props.stepNumber === 5 && (
          <CommonTitleWrapper>
            <CommonTitle>회원가입</CommonTitle>
            <CommonSubTitle>
              가입 승인을 위해 서류를 제출해주세요
            </CommonSubTitle>
          </CommonTitleWrapper>
        )}
      </Wrapper>

      {props.userAuth === props.UserAuthority.OWNER &&
        (props.stepNumber === 2 ||
          props.stepNumber === 3 ||
          props.stepNumber === 4 ||
          props.stepNumber === 5) && (
          <JoinStepBarWrapper>
            <JoinStepBar
              kindOf={props.stepNumber === 2 ? `progress` : `complete`}
            >
              {props.stepNumber === 2 ? `1` : <GoCheck />}
            </JoinStepBar>
            <JoinStepBar
              kindOf={props.stepNumber > 2 ? `line` : `line2`}
            ></JoinStepBar>
            <JoinStepBar
              kindOf={
                props.stepNumber < 3
                  ? `before`
                  : props.stepNumber === 3
                  ? `progress`
                  : `complete`
              }
            >
              {props.stepNumber > 3 ? <GoCheck /> : `2`}
            </JoinStepBar>
            <JoinStepBar
              kindOf={props.stepNumber > 3 ? `line` : `line2`}
            ></JoinStepBar>
            <JoinStepBar
              kindOf={
                props.stepNumber < 4
                  ? `before`
                  : props.stepNumber === 4
                  ? `progress`
                  : `complete`
              }
            >
              {props.stepNumber > 4 ? <GoCheck /> : `3`}
            </JoinStepBar>
            <JoinStepBar
              kindOf={props.stepNumber > 4 ? `line` : `line2`}
            ></JoinStepBar>
            <JoinStepBar
              kindOf={props.stepNumber === 5 ? `progress` : `before`}
            >
              4
            </JoinStepBar>
          </JoinStepBarWrapper>
        )}
    </WholeWrapper>
  );
};

export default SignUpHeaderPresenter;
