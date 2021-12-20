import { useResizeDetector } from "react-resize-detector";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../store/action/user.action";
import {
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  HeaderIconButton,
  TestDiv,
  TestDiv2,
  TestA,
} from "../styles/CommonComponents";
import { CompanyApproval } from "../../models/company.entity";
import { UseLink } from "../../configure/router.entity";
import { FaBell } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { _cLayoutProps } from "../../configure/_cProps.entity";

const Header: NextPage<_cLayoutProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * 로그아웃 기능
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      router.push(UseLink.INDEX);
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
      margin={`0px 0px 100px`}
    >
      <Wrapper
        height={`80px`}
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
          <Link href={UseLink.MAIN}>
            <a>
              <Image
                src="/images/cargle.png"
                alt="Cargle Logo"
                width={width < 1450 ? `80px` : `100px`}
              />
            </a>
          </Link>
        </Wrapper>
        {/* <Wrapper dr={`row`} width={`auto`} al={`center`}> */}
        {props.tokenValue &&
          props.tokenValue.cApproval === CompanyApproval.DONE && (
            <TestDiv
              width={`auto`}
              dr={`row`}
              padding={width < 1450 ? `0px 50px` : `0px 100px`}
            >
              <Wrapper width={width < 1510 ? `140px` : `168px`}>
                <Text
                  cursor={`pointer`}
                  fontSize={width < 1510 ? `16px` : `18px`}
                  fontWeight={`800`}
                  padding={width < 1510 ? `5px 15px` : `5px 30px`}
                >
                  부품
                </Text>
              </Wrapper>
              <Wrapper width={width < 1510 ? `140px` : `168px`}>
                <Text
                  cursor={`pointer`}
                  fontSize={width < 1510 ? `16px` : `18px`}
                  fontWeight={`800`}
                  padding={width < 1510 ? `5px 15px` : `5px 30px`}
                >
                  정비
                </Text>
              </Wrapper>
              <Wrapper width={width < 1510 ? `140px` : `168px`}>
                <Text
                  cursor={`pointer`}
                  fontSize={width < 1510 ? `16px` : `18px`}
                  fontWeight={`800`}
                  padding={width < 1510 ? `5px 15px` : `5px 30px`}
                >
                  회계
                </Text>
              </Wrapper>
              <Wrapper width={width < 1510 ? `140px` : `168px`}>
                <Text
                  cursor={`pointer`}
                  fontSize={width < 1510 ? `16px` : `18px`}
                  fontWeight={`800`}
                  padding={width < 1510 ? `5px 15px` : `5px 30px`}
                >
                  마이페이지
                </Text>
              </Wrapper>
              <Wrapper width={width < 1510 ? `140px` : `168px`}>
                <Text
                  cursor={`pointer`}
                  fontSize={width < 1510 ? `16px` : `18px`}
                  fontWeight={`800`}
                  padding={width < 1510 ? `5px 15px` : `5px 30px`}
                >
                  커뮤니티
                </Text>
              </Wrapper>

              <Wrapper width={width < 1510 ? `140px` : `168px`}>
                <Text
                  cursor={`pointer`}
                  fontSize={width < 1510 ? `16px` : `18px`}
                  fontWeight={`800`}
                  padding={width < 1510 ? `5px 15px` : `5px 30px`}
                >
                  고객센터
                </Text>
              </Wrapper>
              <TestDiv2
                ju={``}
                al={`center`}
                padding={
                  width < 1510
                    ? width < 1080
                      ? `0px 10px`
                      : `0px 10px`
                    : `0px 20px`
                }
                dr={`row`}
                shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}
                bgColor={`#fafafa`}
              >
                <Wrapper
                  height={`80px`}
                  al={`flex-start`}
                  padding={
                    width < 1510
                      ? width < 1080
                        ? `0px 20px`
                        : `0px 50px`
                      : `0px 100px`
                  }
                  dr={`row`}
                  bgColor={`#fafafa`}
                >
                  {/* 서브메뉴 빈 wrapper */}
                  <Wrapper width={`auto`} al={`cneter`}>
                    <a>
                      <Image
                        src="/images/cargle.png"
                        alt="Cargle Logo"
                        width={width < 1450 ? `80px` : `100px`}
                        isTransparency={`true`}
                      />
                    </a>
                  </Wrapper>
                  {/* 서브메뉴 빈 wrapper 끝 */}

                  {/* <Wrapper dr={`row`} width={`auto`} al={`flex-start`}> */}
                  <Wrapper width={width < 1510 ? `140px` : `168px`}>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>부품 관리</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>세트 관리</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>거래처 관리</a>
                      </Link>
                    </TestA>
                  </Wrapper>

                  <Wrapper width={width < 1510 ? `140px` : `168px`}>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>정비장부</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>고객/차량 관리</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>예약관리</a>
                      </Link>
                    </TestA>
                  </Wrapper>

                  <Wrapper width={width < 1510 ? `140px` : `168px`}>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>매입/매출 현황</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>결산 리포트</a>
                      </Link>
                    </TestA>
                  </Wrapper>

                  <Wrapper width={width < 1510 ? `140px` : `168px`}>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>연합회 소식</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>정비정보 공유</a>
                      </Link>
                    </TestA>
                  </Wrapper>

                  <Wrapper width={width < 1510 ? `140px` : `168px`}>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>계정 관리</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>직원 관리</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>포인트 관리</a>
                      </Link>
                    </TestA>
                  </Wrapper>

                  <Wrapper width={width < 1510 ? `140px` : `168px`}>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>공지사항</a>
                      </Link>
                    </TestA>
                    <TestA
                      cursor={`pointer`}
                      fontSize={width < 1510 ? `14px` : `16px`}
                      fontWeight={`600`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href="#">
                        <a>사용 설명서</a>
                      </Link>
                    </TestA>
                  </Wrapper>

                  {/* 서브메뉴 빈 wrapper */}
                  <Wrapper
                    width={`auto`}
                    padding={
                      width < 1510
                        ? width < 1080
                          ? `0px 10px`
                          : `0px 10px`
                        : `0px 20px`
                    }
                    dr={`row`}
                    al={`flex-start`}
                  >
                    <Wrapper isRelative={true} width={`auto`} al={`flex-end`}>
                      <Wrapper
                        radius={`100px`}
                        al={`center`}
                        margin={`0px 10px`}
                        width={`45px`}
                        height={`45px`}
                      ></Wrapper>
                    </Wrapper>

                    <Wrapper
                      radius={`100px`}
                      al={`center`}
                      margin={`0px 10px`}
                      width={`45px`}
                      height={`45px`}
                    ></Wrapper>
                  </Wrapper>
                </Wrapper>
              </TestDiv2>
            </TestDiv>
          )}
        {props.tokenValue &&
          props.tokenValue.cApproval === CompanyApproval.DONE && (
            <Wrapper
              width={`auto`}
              padding={
                width < 1510
                  ? width < 1080
                    ? `0px 10px`
                    : `0px 10px`
                  : `0px 20px`
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
                {/* <HeaderIconAlarmWrapper>
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
              </HeaderIconAlarmWrapper> */}
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
          )}
        {/* </Wrapper> */}
      </Wrapper>
    </WholeWrapper>
  );
};

export default Header;
