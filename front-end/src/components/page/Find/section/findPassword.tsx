import { NextPage } from "next";
import React, { useState } from "react";
import { _pFindPassword } from "../../../../configure/_pProps.entity";
import { WholeWrapper } from "../../../styles/CommonComponents";
import FindPasswordCheck from "./findPasswordCheck";
import FindPasswordComplete from "./findPasswordComplete";

/**
 * 계정찾기: 비밀번호 찾기(기능)
 * @returns
 */
const FindPassword: NextPage = () => {
  // state 관리
  const [email, setEmail] = useState<string>(""); // 이메일 주소
  const [name, setName] = useState<string>(""); // 이름
  const [hpNumber, setHpNumber] = useState<string>(""); // 휴대폰번호
  const [complete, setComplete] = useState<boolean>(false); // 조회 여부

  /**
   * 계정찾기(비밀번호) props
   */
  const findPasswordProps: _pFindPassword = {
    email,
    setEmail,
    name,
    setName,
    hpNumber,
    setHpNumber,
    setComplete,
  };

  return (
    <WholeWrapper>
      {complete ? (
        <FindPasswordComplete />
      ) : (
        <FindPasswordCheck {...findPasswordProps} />
      )}
    </WholeWrapper>
  );
};

export default FindPassword;
