import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  CommonButtonWrapper,
  RsWrapper,
} from "../../../styles/CommonComponents";
import { BsFillCheckCircleFill } from "react-icons/bs";
import React from "react";
import { _pCompleteProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 완료 컴포넌트(화면)
 * @param props
 * @returns
 */
const CompletePresenter: NextPage<_pCompleteProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper>
          <Text color={`#0066ff`} fontSize={`60px`}>
            <BsFillCheckCircleFill />
          </Text>
          <Text padding={`0px 0px 50px`} fontSize={`22px`}>
            회원가입이 완료되었습니다.
            <br />
            가입승인 후 정상 이용이 가능합니다.
          </Text>
          <CommonButtonWrapper>
            <CommonButton type="button" onClick={props.onSignOutHandler}>
              확인
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default CompletePresenter;
