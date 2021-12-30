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
import { HeaderWrapper } from "../styles/LayoutComponents";
import { CompanyApproval } from "../../models/company.entity";
import { UseLink } from "../../configure/router.entity";
import { FaBell } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { menuList } from "../../configure/list.entity";
import { UserAuthority } from "../../models/user.entity";
import { _pLayoutProps } from "../../configure/_pProps.entity";

const Header: NextPage<_pLayoutProps> = (props) => {
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

  /**
   * Auth 별 메인 메뉴
   */
  const mainMenu = menuList.filter((menu) => {
    switch (props.tokenValue?.uAuth) {
      case UserAuthority.ADMIN:
        return menu.auth === UserAuthority.ADMIN;
      case UserAuthority.OWNER:
        return (
          menu.auth === UserAuthority.OWNER ||
          menu.auth === UserAuthority.WORKER
        );
      case UserAuthority.WORKER:
        return menu.auth === UserAuthority.WORKER;
    }
  });

  /**
   * Auth 별 서브 메뉴
   */
  const subMenu = mainMenu.map((menu) => {
    return menu.subMenu.filter((sub) => {
      switch (props.tokenValue?.uAuth) {
        case UserAuthority.ADMIN:
          return sub.subMenuAuth === UserAuthority.ADMIN;
        case UserAuthority.OWNER:
          return (
            sub.subMenuAuth === UserAuthority.OWNER ||
            sub.subMenuAuth === UserAuthority.WORKER
          );
        case UserAuthority.WORKER:
          return sub.subMenuAuth === UserAuthority.WORKER;
      }
    });
  });

  const { width, height, ref } = useResizeDetector();

  return (
    <HeaderWrapper
      ref={ref}
      shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}
      isAsolute={true}
      index={`9999`}
      padding={`0px`}
      margin={`0px 0px 80px`}
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
        wrap={`no-wrap`}
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
        {props.tokenValue &&
          props.tokenValue.cApproval === CompanyApproval.DONE && (
            <TestDiv
              width={`auto`}
              dr={`row`}
              padding={width < 1450 ? `0px 50px` : `0px 100px`}
            >
              {mainMenu.map((menu) => {
                return (
                  <Wrapper
                    key={menu.key}
                    width={width < 1510 ? `140px` : `168px`}
                  >
                    <Text
                      fontSize={width < 1510 ? `16px` : `18px`}
                      fontWeight={`800`}
                      padding={width < 1510 ? `5px 15px` : `5px 30px`}
                    >
                      <Link href={menu.link}>
                        <a>{menu.menuName}</a>
                      </Link>
                    </Text>
                  </Wrapper>
                );
              })}
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

                  {/* 서브메뉴 시작 */}
                  {subMenu.map((menu, idx) => {
                    return (
                      <Wrapper
                        key={idx}
                        width={width < 1510 ? `140px` : `168px`}
                      >
                        {menu.map((sub) => {
                          return (
                            <TestA
                              key={sub.key}
                              cursor={`pointer`}
                              fontSize={width < 1510 ? `14px` : `16px`}
                              fontWeight={`600`}
                              padding={width < 1510 ? `5px 15px` : `5px 30px`}
                            >
                              <Link href={sub.subMenuLink}>
                                <a>{sub.subMenuName}</a>
                              </Link>
                            </TestA>
                          );
                        })}
                      </Wrapper>
                    );
                  })}
                  {/* 서브메뉴 끝 */}

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
              wrap={`no-wrap`}
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
            </Wrapper>
          )}
      </Wrapper>
    </HeaderWrapper>
  );
};

export default Header;
