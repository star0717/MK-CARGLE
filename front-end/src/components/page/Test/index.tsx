// import { Button, ThemeProvider } from "@material-ui/core";
import { Button } from "@material-ui/core";
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
        {/* <ThemeProvider theme={theme}> */}
        <Button variant="contained" color="primary">
          Outlined
        </Button>
        <Button variant="outlined" color="primary">
          Outlined
        </Button>
        {/* </ThemeProvider> */}
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Test;
