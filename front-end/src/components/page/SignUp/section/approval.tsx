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
  CommonButton,
  CommonButtonWrapper,
  JoinStepBar,
} from "../../../styles/CommonComponents";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import { GoCheck } from "react-icons/go";
import { AiOutlineHourglass } from "react-icons/ai";

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
    <BodyWrapper>
      <WholeWrapper ref={ref}>
        <RsWrapper>
          <Wrapper>
            <Wrapper padding={`0px 0px 20px`} transform={`rotate(15deg)`}>
              <JoinStepBar kindOf={`progress`}>
                <AiOutlineHourglass />
              </JoinStepBar>
            </Wrapper>
            <Text padding={`0px 0px 50px`} fontSize={`22px`}>
              가입 심사가 진행중입니다.
            </Text>
            <CommonButtonWrapper kindOf={`column`}>
              <CommonButton type="button" onClick={onSignOutHandler}>
                돌아가기
              </CommonButton>
            </CommonButtonWrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default Approval;
