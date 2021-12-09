import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton
} from "../../../styles/CommonComponents";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import React from "react";

const CompletePresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const onSignOutHandler = props.onSignOutHandler;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <Text color={`#0066ff`} fontSize={`60px`}>
          <BsFillCheckCircleFill />
        </Text>
        <Text padding={`0px 0px 50px`} fontSize={`24px`}>
          회원가입이 완료되었습니다.
          <br />
          가입승인 후 정상 이용이 가능합니다.
        </Text>
        <CommonButton type="button" onClick={onSignOutHandler}>
          확인
        </CommonButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default CompletePresenter;
