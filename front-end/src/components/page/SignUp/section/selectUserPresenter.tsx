import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonTitle,
  CommonButton,
  TextInput,
  Text,
  JoinFirstStepSelect,
  JoinFirstStepSelectText,
  Image,
} from "../../../styles/CommonComponents";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { IoIosArrowForward } from 'react-icons/io';

const SelectUserPresenter = ({
  user,
  stepNumber,
  setStepNumber,
  setUserAuth,
  UserAuthority,
}: any) => {
  const dispatch = useDispatch();
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper
        dr={`row`}
        padding={`0px 0px 40px 0px`}
      >
        {/* 사업자 회원가입 버튼 */}
        <Wrapper padding={`20px`} width={`auto`} ju={`center`} al={`center`}>
          <JoinFirstStepSelect
            onClick={() => {
              setStepNumber(stepNumber + 1);
              setUserAuth(UserAuthority.OWNER);
              dispatch({ type: actionTypesUser.USER_INIT });
              dispatch({
                type: actionTypesUser.INPUT_ACCOUNT,
                payload: { ...user, auth: UserAuthority.OWNER },
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
            <JoinFirstStepSelectText>카센터를 운영하고 계신가요?</JoinFirstStepSelectText>
            <Text fontSize={`24px`} fontWeight={`700`}>사업자</Text>
          </JoinFirstStepSelect>
        </Wrapper>

        {/* 직원 회원가입 버튼 */}
        <Wrapper padding={`20px`} width={`auto`}>
          <JoinFirstStepSelect
            onClick={() => {
              setStepNumber(stepNumber + 1);
              setUserAuth(UserAuthority.WORKER);
              dispatch({ type: actionTypesUser.USER_INIT });
              dispatch({
                type: actionTypesUser.INPUT_ACCOUNT,
                payload: { ...user, auth: UserAuthority.WORKER },
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
            <JoinFirstStepSelectText>카센터에서 근무하고 계신가요?</JoinFirstStepSelectText>
            <Text color={`0066FF`} fontSize={`24px`} fontWeight={`700`}>직원</Text>
          </JoinFirstStepSelect>
        </Wrapper>
      </Wrapper>
      <CommonButton>
        <Link href="/">
          <a>다음에 가입하기</a>
        </Link>
        <IoIosArrowForward />
      </CommonButton>
    </WholeWrapper>
  );
};

export default SelectUserPresenter;
