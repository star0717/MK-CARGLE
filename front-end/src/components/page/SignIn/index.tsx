import type { NextPage } from "next";
import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { useResizeDetector } from "react-resize-detector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { actionTypesUser, UserState } from "../../../../store/interfaces";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { _aPostAuthSignin } from "../../../../store/action/user.action";
import { formRegEx } from "../../../validation/regEx";
import { UserInfo } from "../../../models/auth.entity";
import { UseLink } from "../../../configure/router.entity";
import { _SignInProps } from "../../../configure/_props.entity";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonTitle,
  CommonButton,
  TextInput2,
  Text,
  CommonSubTitle,
  Label,
} from "../../styles/CommonComponents";
import { BodyWrapper } from "../../styles/LayoutComponents";
import { Checkbox } from "@mui/material";

/**
 * 로그인 컴포넌트(기능)
 * @param props
 * @returns
 */
const SignIn: NextPage<_SignInProps> = (props) => {
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
      dispatch(_aPostAuthSignin(inputSignIn)).then(
        (res: any) => {
          // 아이디 저장할 경우 쿠키로 저장
          if (saveCheck) {
            // const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
            Cookies.set("saveId", inputSignIn.id, { expires: 1 });
            // 아이디 저장안할 경우 쿠키 삭제(이미 생성 후 안할 경우 쿠키는 남아있기 때문에 삭제 진행)
          } else {
            Cookies.remove("saveId");
          }
          router.push(UseLink.MAIN);
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
  const userInit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch({ type: actionTypesUser.USER_INIT });
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <BodyWrapper ref={ref} kindOf={`NoneTitleBodyWrapper`}>
      <WholeWrapper padding={`0px`}>
        <RsWrapper>
          <Wrapper
            width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
          >
            <Text
              textAlign={`center`}
              margin={`0px`}
              padding={`0px`}
              color={`#292929`}
              fontSize={`34px`}
              fontWeight={`800`}
            >
              CARGLE
            </Text>
            <Text color={`#292929`} fontSize={`22px`} fontWeight={`400`}>
              정비관리도 이젠 편리하게
            </Text>

            <Wrapper margin={`20px 0px 0px`}>
              {/* 로그인 입력 form */}
              <Wrapper
                width={
                  width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                }
              >
                <form onSubmit={onSignInHandler}>
                  <TextInput2
                    marginBottom={`10px`}
                    width={
                      width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                    }
                    height={`60px`}
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
                      margin={`5px 0px 10px 0px`}
                      width={`100%`}
                      display={`flex`}
                      ju={`flex-start`}
                    >
                      TIP! 아이디는 가입 시 입력한 이메일을 입력해주세요.
                    </Text>
                  </Wrapper>
                  {/* 비밀번호 input */}

                  <TextInput2
                    width={
                      width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                    }
                    height={`60px`}
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

                  <Wrapper dr={`row`} ju={`flex-end`}>
                    <Checkbox
                      color="primary"
                      checked={saveCheck}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSaveCheck(e.target.checked);
                      }}
                    />
                    <Text>아이디 저장</Text>
                  </Wrapper>
                  {/* 로그인 버튼 */}
                  <CommonButton
                    type="submit"
                    width={
                      width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                    }
                  >
                    로그인
                  </CommonButton>
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
                    style={{ width: "18px", margin: "0px 3px 4px 0px" }}
                  />
                  <Text margin={`0px 3px 0px`} fontSize={`16px`}>
                    아직 회원이 아니신가요?
                  </Text>
                  <Text decoration={`underline`}>
                    <Link href={UseLink.SIGNUP}>
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
                    style={{ width: "18px", margin: "0px 3px 4px 0px" }}
                  />
                  <Text margin={`0px 3px 0px`} fontSize={`16px`}>
                    계정을 찾고 싶으신가요?
                  </Text>
                  <Text decoration={`underline`}>
                    <Link href={UseLink.FIND_EMAIL}>
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
    </BodyWrapper>
  );
};

export default SignIn;
