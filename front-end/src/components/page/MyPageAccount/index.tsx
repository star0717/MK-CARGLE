import type { NextPage } from "next";
import { useState } from "react";
import { SignUpInfo } from "../../../models/auth.entity";
import { WholeWrapper } from "../../styles/CommonComponents";
import MyPageAcccountPresenter from "./indexPresenter";

/**
 * 마이 페이지: 계정관리 index 컴포넌트(기능)
 * @param props
 * @returns
 */
const MyPageAccount: NextPage<any> = (props) => {
  const [step, setStep] = useState<number>(1); // 페이지 step state
  const [accountInfo, setAccountInfo] = useState<SignUpInfo>(); // 로그인 계정 정보 state

  // 화면 구성에 넘길 props
  const fProps = {
    ...props,
    step,
    setStep,
    accountInfo,
    setAccountInfo,
  };

  return (
    <WholeWrapper>
      <MyPageAcccountPresenter {...fProps} />
    </WholeWrapper>
  );
};

export default MyPageAccount;
