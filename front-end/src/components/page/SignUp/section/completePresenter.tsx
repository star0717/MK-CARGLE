import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";
import React from "react";

const CompletePresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const onSignOutHandler = props.onSignOutHandler;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <Text>
          회원가입이 완료되었습니다.
          <br />
          가입승인 후 정상 이용이 가능합니다.
        </Text>
        <button type="button" onClick={onSignOutHandler}>
          확인
        </button>
      </Wrapper>
    </WholeWrapper>
  );
};

export default CompletePresenter;
