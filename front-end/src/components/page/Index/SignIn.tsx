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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { WholeWrapper } from "../../styles/CommonComponents";

//SCSS
// const Wrapper = styled.div`
//   width: 100%;
//   display: flex;
//       flex-wrap: wrap;
//       flex-direction: row; 
//       align-items: center;
//       justify-content: center;

// `;

const Main = styled.div`
  width: 376px;
  height: 100%;
  margin:auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
    <WholeWrapper
      bgColor={`#000`}>
      <Main>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              fontSize: "22pt"
            }}
          >
            <P>정비관리도 이젠 편리하게</P>
            <p style={{ margin: "0", fontWeight: "bold" }}>CARGLE</p>
          </div>
          <div style={{ marginTop: "20px" }}>
            {/* 로그인 입력 form */}
            <form onSubmit={onSignInHandler}>
              {/* 이메일 input */}
              <div
                style={{
                  borderBottom: "1px solid",
                  height: "36px",
                  lineHeight: "36px",
                  marginBottom: "10px",
                }}>

                <input
                  style={{
                    width: "100%",
                    border: "0px;",
                    fontSize: "16px"
                  }}
                  placeholder="이메일"
                  type="text"
                  name="id"
                  value={inputSignIn.id}
                  onChange={(e) => {
                    onInputHandler(e);
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                <span>
                  TIP! 아이디는 가입 시 입력한 이메일을 입력해주세요.
                </span>
              </div>
              {/* 비밀번호 input */}
              <div
                style={{
                  borderBottom: "1px solid",
                  height: "36px",
                  lineHeight: "36px",
                  marginBottom: "10px",
                  marginTop: "10px"
                }}>

                <input
                  style={{
                    width: "100%",
                    border: "0px;",
                    fontSize: "16px"
                  }}
                  type="password"
                  placeholder="비밀번호"
                  name="pwd"
                  value={inputSignIn.pwd}
                  onChange={(e) => {
                    onInputHandler(e);
                  }}
                />
              </div>
              {/* 체크박스 div */}
              <div>
                {/* 아이디 저장 체크박스 */}
                <div style={{
                  marginBottom: "10px"
                }}
                >
                  <input
                    style={{
                      fontSize: "12px"
                    }}
                    type="checkbox"
                    checked={saveCheck}
                    onChange={(e) => {
                      setSaveCheck(e.target.checked);
                    }}
                  ></input>
                  <span style={{ fontSize: "14px" }}>아이디 저장</span>
                </div>
              </div>
              {signInErr ? (
                <div style={{ margin: "8px 0", textAlign: "left" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "red",
                    }}
                  >
                    {errMsg.split("\n").map((txt) => (
                      <>
                        {txt}
                        <br />
                      </>
                    ))}
                  </p>
                </div>
              ) : null}
              {/* 로그인 버튼 */}
              <button
                style={{
                  width: "100%",
                  marginTop: "10px",
                  height: "50px",
                  backgroundColor: "#0052CE",
                  borderRadius: "5px",
                  color: "#ffffff",
                  border: "0px",
                  fontSize: "16px"
                }}
                type="submit"
              >
                로그인
              </button>
            </form>
            <div
              style={{
                marginTop: "10px",
                padding: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "end"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  fontSize: "14px"
                }}
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ width: "12px", margin: "0px 3px 0px 0px" }}
                />
                <p style={{ margin: "0px 3px 0px 0px", fontSize: "14px" }}>아직 회원이 아니신가요?</p>
                <Link href="/view/signup">
                  <a style={{ fontWeight: "bold" }}>회원가입</a>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  fontSize: "14px"
                }}
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ width: "12px", margin: "0px 3px 0px 0px" }}
                />
                <p style={{ margin: "0px 3px 0px 0px" }}>계정을 찾고 싶으신가요?</p>
                <Link href="/view/find">
                  <a style={{ fontWeight: "bold" }}>계정찾기</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </WholeWrapper >
  );
};

export default SignIn;
