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

const FindEmailPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const name = props.name;
  const setName = props.setName;
  const hpNumber = props.hpNumber;
  const setHpNumber = props.setHpNumber;
  const onfindEmailHandler = props.onfindEmailHandler;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <form onSubmit={onfindEmailHandler}>
        <Text>이름</Text>
        <TextInput
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <Text>휴대전화번호</Text>
        <TextInput
          value={hpNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHpNumber(e.target.value);
          }}
        />
        <CommonButton type="submit">다음</CommonButton>
      </form>
    </WholeWrapper>
  );
};

export default FindEmailPresenter;
