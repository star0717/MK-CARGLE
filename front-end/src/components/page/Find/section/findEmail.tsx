import { NextPage } from "next";
import React, { useState } from "react";
import { _pFindEmail } from "../../../../configure/_pProps.entity";
import { WholeWrapper } from "../../../styles/CommonComponents";
import FindEmailCheck from "./findEmailCheck";
import FindEmailComplete from "./findEmailComplete";

/**
 * 계정찾기: 이메일 찾기(기능)
 * @returns
 */
const FindEmail: NextPage = () => {
  const [name, setName] = useState<string>(""); // 이름
  const [hpNumber, setHpNumber] = useState<string>(""); // 휴대전화번호
  const [findEmail, setFindEmail] = useState<string>(""); // 찾은 이메일
  const [complete, setComplete] = useState<boolean>(false); // 조회 완료여부

  // 화면구성에 넘길 props
  const findEmailProps: _pFindEmail = {
    findEmail,
    setFindEmail,
    name,
    setName,
    hpNumber,
    setHpNumber,
    setComplete,
  };

  return (
    <WholeWrapper>
      {complete ? (
        <FindEmailComplete {...findEmailProps} />
      ) : (
        <FindEmailCheck {...findEmailProps} />
      )}
    </WholeWrapper>
  );
};

export default FindEmail;
