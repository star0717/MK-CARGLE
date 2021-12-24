import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { useInterval } from "react-use";
import { useDispatch } from "react-redux";
import { actionTypesUser, FormInput } from "../../../../../store/interfaces";
import { CHAR_DEL, formRegEx } from "../../../../validation/regEx";
import {
  authNumCheckAction,
  emailSendAction,
  signUpUserAction,
} from "../../../../../store/action/user.action";
import { SignUpInfo } from "../../../../models/auth.entity";
import DaumPostcode from "react-daum-postcode";
import CompanyFindModal from "./comFindModal";
import { User, UserAuthority } from "../../../../models/user.entity";
import {
  CloseButton,
  WholeWrapper,
  Wrapper,
  Text,
  TextInput2,
  SmallButton,
  CommonButton,
  RsWrapper,
} from "../../../styles/CommonComponents";
import { IoIosCloseCircle } from "react-icons/io";
import {
  _cComFindModalProps,
  _cSignUpProps,
} from "../../../../configure/_cProps.entity";
import { _pSignAccountProps } from "../../../../configure/_pProps.entity";
import { AxiosError } from "axios";
import { DbErrorInfo } from "../../../../models/base.entity";
import { useResizeDetector } from "react-resize-detector";

// modal setting
Modal.setAppElement("body");

/**
 * 회원가입: 계정정보 컴포넌트(기능)
 * @param props
 * @returns
 */
const SignAccount: NextPage<_cSignUpProps> = (props) => {
  const dispatch = useDispatch();

  // state 관리
  const [inputUser, setInputUser] = useState<User>(props.user); // 사용자 정보
  const [inputForm, setInputForm] = useState<FormInput>(props.formInput); // 폼에만 있는 인풋(ex. 이메일 도메인)
  const [timer, setTimer] = useState<number>(0); // 인증번호 유효시간 타이머
  const [authNum, setAuthNum] = useState<string>(""); // 인증번호 input
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달창 open 여부
  const [modalOption, setModalOption] = useState<string>("");

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * 인풋 텍스트 변환 handler
   * @param e
   */
  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "hpNumber") {
      e.target.value = CHAR_DEL(e.target.value);
    }
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };
  /**
   * 그 외 form 정보
   * @param e
   */
  const onInputFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  /**
   * 이메일 인증번호 전송 handler
   * @param e
   */
  const onEmailSendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (formRegEx.EMAIL.test(inputUser.email)) {
      dispatch(emailSendAction(inputUser.email)).then((res: any) => {
        if (res.payload) {
          alert("인증번호가 전송되었습니다.");
          dispatch({
            type: actionTypesUser.FORM_CHECK,
            payload: { ...props.formCheck, emailSend: true },
          });
          clearErrors("email");
          setTimer(300);
        } else {
          setError("email", {
            type: "emailExist",
            message: "이미 등록된 이메일입니다.",
          });
        }
      });
    } else {
      setError("email", {
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
    props.formCheck.emailSend ? 1000 : null
  );

  // 인증번호 만료 시 emailSend state 변경
  useEffect(() => {
    if (timer === 0) {
      if (
        !Cookies.get("mk_amtn") &&
        props.formCheck.emailSend &&
        !props.formCheck.authNumCheck
      ) {
        alert("인증번호가 만료되었습니다.");
        setAuthNum("");
        dispatch({
          type: actionTypesUser.FORM_CHECK,
          payload: { ...props.formCheck, emailSend: false },
        });
      }
    }
  }, [timer, props.formCheck]);

  /**
   * 인증번호 검사 handler
   * @param e
   */
  const onAuthNumCheckHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (authNum) {
      dispatch(authNumCheckAction(authNum)).then((res: any) => {
        if (res.payload) {
          alert("인증되었습니다.");
          setTimer(0);
          dispatch({
            type: actionTypesUser.FORM_CHECK,
            payload: {
              ...props.formCheck,
              authNumCheck: true,
              emailReadOnly: true,
              emailSend: false,
            },
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

  /**
   * 주소 검색 api handler
   * @param data
   */
  const addressHandler = (data: any) => {
    let fullAddress = data.address;
    let zonecode = data.zonecode;
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

    setInputUser({ ...inputUser, address1: fullAddress, postcode: zonecode });
    setValue("address1", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  /**
   * 직원(worker) 회원가입 form submit handler
   * @param data
   */
  const onSignUpUserHandler: SubmitHandler<SignUpInfo> = (data) => {
    console.log("로그인하자");
    if (!props.formCheck.authNumCheck) {
      alert("이메일 인증을 해주세요.");
    } else {
      if (props.userAuth === UserAuthority.OWNER) {
        dispatch({ type: actionTypesUser.INPUT_FORM, payload: inputForm });
        dispatch({ type: actionTypesUser.INPUT_ACCOUNT, payload: inputUser });
        props.setStepNumber(props.stepNumber + 1);
      } else {
        dispatch(
          signUpUserAction({
            user: inputUser,
          })
        )
          .then((res: any) => {
            props.setStepNumber(props.stepNumber + 1);
          })
          .catch((err: AxiosError<any, any>) => {
            const errInfo: DbErrorInfo = err.response.data;
            switch (errInfo.key) {
              case "email":
                alert("이미 가입된 이메일입니다.");
                break;
              case "hpNumber":
                alert("이미 가입된 휴대폰 번호입니다.");
                break;
              default:
                alert("회원가입에 실패했습니다.");
                break;
            }
            dispatch({
              type: actionTypesUser.FORM_CHECK,
              payload: {
                ...props.formCheck,
                emailReadOnly: false,
                emailSend: false,
                authNumCheck: false,
                companyCheck: false,
              },
            });
          });
      }
    }
  };

  /**
   * 업체 조회 MODAL에 넘길 props
   */
  const ComfindModalProps: _cComFindModalProps = {
    setModalOpen,
    inputForm,
    setInputForm,
    setInputUser,
    inputUser,
    setValue,
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <>
      <WholeWrapper ref={ref}>
        <RsWrapper>
          <form onSubmit={handleSubmit(onSignUpUserHandler)}>
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
                      readOnly={props.formCheck.emailReadOnly}
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
                      disabled={props.formCheck.authNumCheck}
                    >
                      {props.formCheck.emailSend ? "재인증" : "인증"}
                    </SmallButton>
                  </Wrapper>
                  {props.formCheck.emailSend ? (
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      margin={`0px 0px 10px`}
                    >
                      <TextInput2
                        width={`300px`}
                        type="text"
                        value={authNum}
                        {...register("authNum", {
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
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
            <Wrapper padding={`40px 0px 0px`}>
              <CommonButton
                kindOf={`white`}
                margin={`0px 0px 10px 0px`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  props.setStepNumber(props.stepNumber - 1);
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
                {props.userAuth === props.UserAuthority.OWNER ? "다음" : "완료"}
              </CommonButton>
            </Wrapper>
          </form>
        </RsWrapper>
      </WholeWrapper>
      <Modal
        isOpen={modalOpen}
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
            height: "575px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "0.3rem",
            boxShadow: "0px 10px 15px rgba(220,220,220,1)",
            inset: 0,
          },
        }}
      >
        <Wrapper fontSize={`28px`} al={`flex-end`}>
          <CloseButton onClick={closeModal}>
            <IoIosCloseCircle />
          </CloseButton>
        </Wrapper>
        {modalOption === "address" ? (
          <DaumPostcode
            onComplete={addressHandler}
            style={{ height: "500px" }}
          />
        ) : (
          <CompanyFindModal {...ComfindModalProps} />
        )}
      </Modal>
    </>
  );
};

export default SignAccount;
