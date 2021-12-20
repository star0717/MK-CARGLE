import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findPWAction } from "../../../../../store/action/user.action";
import { _pFindPassword } from "../../../../configure/_pProps.entity";
import { WholeWrapper } from "../../../styles/CommonComponents";
import FindPasswordPresenter from "./findPasswordPresenter";
import FindPwComPresenter from "./findPwComPresenter";

/**
 * 계정찾기: 비밀번호 찾기(기능)
 * @returns
 */
const FindPassword: NextPage = () => {
  const dispatch = useDispatch();

  // state 관리
  const [email, setEmail] = useState<string>(""); // 이메일 주소
  const [name, setName] = useState<string>(""); // 이름
  const [hpNumber, setHpNumber] = useState<string>(""); // 휴대폰번호
  const [complete, setComplete] = useState<boolean>(false); // 조회 여부

  /**
   * 비밀번호 찾기 handler
   * @param e
   */
  const onFindPwHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const findPwInfo = {
      name: name,
      hpNumber: hpNumber,
      email: email,
    };
    dispatch(findPWAction(findPwInfo)).then(
      (req: any) => {
        if (req.payload) {
          setComplete(true);
        } else {
          alert("존재하지 않는 사용자입니다.");
        }
      },
      (err) => {
        alert("존재하지 않는 사용자입니다.");
      }
    );
  };

  const fProps: _pFindPassword = {
    email,
    setEmail,
    name,
    setName,
    hpNumber,
    setHpNumber,
    onFindPwHandler,
  };

  return (
    <WholeWrapper>
      {complete ? (
        <FindPwComPresenter />
      ) : (
        <FindPasswordPresenter {...fProps} />
      )}
    </WholeWrapper>
  );
};

export default FindPassword;
