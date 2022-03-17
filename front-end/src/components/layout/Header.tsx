import { useResizeDetector } from "react-resize-detector";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { _aGetAuthSignout } from "../../../store/action/user.action";
import {
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  IconButton,
} from "../styles/CommonComponents";
import {
  HeaderWrapper,
  HeaderFixed,
  HeaderHover,
  HeaderText,
  HeaderIconButton,
  MobileHeader,
  MobileMenu,
  MobileSubMenu,
  MobileFixed,
} from "../styles/LayoutComponents";
import { UseLink } from "../../configure/router.entity";
import { FaBell } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { menuList } from "../../configure/list.entity";
import { CompanyApproval, UserAuthority } from "../../constants/model.const";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { _MainProps } from "src/configure/_props.entity";

const Header: NextPage<_MainProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * 로그아웃 기능
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(_aGetAuthSignout()).then((res: any) => {
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
    <>
      <HeaderWrapper
        ref={ref}
        shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}
        isFixed={true}
        index={`9999`}
        padding={`0px`}
        margin={`0px 0px 80px`}
      >
        <Wrapper
          height={`80px`}
          ju={`space-between`}
          al={`center`}
          padding={
            width < 1510
              ? width < 1080
                ? `0px 20px`
                : `0px 50px`
              : `0px 100px`
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
          <Wrapper width={`auto`} al={`center`}>
            <Link href={UseLink.MAIN}>
              <a>
                <Image
                  src="/images/mainLogo.png"
                  alt="Cargle Logo"
                  width={width < 1450 ? `80px` : `100px`}
                />
              </a>
            </Link>
          </Wrapper>
          {props.tokenValue &&
            props.tokenValue.cApproval === CompanyApproval.DONE && (
              <HeaderFixed
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
                        fontWeight={`600`}
                        padding={width < 1510 ? `5px 15px` : `5px 30px`}
                      >
                        <Link href={menu.link}>
                          <a>{menu.menuName}</a>
                        </Link>
                      </Text>
                    </Wrapper>
                  );
                })}
                <HeaderHover
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
                    <Wrapper width={`auto`} al={`center`}>
                      <a>
                        <Image
                          src="/images/mainLogo.png"
                          alt="Cargle Logo"
                          width={width < 1450 ? `80px` : `100px`}
                          isTransparency={`true`}
                          opacity={`0`}
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
                              <HeaderText
                                key={sub.key}
                                cursor={`pointer`}
                                fontSize={width < 1510 ? `14px` : `16px`}
                                fontWeight={`400`}
                                padding={width < 1510 ? `5px 15px` : `5px 30px`}
                              >
                                <Link href={sub.subMenuLink}>
                                  <a>{sub.subMenuName}</a>
                                </Link>
                              </HeaderText>
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
                </HeaderHover>
              </HeaderFixed>
            )}
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
            {props.tokenValue &&
              props.tokenValue.cApproval === CompanyApproval.DONE && (
                <Wrapper isRelative={true} width={`auto`} al={`flex-end`}>
                  {/* <HeaderIconButton>
                    <FaBell />
                  </HeaderIconButton> */}
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
              )}
            {props.tokenValue &&
              (props.tokenValue.cApproval === CompanyApproval.DONE ||
                props.tokenValue.cApproval === CompanyApproval.ING) && (
                <HeaderIconButton onClick={onSignOutHandler}>
                  <MdLogout />
                </HeaderIconButton>
              )}
          </Wrapper>
        </Wrapper>
      </HeaderWrapper>
      <MobileHeader
        shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`}
        isFixed={true}
        index={`9999`}
        padding={`0px 30px`}
        margin={`0px 0px 80px`}
        ju={`space-between`}
        bgColor={`#fff`}
      >
        <MobileFixed
          width={`100%`}
          dr={`row`}
          padding={width < 1450 ? `0px 50px` : `0px 100px`}
        >
          <Wrapper
            display={props.tokenValue ? `` : `none`}
            width={`20%`}
            al={`flex-start`}
            // onClick={() => {
            //   props.setOpenMenu(!props.openMenu);
            // }}
          >
            <HeaderIconButton
              type="button"
              onClick={() => {
                props.setOpenMenu(!props.openMenu);
              }}
              bgColor={`inherit`}
              color={`#8DAFCE`}
            >
              <AiOutlineMenu />
            </HeaderIconButton>
          </Wrapper>
          <Wrapper width={props.tokenValue ? `60%` : `100%`}>
            <Image
              src="/images/mainLogo.png"
              alt="Cargle Logo"
              width={`80px`}
            />
          </Wrapper>
          <Wrapper
            display={props.tokenValue ? `` : `none`}
            width={`20%`}
            dr={`row`}
            ju={`flex-end`}
            wrap={`no-wrap`}
          >
            {props.tokenValue &&
              props.tokenValue.cApproval === CompanyApproval.DONE && (
                <Wrapper isRelative={true} width={`auto`} al={`flex-end`}>
                  {/* <HeaderIconButton>
                    <FaBell />
                  </HeaderIconButton> */}
                </Wrapper>
              )}
            {props.tokenValue &&
              (props.tokenValue.cApproval === CompanyApproval.DONE ||
                props.tokenValue.cApproval === CompanyApproval.ING) && (
                <HeaderIconButton onClick={onSignOutHandler}>
                  <MdLogout />
                </HeaderIconButton>
              )}
          </Wrapper>
        </MobileFixed>
      </MobileHeader>
    </>
  );
};

export default Header;
