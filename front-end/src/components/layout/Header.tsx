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
  IconButton,
  TestWrapper,
  TestDiv,
  TestDiv2,
  TestA,
} from "../styles/CommonComponents";
import { CompanyApproval } from "../../models/company.entity";
import { MainRoute, SubRoute } from "../../models/router.entity";
import { useState } from "react";
import { appearAnimation } from "../styles/AnimationCommon";
import { FaBell } from "react-icons/fa";

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
    <WholeWrapper ref={ref} shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}>
      <Wrapper
        height={`90px`}
        ju={`space-between`}
        al={`center`}
        padding={width < 1450 ? `0px 0px 0px 70px` : `0px 0px 0px 100px`}
        dr={`row`}
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
            <Text
              cursor={`pointer`}
              fontSize={width < 1450 ? `16px` : `18px`}
              fontWeight={`600`}
              padding={width < 1450 ? `0px 30px` : `0px 50px`}
            >
              정비
            </Text>
            <Text
              cursor={`pointer`}
              fontSize={width < 1450 ? `16px` : `18px`}
              fontWeight={`600`}
              padding={width < 1450 ? `0px 30px` : `0px 50px`}
            >
              회계
            </Text>
            <Text
              cursor={`pointer`}
              fontSize={width < 1450 ? `16px` : `18px`}
              fontWeight={`600`}
              padding={width < 1450 ? `0px 30px` : `0px 50px`}
            >
              마이페이지
            </Text>
            <Text
              cursor={`pointer`}
              fontSize={width < 1450 ? `16px` : `18px`}
              fontWeight={`600`}
              padding={width < 1450 ? `0px 30px` : `0px 50px`}
            >
              커뮤니티
            </Text>
            <Text
              cursor={`pointer`}
              fontSize={width < 1450 ? `16px` : `18px`}
              fontWeight={`600`}
              padding={width < 1450 ? `0px 30px` : `0px 50px`}
            >
              도움말
            </Text>
            <TestDiv2 shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}>
              <Link href="#">
                <TestA>소메뉴1</TestA>
              </Link>
            </TestDiv2>
          </TestDiv>
          <Wrapper
            width={`auto`}
            padding={width < 1450 ? `0px 50px` : `0px 100px`}
            dr={`row`}
          >
            <IconButton radius={`100px`} al={`center`} margin={`0px 10px`}>
              <FaBell />
            </IconButton>
            <IconButton radius={`100px`} al={`center`} margin={`0px 10px`}>
              <FaBell />
            </IconButton>
            {/* <button onClick={onSignOutHandler}>로그아웃</button> */}
          </Wrapper>
        </Wrapper>

        {tokenValue && tokenValue.cApproval === CompanyApproval.DONE && (
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
        )}
      </Wrapper>
    </WholeWrapper>
  );
};

export default Header;
