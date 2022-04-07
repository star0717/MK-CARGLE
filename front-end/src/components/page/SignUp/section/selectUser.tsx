import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  CommonButton,
  Text,
  JoinFirstStepSelect,
  JoinFirstStepSelectText,
  RsWrapper,
  CommonButtonWrapper,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
} from "../../../styles/CommonComponents";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { UseLink } from "../../../../configure/router.entity";
import { IoIosArrowForward } from "react-icons/io";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";
import { UserAuthority } from "../../../../constants/model.const";
import Image from "next/image";

/**
 * 회원가입: 가입유형 선택 컴포넌트(기능)
 * @param props
 * @returns
 */
const SelectUser: NextPage<_pSignUpProps> = (props) => {
  const dispatch = useDispatch();

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>회원가입</CommonTitle>
          <CommonSubTitle>가입 유형을 선택해주세요.</CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`}>
          {/* 사업자 회원가입 버튼 */}
          <Wrapper padding={`20px`} width={`auto`} ju={`center`} al={`center`}>
            <JoinFirstStepSelect
              onClick={() => {
                props.setStepNumber(props.stepNumber + 1);
                props.setUserAuth(UserAuthority.OWNER);
                dispatch({
                  type: actionTypesUser.USER_SELECT,
                  payload: UserAuthority.OWNER,
                });
                window.scrollTo(0, 0);
              }}
            >
              <Wrapper width={`120px`} height={`120px`} padding={`20px`}>
                <Image
                  src="/images/JoinSelectIcon01.png"
                  alt="JoinSelectIcon"
                  width={120}
                  height={120}
                />
              </Wrapper>
              <JoinFirstStepSelectText>
                카센터를 운영하고 계신가요?
              </JoinFirstStepSelectText>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사업자
              </Text>
            </JoinFirstStepSelect>
          </Wrapper>

          {/* 직원 회원가입 버튼 */}
          <Wrapper padding={`20px`} width={`auto`}>
            <JoinFirstStepSelect
              onClick={() => {
                props.setStepNumber(props.stepNumber + 1);
                props.setUserAuth(UserAuthority.WORKER);
                dispatch({
                  type: actionTypesUser.USER_SELECT,
                  payload: UserAuthority.WORKER,
                });
                window.scrollTo(0, 0);
              }}
            >
              <Wrapper width={`120px`} height={`120px`} padding={`20px`}>
                <Image
                  src="/images/JoinSelectIcon02.png"
                  alt="JoinSelectIcon"
                  width={120}
                  height={120}
                />
              </Wrapper>
              <JoinFirstStepSelectText>
                카센터에서 근무하고 계신가요?
              </JoinFirstStepSelectText>
              <Text color={`314FA5`} fontSize={`24px`} fontWeight={`700`}>
                직원
              </Text>
            </JoinFirstStepSelect>
          </Wrapper>
        </Wrapper>
        <CommonButtonWrapper kindOf={`column`}>
          <CommonButton>
            <Link href={UseLink.INDEX}>
              <a>다음에 가입하기</a>
            </Link>
            <IoIosArrowForward />
          </CommonButton>
        </CommonButtonWrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SelectUser;
