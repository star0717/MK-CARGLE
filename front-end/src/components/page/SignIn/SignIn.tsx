import type { NextPage } from "next";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypesUser, UserState } from "../../../../store/interfaces";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { signInUserAction } from "../../../../store/action/user.action";
import { formRegEx } from "../../../validation/regEx";
import SigninPresenter from "./SignInPresenter";
import { UserInfo } from "../../../models/auth.entity";

/**
 * 로그인 컴포넌트(기능)
 * @param props
 * @returns
 */
const SignIn: NextPage<any> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // redux store에서 signIn 정보만 가져옴
  const { signInInfo } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  // input 값을 위한 state
  // 가져온 signIn 값과 props의 id 값을 input state의 초기값으로 세팅
  const [inputSignIn, setInputSignIn] = useState<UserInfo>({
    ...signInInfo,
    id: props.saveId,
  });

  const [saveCheck, setSaveCheck] = useState<boolean>(props.saveCheck); // 아이디 저장 체크 여부를 위한 state

  /**
   * 인풋 값 변환 handler
   * @param e
   */
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSignIn({ ...inputSignIn, [e.target.name]: e.target.value });
  };

  /**
   * 로그인 시 handler
   * @param e
   */
  const onSignInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSignIn.id === "" || !formRegEx.EMAIL.test(inputSignIn.id)) {
      alert("이메일을 입력해주세요.");
    } else if (inputSignIn.pwd === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
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
          router.push("/v/main");
        },
        (err) => {
          // 입력 값이 계정과 다를 경우 에러
          // Nest에서 전송해주는 status code에 맞게 핸들링
          if (err.response.status === 401) {
            setInputSignIn({ ...inputSignIn, pwd: "" });
            alert(
              "이메일 또는 비밀번호가 잘못 입력되었습니다.\n이메일과 비밀번호를 정확히 입력해주세요."
            );
          }
        }
      );
    }
  };

  /**
   * 회원가입 state 초기화
   * @param e
   */
  const userInit = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: actionTypesUser.USER_INIT });
  };

  // 화면 구성에 넘겨줄 props
  const fProps = {
    onSignInHandler,
    inputSignIn,
    onInputHandler,
    saveCheck,
    setSaveCheck,
    userInit,
  };

  return <SigninPresenter {...fProps} />;
};

export default SignIn;
