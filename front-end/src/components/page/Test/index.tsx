import { NextPage } from "next";
import React from "react";
import { _MainProps } from "../../../configure/_props.entity";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
} from "../../styles/CommonComponents";

const Test: NextPage<_MainProps> = (props) => {
  console.log(props.data);
  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper>테스트</Wrapper>
        <Wrapper>{JSON.stringify(props.data)}</Wrapper>
        {/* <ThemeProvider theme={theme}> */}
        {/* </ThemeProvider> */}
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Test;
