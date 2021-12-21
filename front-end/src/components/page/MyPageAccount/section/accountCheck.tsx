import type { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMyInfoAction,
  pwCheckAction,
} from "../../../../../store/action/user.action";
import { _cMyPageAccount } from "../../../../configure/_cProps.entity";
import { _pAccountCheckProps } from "../../../../configure/_pProps.entity";
import { WholeWrapper } from "../../../styles/CommonComponents";
import AccountCheckPresenter from "./accountCheckPresenter";

/**
 * 마이 페이지: 계정관리 확인 컴포넌트(기능)
 * @param props
 * @returns
 */
const AccountCheck: NextPage<_cMyPageAccount> = (props) => {
  const dispatch = useDispatch();

  // state 관리
  const [password, setPassword] = useState<string>(""); // 비밀번호 입력 state

  /**
   * 비밀번호 체크 handler
   * @param e
   */
  const pwCheckHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmPWD = {
      _id: props.tokenValue.uID,
      PWD: password,
    };
    dispatch(pwCheckAction(confirmPWD)).then(
      (res: any) => {
        if (res.payload === true) {
          dispatch(getMyInfoAction()).then((res: any) => {
            if (res.payload) {
              props.setAccountInfo(res.payload);
              props.setStep(2);
            }
          });
        } else {
          alert("비밀번호가 틀립니다.");
        }
      },
      (err) => {
        if (err.response.status === 401) {
          alert("사업자 승인이 필요합니다.");
        }
      }
    );
  };

  // 화면구성에 넘길 props
  const fProps: _pAccountCheckProps = {
    pwCheckHandler,
    password,
    setPassword,
  };

  return (
    <WholeWrapper>
      <AccountCheckPresenter {...fProps} />
    </WholeWrapper>
  );
};

export default AccountCheck;
