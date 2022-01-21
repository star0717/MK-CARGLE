import React, { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import {
  WholeWrapper,
  Wrapper,
} from "../src/components/styles/CommonComponents";

/**
 * 테스트 페이지
 * @returns
 */
const HeoTest: NextPage = () => {
  return (
    <WholeWrapper>
      <Wrapper dr={`row`} ju={`center`}></Wrapper>
    </WholeWrapper>
  );
};

export default HeoTest;
