import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  RsWrapper,
  SmallButton,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import React from "react";

const ManComApprovalModal: NextPage<any> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper>
          <Text>승인관리</Text>
        </Wrapper>
        <Wrapper>
          <SmallButton type="button">회원삭제</SmallButton>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>승인여부</Text>
          <SmallButton type="button">승인</SmallButton>
          <SmallButton type="button">정지</SmallButton>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ManComApprovalModal;
