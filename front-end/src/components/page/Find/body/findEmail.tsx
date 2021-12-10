import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findEmailAction } from "../../../../../store/action/user.action";
import { WholeWrapper } from "../../../styles/CommonComponents";
import FindEmailComplete from "./findEmailComPresenter";
import FindEmailPresenter from "./findEmailPresenter";

const FindEmail: NextPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>(""); // 이름
  const [hpNumber, setHpNumber] = useState<string>(""); // 휴대전화번호
  const [findEmail, setFindEmail] = useState<string>(""); // 찾은 이메일
  const [complete, setComplete] = useState<boolean>(false); // 조회 완료여부

  /**
   * 이메일 찾기 handler
   * @param e
   */
  const onfindEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(findEmailAction({ name, hpNumber })).then((res: any) => {
      if (res.payload) {
        setFindEmail(res.payload);
        setComplete(true);
      } else {
        alert("존재하지 않는 사용자입니다.");
      }
    });
  };

  // 화면구성에 넘길 props
  const fProps = {
    findEmail,
    name,
    setName,
    hpNumber,
    setHpNumber,
    onfindEmailHandler,
  };

  return (
    <WholeWrapper>
      {complete ? (
        <FindEmailComplete {...fProps} />
      ) : (
        <FindEmailPresenter {...fProps} />
      )}
    </WholeWrapper>
  );
};

export default FindEmail;