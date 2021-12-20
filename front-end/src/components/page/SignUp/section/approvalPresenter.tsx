import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  SmallButton,
} from "../../../styles/CommonComponents";
import React from "react";
import { _pApprovalProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 업체 승인 대기 컴포넌트(화면)
 * @param props
 * @returns
 */
const ApprovalPresenter: NextPage<_pApprovalProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <Text>가입 심사가 진행 중입니다.</Text>
        <SmallButton
          type="button"
          kindOf={`default`}
          onClick={props.onSignOutHandler}
        >
          돌아가기
        </SmallButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ApprovalPresenter;
