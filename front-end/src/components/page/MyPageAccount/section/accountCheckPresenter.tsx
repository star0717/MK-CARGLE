import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React from "react";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  SmallButton,
} from "../../../styles/CommonComponents";

/**
 * 마이 페이지: 계정관리 확인 컴포넌트(화면)
 * @param props
 * @returns
 */
const AccountCheckPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const pwCheckHandler = props.pwCheckHandler;
  const password = props.password;
  const setPassword = props.setPassword;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <form onSubmit={pwCheckHandler}>
          <Text>계정 관리를 위해 비밀번호를 입력해주세요.</Text>

          <TextInput
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요."
          />

          <SmallButton type="submit" kindOf={`default`}>
            확인
          </SmallButton>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountCheckPresenter;
