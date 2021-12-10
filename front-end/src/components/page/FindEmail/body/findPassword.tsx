import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { findPWAction } from "../../../../../store/action/user.action";
import { WholeWrapper } from "../../../styles/CommonComponents";
import FindPasswordPresenter from "./findPasswordPresenter";
import FindPwComPresenter from "./findPwComPresenter";

const FindPassword: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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

    dispatch(
      findPWAction({
        name,
        hpNumber,
        email,
      })
    ).then(
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

  const fProps = {
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
