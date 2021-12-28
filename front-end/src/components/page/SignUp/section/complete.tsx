import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { signOutUserAction } from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";
import { UseLink } from "../../../../configure/router.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  CommonButtonWrapper,
  RsWrapper,
} from "../../../styles/CommonComponents";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 완료 컴포넌트(기능)
 * @param props
 * @returns
 */
const Complete: NextPage<_pSignUpProps> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * 확인(logout 같은 기능) handler
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push(UseLink.INDEX);
    });
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref} padding={`0px`}>
      <RsWrapper padding={`0px 0px 80px`}>
        <Wrapper>
          <Text color={`#0066ff`} fontSize={`60px`}>
            <BsFillCheckCircleFill />
          </Text>
          <Text padding={`0px 0px 50px`} fontSize={`22px`}>
            회원가입이 완료되었습니다.
            <br />
            가입승인 후 정상 이용이 가능합니다.
          </Text>
          <CommonButtonWrapper>
            <CommonButton type="button" onClick={onSignOutHandler}>
              확인
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Complete;
