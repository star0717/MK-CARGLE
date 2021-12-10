import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { WholeWrapper } from "../../styles/CommonComponents";
import FindHeader from "./header";
import { SignRoute } from "../../../models/router.entity";
import FindEmail from "./body/findEmail";
import FindPassword from "./body/findPassword";

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

const Find: NextPage = () => {
  return (
    <WholeWrapper>
      <FindHeader />
      <FindBody />
    </WholeWrapper>
  );
};

export default Find;
