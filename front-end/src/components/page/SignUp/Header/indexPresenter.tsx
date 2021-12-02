import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";
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
      <Wrapper>
        {userAuth === "owner" && stepNumber === (3 || 4 || 5) && (
          <Wrapper>
            <Text style={{ backgroundColor: stepNumber === 3 ? "red" : null }}>
              1
            </Text>
            <Text style={{ backgroundColor: stepNumber === 4 ? "red" : null }}>
              2
            </Text>
            <Text style={{ backgroundColor: stepNumber === 5 ? "red" : null }}>
              3
            </Text>
          </Wrapper>
        )}
        <Wrapper>
          {stepNumber === 1 && <Text>가입 유형을 선택해주세요.</Text>}
          {stepNumber === 2 && (
            <Text>서비스 이용을 위해 약관 동의가 필요해요.</Text>
          )}
          {stepNumber === 3 && <Text>계정 정보를 입력해주세요.</Text>}
          {stepNumber === 4 && userAuth === UserAuthority.OWNER ? (
            <Text>사업자 정보를 입력해주세요.</Text>
          ) : null}
          {stepNumber === 5 && (
            <Text>가입 승인을 위해 서류를 제출해주세요.</Text>
          )}
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default SignUpHeaderPresenter;
