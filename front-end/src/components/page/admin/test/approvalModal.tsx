import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  RsWrapper,
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
        <Wrapper dr={`row`}>
          <Text>승인여부</Text>
        </Wrapper>
        <Wrapper dr={`row`}>
          <Text>반려사유</Text>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ManComApprovalModal;
