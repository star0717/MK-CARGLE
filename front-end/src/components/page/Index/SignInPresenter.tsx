import { useResizeDetector } from "react-resize-detector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import {
  WholeWrapper,
  Wrapper,
  WelcomeTitle,
  ThemeButton,
  TextInput,
} from "../../styles/CommonComponents";
import Link from "next/link";
import React from "react";

const SigninPresenter = ({
  onSignInHandler,
  inputSignIn,
  onInputHandler,
  saveCheck,
  setSaveCheck,
  signInErr,
  errMsg,
}: any) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();
  console.log(width);

  return (
    <WholeWrapper ref={ref}>
      <Wrapper width={width < 1400 ? `300px` : `378px`} al={`flex-start`}>
        <WelcomeTitle
          margin={
            width < 1400
              ? width < 600
                ? `50px 0px 0px 0px`
                : `100px 0px 0px 0px`
              : `200px 0px 0px 0px`
          }
          paddingBottom={`0px`}
        >
          정비관리도 이젠 편리하게
          <p
            style={{
              margin: "0",
              fontWeight: "800",
            }}
          >
            CARGLE
          </p>
        </WelcomeTitle>
        <div style={{ marginTop: "20px" }}>
          {/* 로그인 입력 form */}
          <form onSubmit={onSignInHandler}>
            {/* 이메일 input */}

            <TextInput
              marginBottom={`10px`}
              placeholder="이메일"
              type="text"
              name="id"
              value={inputSignIn.id}
              onChange={(e: any) => {
                onInputHandler(e);
              }}
            />

            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <span>TIP! 아이디는 가입 시 입력한 이메일을 입력해주세요.</span>
            </div>
            {/* 비밀번호 input */}

            <TextInput
              marginBottom={`10px`}
              type="password"
              placeholder="비밀번호"
              name="pwd"
              value={inputSignIn.pwd}
              onChange={(e: any) => {
                onInputHandler(e);
              }}
            />

            {/* 체크박스 div */}
            <div>
              {/* 아이디 저장 체크박스 */}
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <input
                  style={{
                    fontSize: "12px",
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
                  {errMsg.split("\n").map((txt: any) => (
                    <>
                      {txt}
                      <br />
                    </>
                  ))}
                </p>
              </div>
            ) : null}
            {/* 로그인 버튼 */}
            <ThemeButton
              style={{
                width: "",
              }}
              type="submit"
            >
              로그인
            </ThemeButton>
          </form>
          <div
            style={{
              marginTop: "10px",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ width: "12px", margin: "0px 3px 0px 0px" }}
              />
              <p style={{ margin: "0px 3px 0px 0px", fontSize: "14px" }}>
                아직 회원이 아니신가요?
              </p>
              <Link href="/view/signup">
                <a style={{ fontWeight: "bold" }}>회원가입</a>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ width: "12px", margin: "0px 3px 0px 0px" }}
              />
              <p style={{ margin: "0px 3px 0px 0px" }}>
                계정을 찾고 싶으신가요?
              </p>
              <Link href="/view/find">
                <a style={{ fontWeight: "bold" }}>계정찾기</a>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </WholeWrapper>
  );
};

export default SigninPresenter;
