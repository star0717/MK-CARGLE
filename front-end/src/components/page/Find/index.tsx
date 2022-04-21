import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { UseLink } from "../../../configure/router.entity";
import FindEmail from "./section/findEmail";
import FindPassword from "./section/findPassword";
import { getPathName } from "src/modules/commonModule";

/**
 * 계정찾기: 라우터에 따른 컴포넌트 구분
 * @returns
 */
const FindBody: NextPage = () => {
  const router = useRouter();
  const pathName: string = getPathName(router.asPath);

  switch (pathName) {
    case UseLink.FIND_EMAIL:
      return <FindEmail />;

    case UseLink.FIND_PASSWORD:
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
  return <FindBody />;
};

export default Find;
