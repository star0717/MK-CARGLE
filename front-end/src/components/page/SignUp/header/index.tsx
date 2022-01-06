import type { NextPage } from "next";
import React from "react";
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
import { GoCheck } from "react-icons/go";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";
import { UserAuthority } from "../../../../models/user.entity";

/**
 * 회원가입: 공통 헤더 컴포넌트(기능)
 * @param props
 * @returns
 */
const SignUpHeader: NextPage<_pSignUpProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <>
      {props.userAuth === UserAuthority.OWNER &&
      props.stepNumber === 6 ? null : props.userAuth === UserAuthority.WORKER &&
        props.stepNumber === 4 ? null : (
        <WholeWrapper ref={ref} height={`auto`}>
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
            props.userAuth === UserAuthority.OWNER ? (
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

          {props.userAuth === UserAuthority.OWNER &&
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
      )}
    </>
  );
};

export default SignUpHeader;
