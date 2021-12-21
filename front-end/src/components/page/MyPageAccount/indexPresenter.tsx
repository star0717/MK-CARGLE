import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper } from "../../styles/CommonComponents";
import React from "react";
import AccountCheck from "./section/accountCheck";
import Withdrawal from "./section/withdrawal";
import AccountInfo from "./section/accountInfo";
import { _cMyPageAccount } from "../../../configure/_cProps.entity";

/**
 * 마이 페이지: 계정관리 index 컴포넌트(화면)
 * @param props
 * @returns
 */
const MyPageAcccountPresenter: NextPage<_cMyPageAccount> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      {props.step === 1 && <AccountCheck {...props} />}
      {props.step === 2 && <AccountInfo {...props} />}
      {props.step === 3 && <Withdrawal {...props} />}
    </WholeWrapper>
  );
};

export default MyPageAcccountPresenter;
