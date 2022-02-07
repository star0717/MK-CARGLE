import React, { useState } from "react";
import { NextPage } from "next";
import { AiOutlineClose } from "react-icons/ai";
import { Wrapper, CloseButton, Text } from "../styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";
import { menuList } from "src/configure/list.entity";
import { UserAuthority } from "src/constants/model.const";
import Link from "next/link";

const NavbarMenu: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
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
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //   const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const [menuKey, setMenuKey] = useState<string>("1");
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <Wrapper
      isAbsolute
      height={`100vh`}
      background={`rgba(0, 0, 0, 0.5)`}
      top={`0`}
      left={`0`}
      ju={`flex-start`}
      al={`flex-start`}
      zIndex={`9999`}
    >
      <Wrapper
        height={`100vh`}
        color={`#314FA5`}
        padding={`50px`}
        bgColor={`#000`}
        ju={`flex-start`}
        al={`flex-start`}
        width={`60%`}
      >
        <Wrapper fontSize={`28px`} al={`flex-end`}>
          <CloseButton
            type="button"
            onClick={() => {
              props.setOpenMenu(false);
            }}
            color={`#314FA5`}
            bgColor={`#fff`}
            ju={`flex-start`}
            fontSize={`34px`}
          >
            <AiOutlineClose />
          </CloseButton>
        </Wrapper>
        <Wrapper padding={`100px 0px`} dr={`row`} al={`flex-start`}>
          <Wrapper width={`50%`}>
            {mainMenu.map((menu) => {
              return (
                <Wrapper
                  key={menu.key}
                  padding={`20px 0px`}
                  al={`flex-start`}
                  fontSize={`22px`}
                  onClick={() => {
                    //   setOpenSubMenu(!openSubMenu);
                    setMenuKey(menu.key);
                  }}
                >
                  <Text
                    decoration={menu.key === menuKey && `underline`}
                    cursor={`pointer`}
                  >
                    {menu.menuName}
                  </Text>
                </Wrapper>
              );
            })}
          </Wrapper>
          <Wrapper width={`50%`}>
            {subMenu.map((menu, idx) => {
              const sub = menu.filter(
                (sub) => sub.key.substring(0, 1) === menuKey
              );
              if (menuKey)
                return (
                  <Wrapper
                    key={idx}
                    padding={`20px 0px`}
                    al={`flex-start`}
                    fontSize={`22px`}
                  >
                    {sub.map((sub) => {
                      return (
                        <Text
                          key={sub.key}
                          cursor={`pointer`}
                          onClick={() => {
                            props.setOpenMenu(false);
                          }}
                        >
                          <Link href={sub.subMenuLink}>
                            <a>{sub.subMenuName}</a>
                          </Link>
                        </Text>
                      );
                    })}
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
