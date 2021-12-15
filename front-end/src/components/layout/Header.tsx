import { useResizeDetector } from "react-resize-detector";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../store/action/user.action";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  Image,
  Test,
  UlWrapper,
  LiWrapper,
  HeaderIconButton,
  TestWrapper,
  TestDiv,
  TestDiv2,
  TestA,
  HeaderIconAlarm,
  HeaderIconAlarmWrapper,
} from "../styles/CommonComponents";
import { CompanyApproval } from "../../models/company.entity";
import { MainRoute, SubRoute } from "../../models/router.entity";
import { useState } from "react";
import { appearAnimation } from "../styles/AnimationCommon";
import { FaBell } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

interface LayoutProps {
  tokenValue?: any;
}

const Header: NextPage<LayoutProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 필요한 props 재정의
  const tokenValue = props?.tokenValue;

  /**
   * 로그아웃 기능
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      router.push("/");
    });
  };

  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper
      ref={ref}
      shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}
      isAsolute={true}
      index={`9999`}
      padding={`0px`}
    >
      <Wrapper
        height={`90px`}
        ju={`space-between`}
        al={`center`}
        padding={
          width < 1510 ? (width < 1080 ? `0px 20px` : `0px 50px`) : `0px 100px`
        }
        dr={`row`}
        isFixed={true}
        top={`0`}
        left={`0`}
        right={`0`}
        shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}
        bgColor={`#fafafa`}
      >
        <Wrapper width={`auto`} al={`cneter`}>
          <Link href="/v/main">
            <a>
              <Image
                src="/images/cargle.png"
                alt="Cargle Logo"
                width={width < 1450 ? `133px` : `153px`}
              />
            </a>
          </Link>
        </Wrapper>
        <Wrapper dr={`row`} width={`auto`} al={`center`}>
          <TestDiv
            width={`auto`}
            dr={`row`}
            padding={width < 1450 ? `0px 50px` : `0px 100px`}
          >
            <Wrapper width={`auto`}>
              <Text
                cursor={`pointer`}
                fontSize={width < 1510 ? `16px` : `18px`}
                fontWeight={`800`}
                padding={width < 1510 ? `0px 30px` : `0px 50px`}
              >
                부품
              </Text>
            </Wrapper>
            <Wrapper width={`auto`}>
              <Text
                cursor={`pointer`}
                fontSize={width < 1510 ? `16px` : `18px`}
                fontWeight={`800`}
                padding={width < 1510 ? `0px 30px` : `0px 50px`}
              >
                정비
              </Text>
            </Wrapper>
            <Wrapper width={`auto`}>
              <Text
                cursor={`pointer`}
                fontSize={width < 1510 ? `16px` : `18px`}
                fontWeight={`800`}
                padding={width < 1510 ? `0px 30px` : `0px 50px`}
              >
                회계
              </Text>
            </Wrapper>
            <Wrapper width={`auto`}>
              <Text
                cursor={`pointer`}
                fontSize={width < 1510 ? `16px` : `18px`}
                fontWeight={`800`}
                padding={width < 1510 ? `0px 30px` : `0px 50px`}
              >
                마이페이지
              </Text>
            </Wrapper>
            <Wrapper width={`auto`}>
              <Text
                cursor={`pointer`}
                fontSize={width < 1510 ? `16px` : `18px`}
                fontWeight={`800`}
                padding={width < 1510 ? `0px 30px` : `0px 50px`}
              >
                커뮤니티
              </Text>
            </Wrapper>
            <Text
              cursor={`pointer`}
              fontSize={width < 1510 ? `16px` : `18px`}
              fontWeight={`800`}
              padding={width < 1510 ? `0px 30px` : `0px 50px`}
            >
              도움말
            </Text>
            <TestDiv2 shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}>
              <Wrapper></Wrapper>

              <Wrapper>
                <TestA fontWeight={`600`}>
                  <Link href="#">
                    <a>소메뉴1</a>
                  </Link>
                </TestA>
                <TestA fontWeight={`600`}>
                  <Link href="#">
                    <a>소메뉴1</a>
                  </Link>
                </TestA>
                <TestA fontWeight={`600`}>
                  <Link href="#">
                    <a>소메뉴1</a>
                  </Link>
                </TestA>
              </Wrapper>
            </TestDiv2>
          </TestDiv>
          <Wrapper
            width={`auto`}
            padding={
              width < 1510
                ? width < 1080
                  ? `0px 20px`
                  : `0px 50px`
                : `0px 100px`
            }
            dr={`row`}
            al={`flex-start`}
          >
            <Wrapper isRelative={true} width={`auto`} al={`flex-end`}>
              <HeaderIconButton
                radius={`100px`}
                al={`center`}
                margin={`0px 10px`}
                border={`1px solid #ddd`}
                width={`45px`}
                height={`45px`}
                fontSize={`24px`}
                color={`#ccc`}
              >
                <FaBell />
              </HeaderIconButton>
              <HeaderIconAlarmWrapper>
                <HeaderIconAlarm>
                  <Wrapper al={`flex-start`}>
                    <Text>나는 안읽은 알림이야.</Text>
                  </Wrapper>
                  <Wrapper al={`flex-end`}>
                    <Text fontSize={`14px`} color={`#9d9d9d`}>
                      1분전
                    </Text>
                  </Wrapper>
                </HeaderIconAlarm>
                <HeaderIconAlarm kindOf={`confirm`}>
                  <Wrapper al={`flex-start`}>
                    <Text>나는 읽은 알림이야.</Text>
                  </Wrapper>
                  <Wrapper al={`flex-end`}>
                    <Text fontSize={`14px`} color={`#9d9d9d`}>
                      1분전
                    </Text>
                  </Wrapper>
                </HeaderIconAlarm>
              </HeaderIconAlarmWrapper>
            </Wrapper>

            <HeaderIconButton
              radius={`100px`}
              al={`center`}
              margin={`0px 10px`}
              border={`1px solid #ddd`}
              width={`45px`}
              height={`45px`}
              color={`#ccc`}
              onClick={onSignOutHandler}
            >
              <MdLogout />
            </HeaderIconButton>
            {/* <button onClick={onSignOutHandler}>로그아웃</button> */}
          </Wrapper>
        </Wrapper>

        {/* {tokenValue && tokenValue.cApproval === CompanyApproval.DONE && (
          <div style={{ width: "80%", display: "flex" }}>
            <div style={{ width: "75%", display: "flex" }}>
              <div style={{ width: "20%", height: "100%" }}>정비</div>
              <div style={{ width: "20%", height: "100%" }}>회계</div>
              <div style={{ width: "20%", height: "100%" }}>마이페이지</div>
              <div style={{ width: "20%", height: "100%" }}>커뮤니티</div>
              <div style={{ width: "20%", height: "100%" }}>도움말</div>
            </div>
            <div style={{ width: "25%", textAlign: "right" }}>
              <button>알림</button>
              <button onClick={onSignOutHandler}>로그아웃</button>
            </div>
          </div>
        )} */}
      </Wrapper>
    </WholeWrapper>
  );
};

export default Header;
