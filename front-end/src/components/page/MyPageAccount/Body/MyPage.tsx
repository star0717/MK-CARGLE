import type { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { passwordCheck } from "../../../../../store/action/user.action";
import {
  TextInput,
  WholeWrapper,
  Wrapper,
  Text,
} from "../../../styles/CommonComponents";
import Account from "./AccountM";

const MyPage: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  const setpages = props.setPages;
  const [password, setPassword] = useState("");
  const confirmPWD = {
    _id: props.uID,
    PWD: password,
  };

  const test = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(confirmPWD);
    dispatch(passwordCheck(confirmPWD)).then((res: any) => {
      if (res.payload) {
        setpages(2);
      } else {
        alert("비밀번호가 틀립니다.");
      }
    });
  };

  return (
    <WholeWrapper>
      <Wrapper>
        <form onSubmit={test}>
          <Text>계정 관리를 위해 비밀번호를 입력해주세요.</Text>

          <TextInput
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요."
          />

          <button type="submit">확인</button>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MyPage;
