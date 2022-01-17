import type { NextPage } from "next";
import React from "react";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  CommonTitle,
  CommonSubTitle,
  CommonTitleWrapper,
} from "../../../styles/CommonComponents";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 공통 헤더 컴포넌트(기능)
 * @param props
 * @returns
 */
const FindHeader: NextPage = () => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <CommonTitleWrapper>
          <CommonTitle textAlign={`center`} margin={`0px`}>
            계정찾기
          </CommonTitle>
          <CommonSubTitle>
            이메일 찾기를 위하여 계정 정보를 입력해주세요.
          </CommonSubTitle>
        </CommonTitleWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindHeader;
