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
  TestDiv,
  UlWrapper,
  LiWrapper,
  IconButton,
  TestWrapper,
} from "../styles/CommonComponents";
import { CompanyApproval } from "../../models/company.entity";
import { MainRoute, SubRoute } from "../../models/router.entity";
import { useState } from "react";
import { appearAnimation } from "../styles/AnimationCommon";
import { FaBell } from 'react-icons/fa';

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
    <WholeWrapper ref={ref} shadow={`0px 4px 4px rgba(0, 0, 0, 0.25)`} >
      <RsWrapper>
      <Wrapper
        bgColor={`#fff`}
        ju={`space-between`}
        al={`center`}
        padding={width < 1450 ? `10px 0px 10px 70px` : `15px 0px 15px 100px`}
        dr={`row`}
      >
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
        </RsWrapper>
    </WholeWrapper>
  );
};

export default Header;
