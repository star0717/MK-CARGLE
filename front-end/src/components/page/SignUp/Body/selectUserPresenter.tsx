import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonTitle,
  CommonButton,
  TextInput,
  Text,
} from "../../../styles/CommonComponents";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";

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
      <Wrapper>
        {/* 사업자 회원가입 버튼 */}
        <Wrapper
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
          사업자
        </Wrapper>

        {/* 직원 회원가입 버튼 */}
        <Wrapper
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
          직원
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <Link href="/">
          <a>다음에 가입하기</a>
        </Link>
      </Wrapper>
    </WholeWrapper>
  );
};

export default SelectUserPresenter;
