import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper, Wrapper, Text, CommonTitle, CommonSubTitle


} from "../../../styles/CommonComponents";
import React from "react";

const SignUpHeaderPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const stepNumber = props.stepNumber;
  const userAuth = props.userAuth;
  const UserAuthority = props.UserAuthority;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
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
        {stepNumber === 1 &&
          <CommonTitle padding={`0px`}>회원가입
            <CommonSubTitle>가입 유형을 선택해주세요.</CommonSubTitle>
          </CommonTitle>
        }
        {stepNumber === 2 && (
          <CommonTitle>회원가입
            <CommonSubTitle>서비스 이용을 위해 약관 동의가 필요해요.</CommonSubTitle>
          </CommonTitle>
        )}
        {stepNumber === 3 &&
          <CommonTitle>회원가입
            <CommonSubTitle>계정 정보를 입력해주세요.</CommonSubTitle>
          </CommonTitle>
        }
        {stepNumber === 4 && userAuth === UserAuthority.OWNER ? (
          <CommonTitle>회원가입
            <CommonSubTitle>사업자 정보를 입력해주세요.</CommonSubTitle>
          </CommonTitle>
        ) : null}
        {stepNumber === 5 && (
          <CommonTitle>회원가입
            <CommonSubTitle>가입 승인을 위해 서류를 제출해주세요.</CommonSubTitle>
          </CommonTitle>
        )}
      </Wrapper>
    </WholeWrapper>
  );
};

export default SignUpHeaderPresenter;
