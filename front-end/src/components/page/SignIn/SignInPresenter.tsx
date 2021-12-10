import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonTitle,
  CommonButton,
  TextInput,
  Text,
  CommonSubTitle,
} from "../../styles/CommonComponents";
import Link from "next/link";
import React from "react";

const SigninPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const onSignInHandler = props.onSignInHandler;
  const inputSignIn = props.inputSignIn;
  const onInputHandler = props.onInputHandler;
  const saveCheck = props.saveCheck;
  const setSaveCheck = props.setSaveCheck;
  const userInit = props.userInit;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper
          width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
        >
          <CommonTitle textAlign={`center`} margin={`0px`} padding={`0px`}>
            CARGLE
            <CommonSubTitle color={`#000`}>
              정비관리도 이젠 편리하게
            </CommonSubTitle>
          </CommonTitle>

          <Wrapper margin={`20px 0px 0px`}>
            {/* 로그인 입력 form */}
            <Wrapper
              width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            >
              <form onSubmit={onSignInHandler}>
                <TextInput
                  marginBottom={`10px`}
                  width={
                    width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                  }
                  placeholder="이메일"
                  type="text"
                  name="id"
                  value={inputSignIn.id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputHandler(e);
                  }}
                />
                <Wrapper>
                  <Text
                    fontSize={width < 500 ? `12px` : `16px`}
                    fontWeight={`700`}
                    margin={`0px`}
                    width={`100%`}
                    display={`flex`}
                    ju={`flex-start`}
                  >
                    TIP! 아이디는 가입 시 입력한 이메일을 입력해주세요.
                  </Text>
                </Wrapper>
                {/* 비밀번호 input */}

                <TextInput
                  width={
                    width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                  }
                  marginTop={`10px`}
                  type="password"
                  placeholder="비밀번호"
                  name="pwd"
                  value={inputSignIn.pwd}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputHandler(e);
                  }}
                />

                {/* 체크박스 div */}
                <Wrapper margin={`5px 0px`}>
                  <Wrapper dr={`row`} ju={`flex-end`}>
                    <input
                      style={{
                        fontSize: "14px",
                      }}
                      type="checkbox"
                      checked={saveCheck}
                      onChange={(e) => {
                        setSaveCheck(e.target.checked);
                      }}
                    ></input>
                    <Text
                      fontSize={width < 500 ? `12px` : `16px`}
                      padding={`5px 0px`}
                      margin={`0px`}
                    >
                      아이디 저장
                    </Text>
                  </Wrapper>
                </Wrapper>
                {/* 로그인 버튼 */}
                <CommonButton type="submit">로그인</CommonButton>
              </form>
            </Wrapper>
            <Wrapper padding={`10px 0px`}>
              <Wrapper
                dr={`row`}
                fontSize={width < 500 ? `12px` : `16px`}
                ju={`flex-end`}
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ width: "18px", margin: "0px 3px 0px 0px" }}
                />
                <Text
                  margin={`0px 3px 0px`}
                  fontSize={width < 500 ? `12px` : `16px`}
                >
                  아직 회원이 아니신가요?
                </Text>
                <Text decoration={`underline`}>
                  <Link href="/sign/signup">
                    <a
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                      onClick={userInit}
                    >
                      회원가입
                    </a>
                  </Link>
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} fontSize={`16px`} ju={`flex-end`}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ width: "16px", margin: "0px 3px 0px 0px" }}
                />
                <Text margin={`0px 3px 0px`} fontSize={`16px`}>
                  계정을 찾고 싶으신가요?
                </Text>
                <Text decoration={`underline`}>
                  <Link href="/sign/findemail">
                    <a style={{ fontWeight: "bold", fontSize: "16px" }}>
                      계정찾기
                    </a>
                  </Link>
                </Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SigninPresenter;
