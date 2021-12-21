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
  RsWrapper,
} from "../../../styles/CommonComponents";
import { _pAccountCheckProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 확인 컴포넌트(화면)
 * @param props
 * @returns
 */
const AccountCheckPresenter: NextPage<_pAccountCheckProps> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper
          width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
        >
          <form onSubmit={props.pwCheckHandler}>
            <CommonTitle textAlign={`center`} margin={`0px`}>
              계정관리
            </CommonTitle>
            <CommonSubTitle>비밀번호를 입력해주세요.</CommonSubTitle>

            <TextInput2
              type="password"
              value={props.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요."
              width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
              height={`60px`}
              margin={`0px 0px 10px 0px`}
            />

            <CommonButton type="submit">확인</CommonButton>
          </form>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AccountCheckPresenter;
