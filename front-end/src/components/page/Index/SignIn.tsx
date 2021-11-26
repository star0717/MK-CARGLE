import type { NextPage } from "next";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../../../store/interfaces";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { signInUserAction } from "../../../../store/action/user.action";
import styled from "styled-components";
import { formRegEx } from "../../../validation/regEx";

//SigninPresenter
import withSplitting from "../../../Lib/withSpliting";
const SigninPresenter = withSplitting(() => import("./SignInPresenter"));

//SCSS
// const Wrapper = styled.div`
//   width: 100%;
//   display: flex;
//       flex-wrap: wrap;
//       flex-direction: row; 
//       align-items: center;
//       justify-content: center;

// `;

const P = styled.p`
  margin: 0;
`;

const SignIn: NextPage<any> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // redux store에서 signIn 정보만 가져옴
  const { signInInfo } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  // input 값을 위한 state
  // 가져온 signIn 값과 props의 id 값을 input state의 초기값으로 세팅
  const [inputSignIn, setInputSignIn] = useState({
    ...signInInfo,
    id: props.saveId,
  });

  const [saveCheck, setSaveCheck] = useState(props.saveCheck); // 아이디 저장 체크 여부를 위한 state
  const [signInErr, setSignInErr] = useState(false); // 로그인 시도 시 에러 여부
  const [errMsg, setErrMsg] = useState(""); // 로그인 에러 시 메세지 내용

  // input 값 입력 시 텍스트 변환을 위한 handler
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSignIn({ ...inputSignIn, [e.target.name]: e.target.value });
  };

  // 로그인 시 handler
  const onSignInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSignIn.id === "" || !formRegEx.EMAIL.test(inputSignIn.id)) {
      setSignInErr(true);
      setErrMsg("이메일을 입력해주세요.");
    } else if (inputSignIn.pwd === "") {
      setSignInErr(true);
      setErrMsg("비밀번호를 입력해주세요.");
    } else {
      setSignInErr(false);
      setErrMsg("");
      // 아이디, 비밀번호 정상 입력 시
      dispatch(signInUserAction(inputSignIn)).then(
        (res: any) => {
          // 아이디 저장할 경우 쿠키로 저장
          if (saveCheck) {
            // const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
            Cookies.set("saveId", inputSignIn.id, { expires: 1 });
            // 아이디 저장안할 경우 쿠키 삭제(이미 생성 후 안할 경우 쿠키는 남아있기 때문에 삭제 진행)
          } else {
            Cookies.remove("saveId");
          }
          router.push("/view/main");
        },
        (err) => {
          // 입력 값이 계정과 다를 경우 에러
          // Nest에서 전송해주는 status code에 맞게 핸들링
          if (err.response.status === 401) {
            setInputSignIn({ ...inputSignIn, pwd: "" });
            setSignInErr(true);
            setErrMsg(
              "이메일 또는 비밀번호가 잘못 입력되었습니다.\n이메일과 비밀번호를 정확히 입력해주세요."
            );
          }
        }
      );
    }
  };

  return (
    <SigninPresenter
      onSignInHandler={onSignInHandler}
      inputSignIn={inputSignIn}
      onInputHandler={onInputHandler}
      saveCheck={saveCheck}
      setSaveCheck={setSaveCheck}
      signInErr={signInErr}
      errMsg={errMsg}
    />
  );
};

export default SignIn;
