import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  TextInput2,
  CommonTitle,
  CommonSubTitle,
  CommonButtonWrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { useRouter } from "next/dist/client/router";


const FindPasswordPresenter: NextPage<any> = (props) => {
  const router = useRouter();
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
      <Wrapper width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}>
        <CommonTitle textAlign={`center`} margin={`0px`}>
          계정찾기
          <CommonSubTitle>
            패스워드 찾기
          </CommonSubTitle>
        </CommonTitle>
        <form onSubmit={onFindPwHandler}>
          <TextInput2
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            height={`60px`}
            margin={`0px 0px 10px 0px`}
            placeholder="이름"
          />
          <TextInput2
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            height={`60px`}
            margin={`10px 0px 10px 0px`}
            placeholder="이메일"
          />
          <TextInput2
            type="text"
            value={hpNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setHpNumber(e.target.value);
            }}
            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            height={`60px`}
            margin={`10px 0px 20px`}
            placeholder="휴대전화번호"
          />
          <Wrapper>
            <CommonButtonWrapper>
              <CommonButton type="submit"
                kindOf={`white`}
                margin={`0px 0px 20px`}
              >
                다음
              </CommonButton>
              <CommonButton type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  router.push('/sign/findemail')
                }}>
                이메일 찾기
              </CommonButton>
            </CommonButtonWrapper>
          </Wrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindPasswordPresenter;
