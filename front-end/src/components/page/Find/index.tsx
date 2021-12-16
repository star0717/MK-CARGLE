import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { WholeWrapper } from "../../styles/CommonComponents";
import { SignRoute } from "../../../models/router.entity";
import FindEmail from "./body/findEmail";
import FindPassword from "./body/findPassword";

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
    <WholeWrapper>
      <FindBody />
    </WholeWrapper>
  );
};

export default Find;
