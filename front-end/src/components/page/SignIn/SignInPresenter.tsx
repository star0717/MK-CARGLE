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
  TextInput2,
  Text,
  CommonSubTitle,
  Label,
} from "../../styles/CommonComponents";
import Link from "next/link";
import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { UseLink } from "../../../configure/router.entity";
import { _pSignInProps } from "../../../configure/_pProps.entity";

/**
 * 로그인 컴포넌트(화면)
 * @param props
 * @returns
 */
const SigninPresenter: NextPage<_pSignInProps> = (props) => {
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
          </CommonTitle>
          <CommonSubTitle color={`#000`}>
            정비관리도 이젠 편리하게
          </CommonSubTitle>

          <Wrapper margin={`20px 0px 0px`}>
            {/* 로그인 입력 form */}
            <Wrapper
              width={width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`}
            >
              <form onSubmit={props.onSignInHandler}>
                <TextInput2
                  marginBottom={`10px`}
                  width={
                    width < 1439 ? (width < 500 ? `300px` : `400px`) : `500px`
                  }
                  height={`60px`}
                  placeholder="이메일"
                  type="text"
                  name="id"
                  value={props.inputSignIn.id}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputHandler(e);
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
                  value={props.inputSignIn.pwd}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputHandler(e);
                  }}
                />

                {/* 체크박스 div */}

                <Wrapper dr={`row`} ju={`flex-end`}>
                  <Label width={`100%`} margin={`4px 0`} ju={`flex-end`}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.saveCheck}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            props.setSaveCheck(e.target.checked);
                          }}
                        />
                      }
                      label="아이디 저장"
                    />
                  </Label>
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
                      onClick={props.userInit}
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
  );
};

export default SigninPresenter;
