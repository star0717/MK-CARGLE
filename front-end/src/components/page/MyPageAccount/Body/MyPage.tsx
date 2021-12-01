import type { NextPage } from "next";
import { useState } from "react";
import {
  TextInput,
  WholeWrapper,
  Wrapper,
  Text,
} from "../../../styles/CommonComponents";
import Account from "./AccountM";

const MyPage: NextPage<any> = (props) => {
  const setpages = props.setPages;

  return (
    <WholeWrapper>
      <Wrapper>
        <Text>계정 관리를 위해 비밀번호를 입력해주세요.</Text>

        <TextInput placeholder="비밀번호를 입력하세요." />

        <button type="button" onClick={() => setpages(2)}>
          확인
        </button>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MyPage;
