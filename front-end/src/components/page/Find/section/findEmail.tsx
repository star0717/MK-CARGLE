import { NextPage } from "next";
import React, { useState } from "react";
import { WholeWrapper } from "../../../styles/CommonComponents";
import FindEmailComplete from "./findEmailComplete";
import FindEmailCheck from "./findEmailCheck";
import { _pFindEmail } from "../../../../configure/_pProps.entity";

/**
 * 계정찾기: 이메일 찾기(기능)
 * @returns
 */
const FindEmail: NextPage = () => {
  const [name, setName] = useState<string>(""); // 이름
  const [hpNumber, setHpNumber] = useState<string>(""); // 휴대전화번호
  const [findEmail, setFindEmail] = useState<string>(""); // 찾은 이메일
  const [complete, setComplete] = useState<boolean>(false); // 조회 완료여부

  /**
   * 계정찾기(이메일) props
   */
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
