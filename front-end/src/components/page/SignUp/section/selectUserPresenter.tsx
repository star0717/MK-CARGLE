import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  CommonButton,
  Text,
  JoinFirstStepSelect,
  JoinFirstStepSelectText,
  Image,
} from "../../../styles/CommonComponents";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { IoIosArrowForward } from "react-icons/io";
import { NextPage } from "next";
import { UseLink } from "../../../../configure/router.entity";
import { _pSelectUserProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 가입유형 선택 컴포넌트(화면)
 * @param props
 * @returns
 */
const SelectUserPresenter: NextPage<_pSelectUserProps> = (props) => {
  const dispatch = useDispatch();

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper dr={`row`} padding={`0px 0px 40px 0px`}>
        {/* 사업자 회원가입 버튼 */}
        <Wrapper padding={`20px`} width={`auto`} ju={`center`} al={`center`}>
          <JoinFirstStepSelect
            onClick={() => {
              props.setStepNumber(props.stepNumber + 1);
              props.setUserAuth(props.UserAuthority.OWNER);
              dispatch({ type: actionTypesUser.USER_INIT });
              dispatch({
                type: actionTypesUser.INPUT_ACCOUNT,
                payload: { ...props.user, auth: props.UserAuthority.OWNER },
              });
            }}
          >
            <Image
              position={`relative`}
              src="/images/JoinSelectIcon01.png"
              alt="Cargle Logo"
              padding={`20px`}
              width={`120px`}
              display={`flex`}
              margin={`0 auto`}
            />
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
              props.setUserAuth(props.UserAuthority.WORKER);
              dispatch({ type: actionTypesUser.USER_INIT });
              dispatch({
                type: actionTypesUser.INPUT_ACCOUNT,
                payload: { ...props.user, auth: props.UserAuthority.WORKER },
              });
            }}
          >
            <Image
              position={`relative`}
              src="/images/JoinSelectIcon02.png"
              alt="Cargle Logo"
              padding={`20px`}
              width={`120px`}
              display={`flex`}
              margin={`0 auto`}
            />
            <JoinFirstStepSelectText>
              카센터에서 근무하고 계신가요?
            </JoinFirstStepSelectText>
            <Text color={`0066FF`} fontSize={`24px`} fontWeight={`700`}>
              직원
            </Text>
          </JoinFirstStepSelect>
        </Wrapper>
      </Wrapper>
      <CommonButton>
        <Link href={UseLink.INDEX}>
          <a>다음에 가입하기</a>
        </Link>
        <IoIosArrowForward />
      </CommonButton>
    </WholeWrapper>
  );
};

export default SelectUserPresenter;
