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
import { UseLink } from "../../../../configure/router.entity";
import { _pFindEmail } from "../../../../configure/_pProps.entity";

/**
 * 계정찾기: 이메일 찾기(화면)
 * @param props
 * @returns
 */
const FindEmailPresenter: NextPage<_pFindEmail> = (props) => {
  const router = useRouter();

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper
        width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
      >
        <CommonTitle textAlign={`center`} margin={`0px`}>
          계정찾기
        </CommonTitle>
        <CommonSubTitle>이메일 찾기</CommonSubTitle>
        <form onSubmit={props.onfindEmailHandler}>
          <TextInput2
            value={props.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.setName(e.target.value);
            }}
            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            height={`60px`}
            margin={`0px 0px 10px 0px`}
            placeholder="이름"
          />
          <TextInput2
            value={props.hpNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.setHpNumber(e.target.value);
            }}
            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            height={`60px`}
            margin={`10px 0px 20px`}
            placeholder="휴대전화번호"
          />
          <CommonButtonWrapper>
            <CommonButton
              type="submit"
              kindOf={`white`}
              margin={`0px 0px 20px`}
            >
              다음
            </CommonButton>
            <CommonButton
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                router.push(UseLink.FIND_PASSWORD);
              }}
            >
              비밀번호 찾기
            </CommonButton>
          </CommonButtonWrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindEmailPresenter;
