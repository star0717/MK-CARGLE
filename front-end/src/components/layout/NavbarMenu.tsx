import React, { useState } from "react";
import { NextPage } from "next";
import { AiOutlineClose } from "react-icons/ai";
import { Wrapper, CloseButton, Text, Image } from "../styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";
import { menuList } from "src/configure/list.entity";
import { UserAuthority } from "src/constants/model.const";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useRouter } from "next/router";

const NavbarMenu: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //   const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const [menuKey, setMenuKey] = useState<string>(
    props.tokenValue.uAuth === UserAuthority.ADMIN ? "7" : "1"
  );
  const [arrNum, setArrNum] = useState<number>(
    props.tokenValue.uAuth === UserAuthority.ADMIN ? 7 : 1
  );
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
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

  const clickMenu = subMenu.map((menu) => {
    return menu.filter((sub) => {
      return sub.key.substring(0, 1) === menuKey;
    });
  });

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <Wrapper
      isFixed
      height={`100%`}
      background={`rgba(0, 0, 0, 0.7)`}
      top={`0`}
      left={`0`}
      ju={`flex-start`}
      al={`flex-start`}
      zIndex={`9999`}
    >
      <Wrapper
        height={`100%`}
        color={`#000`}
        padding={`22px 0px`}
        bgColor={`#fff`}
        ju={`flex-start`}
        al={`flex-start`}
        width={`60%`}
      >
        <Wrapper fontSize={`28px`} ju={`space-between`} dr={`row`}>
          <Wrapper width={`auto`} padding={`0px 30px`}>
            <Image src="/images/cargle.png" alt="Cargle Logo" width={`100px`} />
          </Wrapper>
          <CloseButton
            type="button"
            onClick={() => {
              console.log("hi");
              props.setOpenMenu(false);
            }}
            color={`#343a40`}
            bgColor={`#fff`}
            fontSize={`25px`}
            padding={`0px 30px`}
          >
            <AiOutlineClose />
          </CloseButton>
        </Wrapper>
        <Wrapper
          margin={`22px 0px 0px`}
          dr={`row`}
          al={`flex-start`}
          borderTop={`1px solid #8dafce`}
        >
          <Wrapper width={`50%`}>
            {mainMenu.map((menu) => {
              return (
                <Wrapper
                  key={menu.key}
                  padding={`20px 30px`}
                  ju={`flex-start`}
                  al={`center`}
                  fontSize={`22px`}
                  bgColor={menu.key === menuKey ? `#8DAFCE` : ``}
                  borderBottom={`1px solid #8DAFCE`}
                  cursor={`pointer`}
                  dr={`row`}
                  onClick={() => {
                    //   setOpenSubMenu(!openSubMenu);
                    setMenuKey(menu.key);
                  }}
                >
                  <Text
                    fontWeight={menu.key === menuKey ? `700` : ``}
                    color={menu.key === menuKey ? `#fff` : ``}
                    fontSize={`18px`}
                  >
                    {menu.menuName}
                  </Text>
                  <Text fontSize={`18px`} marginTop={`0px`} color={`#fff`}>
                    {menuKey === menu.key && <MdOutlineNavigateNext />}
                  </Text>
                </Wrapper>
              );
            })}
          </Wrapper>
          <Wrapper width={`50%`}>
            {menuKey &&
              clickMenu[Number(menuKey) - arrNum].map((sub, idx) => {
                return (
                  <Wrapper
                    key={idx}
                    padding={`20px 30px`}
                    al={`flex-start`}
                    bgColor={`#eee`}
                    borderBottom={`1px solid #fff`}
                    cursor={`pointer`}
                    onClick={() => {
                      props.setOpenMenu(false);
                      router.push(sub.subMenuLink);
                    }}
                  >
                    <Text key={sub.key} fontSize={`18px`}>
                      {sub.subMenuName}
                    </Text>
                  </Wrapper>
                );
              })}
          </Wrapper>
        </Wrapper>

        {/* <Wrapper al={`flex-start`}>
              <Image
                src="/images/cargle.png"
                alt="Cargle Logo"
                width={`120px`}
                opacity={`0.5`}
              />
            </Wrapper> */}
      </Wrapper>
    </Wrapper>
  );
};

export default NavbarMenu;
