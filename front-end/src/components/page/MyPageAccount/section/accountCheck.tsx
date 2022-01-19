import type { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMyInfoAction,
  _aPostAuthMyinfoConfirmPassword,
} from "../../../../../store/action/user.action";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  TextInput2,
  CommonButton,
  CommonTitle,
  CommonSubTitle,
  CommonTitleWrapper,
  RsWrapper,
  CommonBigTitle,
  CommonBigSubTitle,
} from "../../../styles/CommonComponents";
import { _pMyPageAccountProps } from "../../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 확인 컴포넌트(기능)
 * @param props
 * @returns
 */
const AccountCheck: NextPage<_pMyPageAccountProps> = (props) => {
  const dispatch = useDispatch();

  // state 관리
  const [password, setPassword] = useState<string>(""); // 비밀번호 입력 state

  /**
   * 비밀번호 체크 handler
   * @param e
   */
  const pwCheckHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      alert("비밀번호를 입력하세요.");
    } else {
      const confirmPWD = {
        _id: props.tokenValue.uID,
        PWD: password,
      };
      dispatch(_aPostAuthMyinfoConfirmPassword(confirmPWD)).then(
        (res: any) => {
          if (res.payload === true) {
            dispatch(getMyInfoAction()).then((res: any) => {
              if (res.payload) {
                props.setAccountInfo(res.payload);
                props.setStep(2);
              }
            });
          } else {
            alert("비밀번호가 틀립니다.");
          }
        },
        (err) => {
          if (err.response.status === 401) {
            alert("사업자 승인이 필요합니다.");
          }
        }
      );
    }
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      {/* <CommonTitleWrapper>
        <CommonTitle>회원탈퇴</CommonTitle>
        <CommonSubTitle>
          회원탈퇴를 위해 약관 동의 후 비밀번호를 입력해주세요.
        </CommonSubTitle>
      </CommonTitleWrapper> */}
      <RsWrapper>
        <Wrapper padding={`0px 0px 50px 0px`}>
          <CommonBigTitle>계정관리</CommonBigTitle>
          <CommonBigSubTitle>
            계정관리를 위해 비밀번호를 입력해주세요.
          </CommonBigSubTitle>
        </Wrapper>
        <Wrapper>
          <form onSubmit={pwCheckHandler}>
            <TextInput2
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요."
              width={`500px`}
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

export default AccountCheck;
