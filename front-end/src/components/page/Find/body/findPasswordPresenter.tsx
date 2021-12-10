import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  TextInput,
} from "../../../styles/CommonComponents";
import React from "react";

const FindPasswordPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const email = props.email;
  const setEmail = props.setEmail;
  const name = props.name;
  const setName = props.setName;
  const hpNumber = props.hpNumber;
  const setHpNumber = props.setHpNumber;
  const onFindPwHandler = props.onFindPwHandler;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <form onSubmit={onFindPwHandler}>
        <Text>이름 입력</Text>
        <TextInput
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />

        <Text>핸드폰 번호 입력</Text>
        <TextInput
          type="text"
          value={hpNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHpNumber(e.target.value);
          }}
        />

        <Text>이메일 입력</Text>
        <TextInput
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />

        <Wrapper>
          <CommonButton type="submit">다 음</CommonButton>
        </Wrapper>
      </form>
    </WholeWrapper>
  );
};

export default FindPasswordPresenter;
