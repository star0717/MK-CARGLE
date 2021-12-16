import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper } from "../../styles/CommonComponents";
import React from "react";
import AccountCheck from "./section/accountCheck";
import Withdrawal from "./section/withdrawal";
import AccountInfo from "./section/accountInfo";

/**
 * 마이 페이지: 계정관리 index 컴포넌트(화면)
 * @param props
 * @returns
 */
const MyPageAcccountPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const step = props.step;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      {step === 1 && <AccountCheck {...props} />}
      {step === 2 && <AccountInfo {...props} />}
      {step === 3 && <Withdrawal {...props} />}
    </WholeWrapper>
  );
};

export default MyPageAcccountPresenter;
