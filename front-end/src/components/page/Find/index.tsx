import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { SignRoute } from "../../../configure/router.entity";
import FindEmail from "./section/findEmail";
import FindPassword from "./section/findPassword";
import { BodyWrapper } from "../../styles/LayoutComponents";
import FindHeader from "./header";

/**
 * 계정찾기: 라우터에 따른 컴포넌트 구분
 * @returns
 */
const FindBody: NextPage = () => {
  const router = useRouter();
  const { action } = router.query;

  switch (action) {
    case SignRoute.FINDEMAIL:
      return <FindEmail />;

    case SignRoute.FINDPASSWORD:
      return <FindPassword />;

    default:
      return <FindEmail />;
  }
};

/**
 * 계정찾기: index 컴포넌트
 * @returns
 */
const Find: NextPage = () => {
  return (
    <BodyWrapper>
      <FindHeader />
      <FindBody />
    </BodyWrapper>
  );
};

export default Find;
