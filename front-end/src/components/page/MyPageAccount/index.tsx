import type { NextPage } from "next";
import React, { useState } from "react";
import { _cMyPageAccount } from "../../../configure/_cProps.entity";
import { SignUpInfo } from "../../../models/auth.entity";
import AccountCheck from "./section/accountCheck";
import Withdrawal from "./section/withdrawal";
import AccountInfo from "./section/accountInfo";
import { _MainProps } from "../../../configure/_props.entity";
import { _pMyAccountProps } from "../../../configure/_pProps.entity";

/**
 * 마이 페이지: 계정관리 index 컴포넌트(기능)
 * @param props
 * @returns
 */
const MyPageAccount: NextPage<_MainProps> = (props) => {
  const [step, setStep] = useState<number>(1); // 페이지 step state
  const [accountInfo, setAccountInfo] = useState<SignUpInfo>(); // 로그인 계정 정보 state

  const myPageAccountProps: _pMyAccountProps = {
    ...props,
    step,
    setStep,
    accountInfo,
    setAccountInfo,
  };

  return (
    <>
      {step === 1 && <AccountCheck {...myPageAccountProps} />}
      {step === 2 && <AccountInfo {...myPageAccountProps} />}
      {step === 3 && <Withdrawal {...myPageAccountProps} />}
    </>
  );
};

export default MyPageAccount;
