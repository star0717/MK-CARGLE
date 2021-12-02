import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper, Wrapper, Text } from "../../../styles/CommonComponents";
import React from "react";
import DatePicker from "react-datepicker";
import { CHAR_DEL, formRegEx } from "../../../../validation/regEx";

const AccountPresenter: NextPage<any> = (props) => {
  // 필요한 props 재정의
  const handleSubmit = props.handleSubmit;
  const onSignUpUserHandler = props.onSignUpUserHandler;
  const register = props.register;
  const watch = props.watch;
  const errors = props.errors;
  const inputForm = props.inputForm;
  const formInput = props.formInput;
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
            <div>
              <div>
                <div>*소속 업체</div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    style={{ width: "85%" }}
                    type="text"
                    value={formInput.companyNum}
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
                    onClick={(e) => {
                      setModalOption("company");
                      setModalOpen(!modalOpen);
                    }}
                  >
                    검색
                  </button>
                </div>
              </div>
              {errors.companyNum?.type === "required" && (
                <p
                  style={{
                    margin: "0",
                    fontSize: "8px",
                    color: "red",
                  }}
                >
                  {errors.companyNum.message}
                </p>
              )}
            </div>
          )}
          {/* 아이디(이메일) */}
          <div>
            <div>
              <div>*아이디(이메일 형식으로 입력해주세요.)</div>
              <div
                style={{
                  backgroundColor: "skyblue",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ backgroundColor: "cyan" }}>
                  <input
                    type="text"
                    value={inputForm.emailAddress}
                    readOnly={formCheck.authNumCheck}
                    placeholder="이메일을 입력해주세요."
                    {...register("emailAddress", {
                      onChange: (e) => {
                        onInputFormHandler(e);
                      },
                      required: true,
                      pattern: formRegEx.EMAIL_ADDRESS,
                    })}
                  />
                </div>
                <div style={{ backgroundColor: "yellowgreen" }}>@</div>
                <div style={{ backgroundColor: "greenyellow" }}>
                  <input
                    type="text"
                    value={inputForm.emailDomain}
                    placeholder="주소 선택"
                    readOnly={formCheck.emailReadOnly || formCheck.authNumCheck}
                    {...register("emailDomain", {
                      onChange: (e) => {
                        onInputFormHandler(e);
                      },
                      required: true,
                      pattern: formRegEx.EMAIL_DOMAIN,
                    })}
                  />
                </div>
                <div style={{ padding: "1px 2px" }}>
                  <select
                    disabled={formCheck.authNumCheck}
                    value={inputForm.emailDomain}
                    {...register("emailSelect", {
                      onChange: (e) => {
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
                </div>
                <div style={{ padding: "1px 2px" }}>
                  <button
                    type="button"
                    onClick={onEmailSendHandler}
                    disabled={formCheck.authNumCheck}
                  >
                    {formCheck.emailSend ? "인증번호 재전송" : "인증번호 전송"}
                  </button>
                </div>
              </div>
              {formCheck.emailSend ? (
                <div style={{ display: "flex" }}>
                  <div>
                    <input
                      type="text"
                      value={authNum}
                      {...register("authNum", {
                        onChange: (e) => {
                          setAuthNum(e.target.value);
                        },
                      })}
                    />
                  </div>
                  <div>
                    <button type="button" onClick={onAuthNumCheckHandler}>
                      인증
                    </button>
                  </div>
                </div>
              ) : null}
              {formCheck.authNumCheck ? (
                <p
                  style={{
                    margin: "0",
                    fontSize: "8px",
                    color: "green",
                  }}
                >
                  이메일 인증이 완료되었습니다.
                </p>
              ) : null}
              <div>
                {(errors.emailAddress?.type === "required" ||
                  errors.emailDomain?.type === "required") && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "red",
                    }}
                  >
                    필수 입력사항입니다.
                  </p>
                )}
                {(errors.emailAddress?.type === "pattern" ||
                  errors.emailDomain?.type === "pattern") && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "red",
                    }}
                  >
                    형식에 맞게 입력하세요.
                  </p>
                )}
                {(errors.emailAddress?.type === "emailExist" ||
                  errors.emailAddress?.type === "emailNull" ||
                  errors.emailAddress?.type === "emailAuthNeed") && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "red",
                    }}
                  >
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* 비밀번호 */}
          <div>
            <div>*비밀번호</div>
            <div>
              <input
                style={{ width: "100%" }}
                type="password"
                value={inputUser.password}
                placeholder="로그인 시 사용할 비밀번호를 입력해주세요."
                {...register("password", {
                  onChange: (e) => {
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
                <p
                  style={{
                    margin: "0",
                    fontSize: "8px",
                    color: "red",
                  }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {/* 비밀번호확인 */}
          <div>
            <div>*비밀번호 확인</div>
            <div>
              <input
                style={{ width: "100%" }}
                type="password"
                value={inputForm.passwordCheck}
                placeholder="비밀번호 확인을 위해 다시 입력해주세요."
                {...register("passwordCheck", {
                  onChange: (e) => {
                    onInputFormHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                  validate: (value) => value === watch("password"),
                })}
              />
              {errors.passwordCheck?.type === "required" && (
                <p
                  style={{
                    margin: "0",
                    fontSize: "8px",
                    color: "red",
                  }}
                >
                  {errors.passwordCheck.message}
                </p>
              )}
              {errors.passwordCheck?.type === "validate" && (
                <p
                  style={{
                    margin: "0",
                    fontSize: "8px",
                    color: "red",
                  }}
                >
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
              {watch("passwordCheck", "") !== "" &&
                errors.passwordCheck?.type !== "validate" && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "green",
                    }}
                  >
                    비밀번호가 일치합니다.
                  </p>
                )}
            </div>
          </div>
          {/* 이름 */}
          <div>
            <div>*이름</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputUser.name}
              placeholder="성명을 입력해주세요."
              {...register("name", {
                onChange: (e) => {
                  onInputUserHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
              })}
            />
            {errors.name?.type === "required" && (
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                {errors.name.message}
              </p>
            )}
          </div>
          {/* 휴대폰번호 */}
          <div>
            <div>*휴대폰번호</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={CHAR_DEL(inputUser.hpNumber)}
              placeholder="(- 제외)"
              {...register("hpNumber", {
                onChange: (e) => {
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
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                {errors.hpNumber.message}
              </p>
            )}
          </div>
          {/* 자택주소 */}
          <div>
            <div>자택주소(선택)</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "80%" }}>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="주소를 입력해주세요."
                  value={inputForm.uAddressMain}
                  readOnly
                  {...register("uAddressMain")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    setModalOpen(!modalOpen);
                    setModalOption("address");
                  }}
                >
                  주소 검색
                </button>
              </div>
            </div>
            <div>
              <input
                style={{ width: "100%" }}
                type="text"
                placeholder="상세 주소"
                value={inputForm.uAddressDetail}
                readOnly={inputForm.uAddressMain ? false : true}
                {...register("uAddressDetail", {
                  onChange: (e) => {
                    onInputFormHandler(e);
                  },
                })}
              />
            </div>
          </div>
          {/* 입사일자 */}
          <div>
            <div>입사일자(선택)</div>
            <div>
              <DatePicker
                selected={inputUser.joinDate}
                onChange={(date: any) =>
                  setInputUser({ ...inputUser, joinDate: date })
                }
                placeholderText="YYYY-MM-DD"
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
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
          </div>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AccountPresenter;
