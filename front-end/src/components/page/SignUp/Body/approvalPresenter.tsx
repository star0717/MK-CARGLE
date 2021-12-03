import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";
import React from "react";

const ApprovalPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const onSignOutHandler = props.onSignOutHandler;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <Text>가입 심사가 진행 중입니다.</Text>
        <button type="button" onClick={onSignOutHandler}>
          돌아가기
        </button>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ApprovalPresenter;
