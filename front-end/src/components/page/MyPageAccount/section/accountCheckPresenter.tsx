import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React from "react";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
  CommonButton,
  CommonTitle,
  CommonSubTitle,
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
      <Wrapper
        width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
      >
        <form onSubmit={pwCheckHandler}>
          <CommonTitle textAlign={`center`} margin={`0px`}>
            계정관리
          </CommonTitle>
          <CommonSubTitle>비밀번호를 입력해주세요.</CommonSubTitle>

          <TextInput2
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요."
            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            height={`60px`}
            margin={`0px 0px 10px 0px`}
          />

          <CommonButton type="submit">확인</CommonButton>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountCheckPresenter;
