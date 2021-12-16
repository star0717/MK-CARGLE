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
} from "../../../styles/CommonComponents";

/**
 * 회원가입: 계정정보 컴포넌트(화면)
 * @param props
 * @returns
 */
const SignAccountPresenter: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // 필요한 props 재정의
  const handleSubmit = props.handleSubmit;
  const onSignUpUserHandler = props.onSignUpUserHandler;
  const register = props.register;
  const watch = props.watch;
  const errors = props.errors;
  const inputForm = props.inputForm;
  const formCheck = props.formCheck;
  const inputUser = props.inputUser;
  const setInputUser = props.setInputUser;
  const setModalOption = props.setModalOption;
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const onInputFormHandler = props.onInputFormHandler;
  const onInputUserHandler = props.onInputUserHandler;
  const onEmailSendHandler = props.onEmailSendHandler;
  const authNum = props.authNum;
  const setAuthNum = props.setAuthNum;
  const onAuthNumCheckHandler = props.onAuthNumCheckHandler;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const userAuth = props.userAuth;
  const UserAuthority = props.UserAuthority;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <form onSubmit={handleSubmit(onSignUpUserHandler)}>
        <Wrapper
          width={`auto`}
          padding={`50px`}
          border={`1px solid #ccc`}
          radius={`5px`}
        >
          {/* 소속 업체(직원일 경우에만) */}
          {userAuth === "worker" && (
            <Wrapper margin={`0px 0px 10px`}>
              <Wrapper al={`flex-start`}>
                <Text margin={`0px 0px 10px`}>*소속 업체</Text>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <TextInput2
                    width={`300px`}
                    type="text"
                    value={inputForm.companyNum}
                    placeholder="업체명 또는 사업자번호로 검색"
                    readOnly
                    {...register("companyNum", {
                      required: {
                        value: true,
                        message: "필수 입력사항입니다.",
                      },
                    })}
                  />
                  <SmallButton
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      setModalOption("company");
                      setModalOpen(!modalOpen);
                    }}
                    kindOf={`default`}
                    margin={`0px 0px 0px 20px`}
                  >
                    검색
                  </SmallButton>
                </Wrapper>
              </Wrapper>
              {errors.companyNum?.type === "required" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.companyNum.message}
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
                  value={inputUser.email}
                  placeholder="이메일을 입력해주세요."
                  {...register("email", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputUserHandler(e);
                    },
                    required: true,
                    pattern: formRegEx.EMAIL,
                  })}
                />
                <SmallButton
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  type="button"
                  onClick={onEmailSendHandler}
                  disabled={formCheck.authNumCheck}
                >
                  {formCheck.emailSend ? "재인증" : "인증"}
                </SmallButton>
              </Wrapper>
              {formCheck.emailSend ? (
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 10px`}>
                  <TextInput2
                    width={`300px`}
                    type="text"
                    value={authNum}
                    {...register("authNum", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setAuthNum(e.target.value);
                      },
                    })}
                  />
                  <SmallButton
                    kindOf={`default`}
                    margin={`0px 0px 0px 20px`}
                    type="button"
                    onClick={onAuthNumCheckHandler}
                  >
                    인증
                  </SmallButton>
                </Wrapper>
              ) : null}
              {formCheck.authNumCheck ? (
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
                {errors.email?.type === "required" && (
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
                {errors.email?.type === "pattern" && (
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
                {(errors.email?.type === "emailExist" ||
                  errors.email?.type === "emailNull" ||
                  errors.email?.type === "emailAuthNeed") && (
                  <Text
                    margin={`0px 0px 10px 0px`}
                    width={`100%`}
                    color={`#d6263b`}
                    al={`flex-start`}
                    fontSize={`14px`}
                    textAlign={`left`}
                  >
                    {errors.email.message}
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
              value={inputUser.password}
              placeholder="로그인 시 사용할 비밀번호를 입력해주세요."
              {...register("password", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputUserHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.PASSWORD,
                  message: "8~16자 영문, 숫자, 특수문자를 사용하세요.",
                },
              })}
            />
            {(errors.password?.type === "required" ||
              errors.password?.type === "pattern") && (
              <Text
                margin={`0px 0px 10px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {errors.password.message}
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
              value={inputForm.passwordCheck}
              placeholder="비밀번호 확인을 위해 다시 입력해주세요."
              {...register("passwordCheck", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputFormHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                validate: (value: string) => value === watch("password"),
              })}
            />
            {errors.passwordCheck?.type === "required" && (
              <Text
                margin={`0px 0px 10px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {errors.passwordCheck.message}
              </Text>
            )}
            {errors.passwordCheck?.type === "validate" && (
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
            {watch("passwordCheck", "") !== "" &&
              errors.passwordCheck?.type !== "validate" && (
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
              value={inputUser.name}
              placeholder="성명을 입력해주세요."
              {...register("name", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputUserHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
              })}
            />
            {errors.name?.type === "required" && (
              <Text
                margin={`0px 0px 10px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {errors.name.message}
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
              value={inputUser.hpNumber}
              placeholder="(- 제외)"
              {...register("hpNumber", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputUserHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.HP_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.hpNumber?.type === "required" ||
              errors.hpNumber?.type === "pattern") && (
              <Text
                margin={`0px 0px 10px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                {errors.hpNumber.message}
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
                value={inputUser.address1}
                readOnly
                {...register("address1")}
              />
              <SmallButton
                kindOf={`default`}
                margin={`0px 0px 0px 20px`}
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setModalOpen(!modalOpen);
                  setModalOption("address");
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
              value={inputUser.address2}
              readOnly={inputUser.address1 ? false : true}
              {...register("address2", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputUserHandler(e);
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
              {...register("joinDate", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputUserHandler(e);
                },
              })}
            />
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`50px 0px 100px 0px`}>
          <CommonButton
            kindOf={`white`}
            margin={`0px 0px 10px 0px`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setStepNumber(stepNumber - 1);
              dispatch({
                type: actionTypesUser.INPUT_ACCOUNT,
                payload: inputUser,
              });
              dispatch({
                type: actionTypesUser.INPUT_FORM,
                payload: inputForm,
              });
            }}
          >
            이전
          </CommonButton>
          <CommonButton margin={`10px 0px 0px 0px`} type="submit">
            {userAuth === UserAuthority.OWNER ? "다음" : "완료"}
          </CommonButton>
        </Wrapper>
      </form>
    </WholeWrapper>
  );
};

export default SignAccountPresenter;
