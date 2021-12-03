import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React from "react";
import DatePicker from "react-datepicker";
import { CHAR_DEL, formRegEx } from "../../../../validation/regEx";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
} from "../../../styles/CommonComponents";

const AccountPresenter: NextPage<any> = (props) => {
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
  const onEmailKindHandler = props.onEmailKindHandler;
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
      <Wrapper>
        <form onSubmit={handleSubmit(onSignUpUserHandler)}>
          {/* 소속 업체(직원일 경우에만) */}
          {userAuth === "worker" && (
            <Wrapper>
              <Wrapper>
                <Text>*소속 업체</Text>
                <TextInput
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
                <button
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setModalOption("company");
                    setModalOpen(!modalOpen);
                  }}
                >
                  검색
                </button>
              </Wrapper>
              {errors.companyNum?.type === "required" && (
                <Text>{errors.companyNum.message}</Text>
              )}
            </Wrapper>
          )}
          {/* 아이디(이메일) */}
          <Wrapper>
            <Wrapper>
              <Text>*아이디(이메일 형식으로 입력해주세요.)</Text>
              <Wrapper>
                <TextInput
                  type="text"
                  value={inputForm.emailAddress}
                  readOnly={formCheck.authNumCheck}
                  placeholder="이메일을 입력해주세요."
                  {...register("emailAddress", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputFormHandler(e);
                    },
                    required: true,
                    pattern: formRegEx.EMAIL_ADDRESS,
                  })}
                />
                <Text>@</Text>
                <TextInput
                  type="text"
                  value={inputForm.emailDomain}
                  placeholder="주소 선택"
                  readOnly={formCheck.emailReadOnly || formCheck.authNumCheck}
                  {...register("emailDomain", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputFormHandler(e);
                    },
                    required: true,
                    pattern: formRegEx.EMAIL_DOMAIN,
                  })}
                />
                <select
                  disabled={formCheck.authNumCheck}
                  value={inputForm.emailDomain}
                  {...register("emailSelect", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onEmailKindHandler(e);
                    },
                  })}
                >
                  {props.emailItem.map((item: any, index: Number) => (
                    <option key={item.key} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={onEmailSendHandler}
                  disabled={formCheck.authNumCheck}
                >
                  {formCheck.emailSend ? "인증번호 재전송" : "인증번호 전송"}
                </button>
              </Wrapper>
              {formCheck.emailSend ? (
                <Wrapper>
                  <TextInput
                    type="text"
                    value={authNum}
                    {...register("authNum", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setAuthNum(e.target.value);
                      },
                    })}
                  />
                  <button type="button" onClick={onAuthNumCheckHandler}>
                    인증
                  </button>
                </Wrapper>
              ) : null}
              {formCheck.authNumCheck ? (
                <Text>이메일 인증이 완료되었습니다.</Text>
              ) : null}
              <Wrapper>
                {(errors.emailAddress?.type === "required" ||
                  errors.emailDomain?.type === "required") && (
                  <Text>필수 입력사항입니다.</Text>
                )}
                {(errors.emailAddress?.type === "pattern" ||
                  errors.emailDomain?.type === "pattern") && (
                  <Text>형식에 맞게 입력하세요.</Text>
                )}
                {(errors.emailAddress?.type === "emailExist" ||
                  errors.emailAddress?.type === "emailNull" ||
                  errors.emailAddress?.type === "emailAuthNeed") && (
                  <Text>{errors.emailAddress.message}</Text>
                )}
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {/* 비밀번호 */}
          <Wrapper>
            <Text>*비밀번호</Text>
            <TextInput
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
              <Text>{errors.password.message}</Text>
            )}
          </Wrapper>
          {/* 비밀번호확인 */}
          <Wrapper>
            <Text>*비밀번호 확인</Text>
            <TextInput
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
              <Text>{errors.passwordCheck.message}</Text>
            )}
            {errors.passwordCheck?.type === "validate" && (
              <Text>비밀번호가 일치하지 않습니다.</Text>
            )}
            {watch("passwordCheck", "") !== "" &&
              errors.passwordCheck?.type !== "validate" && (
                <Text>비밀번호가 일치합니다.</Text>
              )}
          </Wrapper>
          {/* 이름 */}
          <Wrapper>
            <Text>*이름</Text>
            <TextInput
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
              <Text>{errors.name.message}</Text>
            )}
          </Wrapper>
          {/* 휴대폰번호 */}
          <Wrapper>
            <Text>*휴대폰번호</Text>
            <TextInput
              type="text"
              value={CHAR_DEL(inputUser.hpNumber)}
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
              <Text>{errors.hpNumber.message}</Text>
            )}
          </Wrapper>
          {/* 자택주소 */}
          <Wrapper>
            <Text>자택주소(선택)</Text>
            <Wrapper>
              <TextInput
                type="text"
                placeholder="주소를 입력해주세요."
                value={inputForm.uAddressMain}
                readOnly
                {...register("uAddressMain")}
              />
              <button
                type="button"
                onClick={(e) => {
                  setModalOpen(!modalOpen);
                  setModalOption("address");
                }}
              >
                주소 검색
              </button>
            </Wrapper>
            <TextInput
              type="text"
              placeholder="상세 주소"
              value={inputForm.uAddressDetail}
              readOnly={inputForm.uAddressMain ? false : true}
              {...register("uAddressDetail", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputFormHandler(e);
                },
              })}
            />
          </Wrapper>
          {/* 입사일자 */}
          <Wrapper>
            <Text>입사일자(선택)</Text>
            <DatePicker
              selected={inputUser.joinDate}
              onChange={(date: any) =>
                setInputUser({ ...inputUser, joinDate: date })
              }
              placeholderText="YYYY-MM-DD"
            />
          </Wrapper>
          <Wrapper>
            <button
              onClick={(e) => {
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
            </button>
            <button type="submit">
              {userAuth === UserAuthority.OWNER ? "다음" : "완료"}
            </button>
          </Wrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountPresenter;
