import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { _MainProps } from "../../../configure/_props.entity";
import {
  RsWrapper,
  SmallButton,
  Text,
  TextInput2,
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
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Test;
