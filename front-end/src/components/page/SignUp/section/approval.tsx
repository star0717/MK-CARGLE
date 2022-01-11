import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch } from "react-redux";
import { _aGetAuthSignout } from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";
import { UseLink } from "../../../../configure/router.entity";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  SmallButton,
  RsWrapper,
} from "../../../styles/CommonComponents";

/**
 * 회원가입: 업체 승인 대기 컴포넌트(기능)
 * @returns
 */
const Approval: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * 다음에 하기(logout 같은 기능) handler
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(_aGetAuthSignout()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push(UseLink.INDEX);
    });
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper>
          <Text>가입 심사가 진행 중입니다.</Text>
          <SmallButton
            type="button"
            kindOf={`default`}
            onClick={onSignOutHandler}
          >
            돌아가기
          </SmallButton>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default Approval;
