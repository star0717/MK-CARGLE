import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React from "react";
import { formRegEx } from "../../../../validation/regEx";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
  CommonButton,
  RsWrapper,
} from "../../../styles/CommonComponents";
import { _pSignAccountProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 계정정보 컴포넌트(화면)
 * @param props
 * @returns
 */
const SignAccountPresenter: NextPage<_pSignAccountProps> = (props) => {
  const dispatch = useDispatch();

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <form onSubmit={props.handleSubmit(props.onSignUpUserHandler)}>
          <Wrapper
            width={`auto`}
            padding={`50px`}
            border={`1px solid #ccc`}
            radius={`5px`}
          >
            {/* 소속 업체(직원일 경우에만) */}
            {props.userAuth === "worker" && (
              <Wrapper margin={`0px 0px 10px`}>
                <Wrapper al={`flex-start`}>
                  <Text margin={`0px 0px 10px`}>*소속 업체</Text>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <TextInput2
                      width={`300px`}
                      type="text"
                      value={props.inputForm.companyNum}
                      placeholder="업체명 또는 사업자번호로 검색"
                      readOnly
                      {...props.register("companyNum", {
                        required: {
                          value: true,
                          message: "필수 입력사항입니다.",
                        },
                      })}
                    />
                    <SmallButton
                      type="button"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        props.setModalOption("company");
                        props.setModalOpen(!props.modalOpen);
                      }}
                      kindOf={`default`}
                      margin={`0px 0px 0px 20px`}
                    >
                      검색
                    </SmallButton>
                  </Wrapper>
                </Wrapper>
                {props.errors.companyNum?.type === "required" && (
                  <Text
                    margin={`0px 0px 10px 0px`}
                    width={`100%`}
                    color={`#d6263b`}
                    al={`flex-start`}
                    fontSize={`14px`}
                    textAlign={`left`}
                  >
                    {props.errors.companyNum.message}
                  </Text>
                )}
              </Wrapper>
            )}
            {/* 아이디(이메일) */}
            <Wrapper>
              <Wrapper al={`flex-start`}>
                <Text margin={`0px 0px 10px`}>
                  *아이디(이메일 형식으로 입력해주세요.)
                </Text>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px`}>
                  <TextInput2
                    width={`300px`}
                    type="email"
                    value={props.inputUser.email}
                    readOnly={props.formCheck.emailReadOnly}
                    placeholder="이메일을 입력해주세요."
                    {...props.register("email", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        props.onInputUserHandler(e);
                      },
                      required: true,
                      pattern: formRegEx.EMAIL,
                    })}
                  />
                  <SmallButton
                    kindOf={`default`}
                    margin={`0px 0px 0px 20px`}
                    type="button"
                    onClick={props.onEmailSendHandler}
                    disabled={props.formCheck.authNumCheck}
                  >
                    {props.formCheck.emailSend ? "재인증" : "인증"}
                  </SmallButton>
                </Wrapper>
                {props.formCheck.emailSend ? (
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px`}>
                    <TextInput2
                      width={`300px`}
                      type="text"
                      value={props.authNum}
                      {...props.register("authNum", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          props.setAuthNum(e.target.value);
                        },
                      })}
                    />
                    <SmallButton
                      kindOf={`default`}
                      margin={`0px 0px 0px 20px`}
                      type="button"
                      onClick={props.onAuthNumCheckHandler}
                    >
                      인증
                    </SmallButton>
                  </Wrapper>
                ) : null}
                {props.formCheck.authNumCheck ? (
                  <Text
                    width={`100%`}
                    color={`#1ccd8d`}
                    al={`flex-start`}
                    fontSize={`14px`}
                    textAlign={`left`}
                  >
                    이메일 인증이 완료되었습니다.
                  </Text>
                ) : null}
                <Wrapper>
                  {props.errors.email?.type === "required" && (
                    <Text
                      margin={`0px 0px 10px 0px`}
                      width={`100%`}
                      color={`#d6263b`}
                      al={`flex-start`}
                      fontSize={`14px`}
                      textAlign={`left`}
                    >
                      필수 입력사항입니다.
                    </Text>
                  )}
                  {props.errors.email?.type === "pattern" && (
                    <Text
                      margin={`0px 0px 10px 0px`}
                      width={`100%`}
                      color={`#d6263b`}
                      al={`flex-start`}
                      fontSize={`14px`}
                      textAlign={`left`}
                    >
                      형식에 맞게 입력하세요.
                    </Text>
                  )}
                  {(props.errors.email?.type === "emailExist" ||
                    props.errors.email?.type === "emailNull" ||
                    props.errors.email?.type === "emailAuthNeed") && (
                    <Text
                      margin={`0px 0px 10px 0px`}
                      width={`100%`}
                      color={`#d6263b`}
                      al={`flex-start`}
                      fontSize={`14px`}
                      textAlign={`left`}
                    >
                      {props.errors.email.message}
                    </Text>
                  )}
                </Wrapper>
              </Wrapper>
            </Wrapper>
            {/* 비밀번호 */}
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>*비밀번호</Text>
              <TextInput2
                width={`400px`}
                margin={`0px 0px 10px`}
                type="password"
                value={props.inputUser.password}
                placeholder="로그인 시 사용할 비밀번호를 입력해주세요."
                {...props.register("password", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputUserHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                  pattern: {
                    value: formRegEx.PASSWORD,
                    message: "8~16자 영문, 숫자, 특수문자를 사용하세요.",
                  },
                })}
              />
              {(props.errors.password?.type === "required" ||
                props.errors.password?.type === "pattern") && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.password.message}
                </Text>
              )}
            </Wrapper>
            {/* 비밀번호확인 */}
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>*비밀번호 확인</Text>
              <TextInput2
                width={`400px`}
                margin={`0px 0px 10px`}
                type="password"
                value={props.inputForm.passwordCheck}
                placeholder="비밀번호 확인을 위해 다시 입력해주세요."
                {...props.register("passwordCheck", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputFormHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                  validate: (value: string) =>
                    value === props.watch("password"),
                })}
              />
              {props.errors.passwordCheck?.type === "required" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.passwordCheck.message}
                </Text>
              )}
              {props.errors.passwordCheck?.type === "validate" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  비밀번호가 일치하지 않습니다.
                </Text>
              )}
              {props.watch("passwordCheck", "") !== "" &&
                props.errors.passwordCheck?.type !== "validate" && (
                  <Text
                    margin={`0px 0px 10px 0px`}
                    width={`100%`}
                    color={`#1ccd8d`}
                    al={`flex-start`}
                    fontSize={`14px`}
                    textAlign={`left`}
                  >
                    비밀번호가 일치합니다.
                  </Text>
                )}
            </Wrapper>
            {/* 이름 */}
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>*이름</Text>
              <TextInput2
                width={`400px`}
                margin={`0px 0px 10px`}
                type="text"
                value={props.inputUser.name}
                placeholder="성명을 입력해주세요."
                {...props.register("name", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputUserHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                })}
              />
              {props.errors.name?.type === "required" && (
                <Text
                  margin={`0px 0px 10px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.name.message}
                </Text>
              )}
            </Wrapper>
            {/* 휴대폰번호 */}
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>*휴대폰번호</Text>
              <TextInput2
                width={`400px`}
                margin={`0px 0px 10px`}
                type="text"
                value={props.inputUser.hpNumber}
                placeholder="(- 제외)"
                {...props.register("hpNumber", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputUserHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                  pattern: {
                    value: formRegEx.HP_NUM,
                    message: "형식에 맞게 입력하세요.",
                  },
                })}
              />
              {(props.errors.hpNumber?.type === "required" ||
                props.errors.hpNumber?.type === "pattern") && (
                <Text
                  margin={`0px 0px 10px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.hpNumber.message}
                </Text>
              )}
            </Wrapper>
            {/* 자택주소 */}
            <Wrapper al={`flex-start`}>
              <Text margin={`0px 0px 10px`}>자택주소(선택)</Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px`}>
                <TextInput2
                  width={`300px`}
                  type="text"
                  placeholder="주소를 입력해주세요."
                  value={props.inputUser.address1}
                  readOnly
                  {...props.register("address1")}
                />
                <SmallButton
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    props.setModalOpen(!props.modalOpen);
                    props.setModalOption("address");
                  }}
                >
                  주소 검색
                </SmallButton>
              </Wrapper>
              <TextInput2
                width={`400px`}
                margin={`0px 0px 10px`}
                type="text"
                placeholder="상세 주소"
                value={props.inputUser.address2}
                readOnly={props.inputUser.address1 ? false : true}
                {...props.register("address2", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputUserHandler(e);
                  },
                })}
              />
            </Wrapper>
            {/* 입사일자 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 30px`}>
              <Text margin={`0px 0px 10px`}>입사일자(선택)</Text>
              <TextInput2
                width={`400px`}
                margin={`0px 0px 10px`}
                type="date"
                // value={inputUser.joinDate}
                {...props.register("joinDate", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputUserHandler(e);
                  },
                })}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper padding={`40px 0px 0px`}>
            <CommonButton
              kindOf={`white`}
              margin={`0px 0px 10px 0px`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                props.setStepNumber(props.stepNumber - 1);
                dispatch({
                  type: actionTypesUser.INPUT_ACCOUNT,
                  payload: props.inputUser,
                });
                dispatch({
                  type: actionTypesUser.INPUT_FORM,
                  payload: props.inputForm,
                });
              }}
            >
              이전
            </CommonButton>
            <CommonButton margin={`10px 0px 0px 0px`} type="submit">
              {props.userAuth === props.UserAuthority.OWNER ? "다음" : "완료"}
            </CommonButton>
          </Wrapper>
        </form>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default SignAccountPresenter;
