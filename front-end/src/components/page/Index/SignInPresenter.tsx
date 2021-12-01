import { useResizeDetector } from "react-resize-detector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import {
<<<<<<< HEAD
  WholeWrapper,
  RsWrapper,
  Wrapper,
  WelcomeTitle,
  ThemeButton,
  TextInput,
  Text,
=======
    WholeWrapper,
    RsWrapper,
    Wrapper,
    CommonTitle,
    ThemeButton,
    TextInput,
    Text,
>>>>>>> d5d74f25785fe7d1bcb395498497b386b7f62962
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

<<<<<<< HEAD
  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper width={width < 1400 ? `300px` : `378px`} al={`flex-start`}>
          <WelcomeTitle
            padding={
              width < 1500
                ? width < 500
                  ? `50px 0px 0px`
                  : `80px 0px 0px`
                : `200px 0px 0px`
            }
            margin={`0px`}
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

          <Wrapper margin={`20px 0px 0px`}>
            {/* 로그인 입력 form */}
            <Wrapper
              width={width < 1400 ? `300px` : `378px`}
              onSubmit={onSignInHandler}
            >
              {/* 이메일 input */}

              <TextInput
                marginBottom={`10px`}
                width={width < 1400 ? `300px` : `378px`}
                placeholder="이메일"
                type="text"
                name="id"
                value={inputSignIn.id}
                onChange={(e: any) => {
                  onInputHandler(e);
                }}
              />
              <Wrapper>
                <Text
                  fontSize={`12px`}
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
                width={width < 1400 ? `300px` : `378px`}
                type="password"
                placeholder="비밀번호"
                name="pwd"
                value={inputSignIn.pwd}
                onChange={(e: any) => {
                  onInputHandler(e);
                }}
              />

              {/* 체크박스 div */}
              <Wrapper margin={`5px 0px`}>
                <Wrapper dr={`row`} ju={`flex-end`}>
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
                  <Text fontSize={`14px`} padding={`5px 0px`} margin={`0px`}>
                    아이디 저장
                  </Text>
=======
    return (
        <WholeWrapper ref={ref}>
            <RsWrapper>
                <Wrapper width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}>
                    <CommonTitle
                        textAlign={`center`}
                        margin={`0px`}
                    >
                        CARGLE
                        <Text>
                            정비관리도 이젠 편리하게
                        </Text>
                    </CommonTitle>

                    <Wrapper
                        margin={`20px 0px 0px`}
                    >
                        {/* 로그인 입력 form */}
                        <Wrapper
                            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
                            onSubmit={onSignInHandler}
                        >
                            {/* 이메일 input */}

                            <TextInput
                                marginBottom={`10px`}
                                width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
                                placeholder="이메일"
                                type="text"
                                name="id"
                                value={inputSignIn.id}
                                onChange={(e: any) => {
                                    onInputHandler(e);
                                }}
                            />
                            <Wrapper>
                                <Text
                                    fontSize={width < 500 ? `14px` : `18px`}
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
                                width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
                                marginTop={`10px`}
                                type="password"
                                placeholder="비밀번호"
                                name="pwd"
                                value={inputSignIn.pwd}
                                onChange={(e: any) => {
                                    onInputHandler(e);
                                }}
                            />

                            {/* 체크박스 div */}
                            <Wrapper
                                margin={`5px 0px`}
                            >
                                <Wrapper
                                    dr={`row`}
                                    ju={`flex-end`}
                                >
                                    <input
                                        style={{
                                            fontSize: "14px",
                                        }}
                                        type="checkbox"
                                        checked={saveCheck}
                                        onChange={(e) => { setSaveCheck(e.target.checked) }}
                                    >
                                    </input>
                                    <Text
                                        fontSize={`18px`}
                                        padding={`5px 0px`}
                                        margin={`0px`}
                                    >
                                        아이디 저장
                                    </Text>
                                </Wrapper>
                            </Wrapper>
                            {signInErr ? (
                                <Wrapper style={{ margin: "8px 0", textAlign: "left" }}>
                                    <Text
                                        margin={`0px`}
                                        fontSize={`8px`}
                                        color={`#d6263b`}
                                    >
                                        {errMsg.split("\n").map((txt: any) => (
                                            <>
                                                {txt}
                                                <br />
                                            </>
                                        ))}
                                    </Text>
                                </Wrapper>
                            ) : null}
                            {/* 로그인 버튼 */}
                            <ThemeButton
                                type="submit"
                            >
                                로그인
                            </ThemeButton>
                        </Wrapper>
                        <Wrapper
                            padding={`10px 0px`}
                        >
                            <Wrapper
                                dr={`row`}
                                fontSize={`18px`}
                                ju={`flex-end`}
                            >
                                <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{ width: "12px", margin: "0px 3px 0px 0px" }}
                                />
                                <Text
                                    margin={`0px 3px 0px`}
                                    fontSize={`18px`}
                                >
                                    아직 회원이 아니신가요?
                                </Text>
                                <Link href="/view/signup">
                                    <a style={{ fontWeight: "bold", fontSize: "18px" }}>회원가입</a>
                                </Link>
                            </Wrapper>
                            <Wrapper
                                dr={`row`}
                                fontSize={`18px`}
                                ju={`flex-end`}
                            >
                                <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    style={{ width: "12px", margin: "0px 3px 0px 0px" }}
                                />
                                <Text
                                    margin={`0px 3px 0px`}
                                    fontSize={`18px`}
                                >
                                    계정을 찾고 싶으신가요?
                                </Text>
                                <Link href="/view/find">
                                    <a style={{ fontWeight: "bold", fontSize: "18px" }}>계정찾기</a>
                                </Link>
                            </Wrapper>
                        </Wrapper>
                    </Wrapper>
>>>>>>> d5d74f25785fe7d1bcb395498497b386b7f62962
                </Wrapper>
              </Wrapper>
              {signInErr ? (
                <Wrapper style={{ margin: "8px 0", textAlign: "left" }}>
                  <Text margin={`0px`} fontSize={`8px`} color={`#d6263b`}>
                    {errMsg.split("\n").map((txt: any) => (
                      <>
                        {txt}
                        <br />
                      </>
                    ))}
                  </Text>
                </Wrapper>
              ) : null}
              {/* 로그인 버튼 */}
              <ThemeButton
                width={width < 1400 ? `300px` : `378px`}
                type="submit"
              >
                로그인
              </ThemeButton>
            </Wrapper>
            <Wrapper padding={`10px 0px`}>
              <Wrapper dr={`row`} fontSize={`14px`} ju={`flex-end`}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ width: "12px", margin: "0px 3px 0px 0px" }}
                />
                <Text margin={`0px 3px 0px`} fontSize={`14px`}>
                  아직 회원이 아니신가요?
                </Text>
                <Link href="/view/signup">
                  <a style={{ fontWeight: "bold" }}>회원가입</a>
                </Link>
              </Wrapper>
              <Wrapper dr={`row`} fontSize={`14px`} ju={`flex-end`}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  style={{ width: "12px", margin: "0px 3px 0px 0px" }}
                />
                <Text margin={`0px 3px 0px`} fontSize={`14px`}>
                  계정을 찾고 싶으신가요?
                </Text>
                <Link href="/view/find">
                  <a style={{ fontWeight: "bold" }}>계정찾기</a>
                </Link>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SigninPresenter;
