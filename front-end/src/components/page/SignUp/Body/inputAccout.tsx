import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { useInterval } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootStateInterface } from "../../../../../store/interfaces/RootState";
import { actionTypesUser, UserState } from "../../../../../store/interfaces";
import { CHAR_DEL, formRegEx } from "../../../../validation/regEx";
import {
  authNumCheckAction,
  emailSendAction,
  signUpUserAction,
} from "../../../../../store/action/user.action";
import { SignUpInfo } from "../../../../models/auth.entity";

import DaumPostcode from "react-daum-postcode";
import CompanyFindModal from "./companyfindmodal";
import { UserAuthority } from "../../../../models/user.entity";
import { initialState } from "../../../../../store/reducer/user.reducer";

// modal setting
Modal.setAppElement("body");

const InputAccount: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const user = props.user;
  const formInput = props.formInput;
  const formCheck = props.formCheck;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const userAuth = props.userAuth;

  // // redux store에서 user, company 정보 가져옴
  // const { user, formInput, formCheck } = useSelector(
  //   (state: RootStateInterface): UserState => state.userAll
  // );

  const [inputUser, setInputUser] = useState(user); // 사용자 정보
  const [inputForm, setInputForm] = useState(formInput); // 폼에만 있는 인풋(ex. 이메일 도메인)
  const [timer, setTimer] = useState(0); // 인증번호 유효시간 타이머
  const [authNum, setAuthNum] = useState(""); // 인증번호 input
  const [modalOpen, setModalOpen] = useState(false); // 모달창 open 여부
  const [modalOption, setModalOption] = useState("");
  // const [companyNum, setCompanyNum] = useState(""); // 사업자번호 input

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // 사업자 검색 MODAL에 넘길 props
  const ComfindModalProps = {
    setModalOpen,
    setModalOption,
    inputForm,
    setInputForm,
    setInputUser,
    inputUser,
    setValue,
    style: { height: "500px" },
  };

  // modal 창 닫기 기능
  const closeModal = () => {
    setModalOpen(false);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  // 회원가입 - input 값 입력 시 텍스트 변환을 위한 handler
  // 사용자 정보
  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };
  // 그 외 form 정보
  const onInputFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  // 이메일 종류에 따라 state를 통해 값 변경 및 readonly 변경
  const onEmailKindHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: actionTypesUser.FORM_CHECK,
      payload: {
        ...formCheck,
        emailReadOnly: e.target.value === "" ? false : true,
      },
    });
    setInputForm({ ...inputForm, emailDomain: e.target.value });
    setValue("emailDomain", e.target.value, { shouldValidate: true });
  };

  // 이메일 인증번호 전송 handler
  const onEmailSendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = `${inputForm.emailAddress}@${inputForm.emailDomain}`;
    if (formRegEx.EMAIL.test(email)) {
      dispatch(emailSendAction(email)).then((res: any) => {
        if (res.payload) {
          alert("인증번호가 전송되었습니다.");
          dispatch({
            type: actionTypesUser.FORM_CHECK,
            payload: { ...formCheck, emailSend: true },
          });
          setTimer(300);
        } else {
          setError("emailAddress", {
            type: "emailExist",
            message: "이미 등록된 이메일입니다.",
          });
        }
      });
    } else {
      setError("emailAddress", {
        type: "emailNull",
        message: "형식에 맞게 입력하세요.",
      });
    }
  };

  // 인증번호 타이머
  useInterval(
    () => {
      setTimer(timer - 1);
    },
    formCheck.emailSend ? 1000 : null
  );

  // 인증번호 만료 시 emailSend state 변경
  useEffect(() => {
    if (timer === 0) {
      if (
        !Cookies.get("mk_amtn") &&
        formCheck.emailSend &&
        !formCheck.authNumCheck
      ) {
        alert("인증번호가 만료되었습니다.");
        setAuthNum("");
        dispatch({
          type: actionTypesUser.FORM_CHECK,
          payload: { ...formCheck, emailSend: false },
        });
      }
    }
  }, [timer, formCheck]);

  // 인증번호 검사 handler
  const onAuthNumCheckHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (authNum) {
      dispatch(authNumCheckAction(authNum)).then((res: any) => {
        if (res.payload) {
          alert("인증되었습니다.");
          setTimer(0);
          dispatch({
            type: actionTypesUser.FORM_CHECK,
            payload: { ...formCheck, authNumCheck: true, emailSend: false },
          });
          setAuthNum("");
          Cookies.remove("mk_amtn");
        } else {
          alert("인증번호가 일치하지 않습니다.");
          setAuthNum("");
        }
      });
    }
  };

  // 주소 검색 api handler
  const addressHandler = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setInputForm({ ...inputForm, uAddressMain: fullAddress });
    setValue("uAddressMain", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  // 직원(worker) 회원가입 form submit handler
  const onSignUpUserHandler: SubmitHandler<SignUpInfo> = (data) => {
    if (!formCheck.authNumCheck) {
      alert("이메일 인증을 해주세요.");
    } else {
      if (userAuth === UserAuthority.OWNER) {
        dispatch({ type: actionTypesUser.INPUT_FORM, payload: inputForm });
        dispatch({ type: actionTypesUser.INPUT_ACCOUNT, payload: inputUser });
        setStepNumber(stepNumber + 1);
      } else {
        dispatch(
          signUpUserAction({
            user: {
              ...inputUser,
              email: `${inputForm.emailAddress}@${inputForm.emailDomain}`,
              address:
                inputForm.uAddressMain && inputForm.uAddressDetail !== ""
                  ? `${inputForm.uAddressMain}, ${inputForm.uAddressDetail}`
                  : inputForm.uAddressMain,
              joinDate: inputUser.joinDate && inputUser.joinDate,
            },
          })
        ).then(
          (res: any) => {
            setStepNumber(stepNumber + 1);
          },
          (err) => {
            if (err.response.status === 400) {
              alert("회원가입에 실패했습니다.");
              dispatch({
                type: actionTypesUser.FORM_CHECK,
                payload: initialState.formCheck,
              });
            }
          }
        );
        setStepNumber(stepNumber + 1);
      }
    }
  };

  console.log("@@인풋 : ", inputForm);
  console.log("@@유저 : ", inputUser);
  console.log("##인풋스테이트 : ", formInput);
  console.log("##유저스테이트 : ", user);
  console.log("^^^폼체크 : ", formCheck);

  return (
    <div
      style={{
        width: "95%",
        height: "650px",
        backgroundColor: "mintcream",
        margin: "10px",
      }}
    >
      <form onSubmit={handleSubmit(onSignUpUserHandler)}>
        {/* 소속 업체(직원일 경우에만) */}
        {userAuth === "worker" && (
          <div>
            <div>
              <div>*소속 업체</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{ width: "85%" }}
                  type="text"
                  value={formInput.companyNum}
                  placeholder="업체명 또는 사업자번호로 검색"
                  readOnly
                  {...register("companyNum", {
                    required: { value: true, message: "필수 입력사항입니다." },
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
      <div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 1020,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(255, 255, 255, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "45rem",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              inset: 0,
            },
          }}
        >
          {modalOption === "address" ? (
            <DaumPostcode
              onComplete={addressHandler}
              style={{ height: "500px" }}
            />
          ) : (
            <CompanyFindModal {...ComfindModalProps} />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default InputAccount;
