import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import DaumPostcode from "react-daum-postcode";
import { useInterval } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { RootStateInterface } from "../../../../../store/interfaces/RootState";
import { UserState } from "../../../../../store/interfaces";
import { SignUpInfo } from "../../../../models/auth.entity";
import { basicRegEx, CHAR_DEL, formRegEx } from "../../../../validation/regEx";
import {
  authNumCheckAction,
  companyCheckAction,
  companyFindAction,
  emailSendAction,
  signUpUserAction,
} from "../../../../../store/action/user.action";
import styled from "styled-components";

const Wrapper = styled.div`
  .test {
    background-color: lightblue;
    width: 100%;
  }
  .test2 {
    background-color: cyan;
    width: 100%;
  }
`;

// modal setting
Modal.setAppElement("body");

const InputCompany: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const userAuth = props.userAuth;

  // // redux store에서 user, company 정보 가져옴
  // const { user, company } = useSelector(
  //   (state: RootStateInterface): UserState => state.userAll
  // );

  // 회원가입용(사업주) user input 초기값 세팅
  const userInit = {
    email: "",
    password: "",
    hpNumber: "",
  };
  // 회원가입용(사업주) company input 초기값 세팅
  const comInit = {
    comRegNum: "",
    mbRegNum: "",
    mbTypeNum: "",
    name: "",
    ownerName: "",
    phoneNum: "",
    faxNum: "",
    address: "",
  };

  const [inputUser, setInputUser] = useState(userInit); // 사용자 정보
  const [inputCompany, setInputCompany] = useState(comInit); // 업체 정보

  const [emailAddress, setEmailAdderess] = useState(""); // 이메일 주소
  const [emailDomain, setEmailDomain] = useState(""); // 이메일 도메인
  const [emailReadOnly, setEmailReadOnly] = useState(false); // 이메일 input readonly
  const [emailSend, setEmailSend] = useState(false); // 이메일 인증 전송여부
  const [timer, setTimer] = useState(0); // 인증번호 유효시간 타이머
  const [authNumCheck, setAuthNumCheck] = useState(false); // 인증번호 체크여부
  const [authNum, setAuthNum] = useState(""); // 인증번호 input
  const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인
  const [companyCheck, setCompanyCheck] = useState(false); // 사업자번호 유효성 검사 여부
  const [addressMain, setAddressMain] = useState(""); // 주소(메인)
  const [addressDetail, setAddressDetail] = useState(""); // 주소(상세)
  const [modalOpen, setModalOpen] = useState(false); // 모달창 open 여부

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

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

  // 이메일 종류에 따라 state를 통해 값 변경 및 readonly 변경
  const onEmailKindHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "" ? setEmailReadOnly(false) : setEmailReadOnly(true); // 이메일 직접입력 외에는 readonly true
    setEmailDomain(e.target.value);
    setValue("emailDomain", e.target.value, { shouldValidate: true });
  };

  // 회원가입 - input 값 입력 시 텍스트 변환을 위한 handler
  // 사용자 정보
  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };
  // 업체 정보
  const onInputCompanyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCompany({ ...inputCompany, [e.target.name]: e.target.value });
  };

  // 이메일 인증번호 전송 handler
  const onEmailSendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = `${emailAddress}@${emailDomain}`;
    if (formRegEx.EMAIL.test(email)) {
      dispatch(emailSendAction(email)).then((res: any) => {
        if (res.payload) {
          alert("인증번호가 전송되었습니다.");
          setEmailSend(true);
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
    emailSend ? 1000 : null
  );

  // 인증번호 만료 시 emailSend state 변경
  useEffect(() => {
    if (timer === 0) {
      if (!Cookies.get("mk_amtn") && emailSend && !authNumCheck) {
        alert("인증번호가 만료되었습니다.");
        setAuthNum("");
        setEmailSend(false);
      }
    }
  }, [timer, authNumCheck, emailSend]);

  // 인증번호 검사 handler
  const onAuthNumCheckHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (authNum) {
      dispatch(authNumCheckAction(authNum)).then((res: any) => {
        if (res.payload) {
          alert("인증되었습니다.");
          setAuthNumCheck(true);
          setTimer(0);
          setEmailSend(false);
          setAuthNum("");
          Cookies.remove("mk_amtn");
        } else {
          alert("인증번호가 일치하지 않습니다.");
          setAuthNum("");
        }
      });
    }
  };

  // 사업자번호 유효성 검사 handler
  const onComRegNumCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputCompany.comRegNum) {
      dispatch(companyFindAction(inputCompany.comRegNum)).then(
        (res: any) => {
          if (res.payload.length === 0) {
            dispatch(companyCheckAction(inputCompany.comRegNum)).then(
              (res: any) => {
                if (res.payload) {
                  setError("comRegNum", {
                    type: "comCheckTrue",
                    message: "사업자등록번호 인증이 완료되었습니다.",
                  });
                  setCompanyCheck(true);
                } else {
                  setError("comRegNum", {
                    type: "comCheckFalse",
                    message: "유효하지 않은 사업자등록번호입니다.",
                  });
                }
              }
            );
          } else {
            setError("comRegNum", {
              type: "comExist",
              message: "이미 가입된 사업자등록번호입니다.",
            });
          }
        },
        (err) => {
          alert("사업자등록번호 인증에 실패했습니다.");
        }
      );
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

    setAddressMain(fullAddress);
    setValue("addressMain", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  // 사업자(owner) 회원가입 form submit handler
  const onSignUpCompanyHandler: SubmitHandler<SignUpInfo> = (data) => {
    if (!authNumCheck) {
      setError("emailAddress", {
        type: "emailAuthNeed",
        message: "이메일 인증이 필요합니다.",
      });
    }
    if (!companyCheck) {
      setError("comRegNum", {
        type: "comCheckNeed",
        message: "사업자 등록번호 인증이 필요합니다.",
      });
    }
    if (authNumCheck && companyCheck) {
      dispatch(
        signUpUserAction({
          user: {
            ...inputUser,
            name: inputCompany.ownerName,
            email: `${emailAddress}@${emailDomain}`,
            auth: userAuth,
          },
          company: {
            ...inputCompany,
            address:
              addressDetail !== ""
                ? `${addressMain}, ${addressDetail}`
                : addressMain,
          },
        })
      ).then(
        (res: any) => {
          setStepNumber(stepNumber + 1);
        },
        (err) => {
          if (err.response.status === 400) {
            alert("회원가입에 실패했습니다.");
            setAuthNumCheck(false);
            setCompanyCheck(false);
            setInputUser(userInit);
            setInputCompany(comInit);
            setEmailAdderess("");
            setEmailDomain("");
            setPasswordCheck("");
            setAddressMain("");
            setAddressDetail("");
          }
        }
      );
    }
  };

  return (
    <Wrapper>
      <div
        style={{
          width: "95%",
          height: "650px",
          backgroundColor: "mintcream",
          margin: "10px",
        }}
      >
        <form onSubmit={handleSubmit(onSignUpCompanyHandler)}>
          {/* 상호명 */}
          <div>
            <div>
              *상호명{" "}
              <small style={{ color: "red", fontSize: "8px" }}>
                (사업자등록증에 등록한 상호명을 입력해주세요.)
              </small>
            </div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputCompany.name}
              placeholder="상호명을 입력해주세요."
              {...register("name", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
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
          {/* 사업자등록번호 */}
          <div>
            <div>*사업자 등록번호</div>
            <div
              style={{
                backgroundColor: "skyblue",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "80%" }}>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={CHAR_DEL(inputCompany.comRegNum)}
                  readOnly={companyCheck}
                  placeholder="사업자 등록번호를 입력해주세요."
                  {...register("comRegNum", {
                    onChange: (e) => {
                      onInputCompanyHandler(e);
                    },
                    required: { value: true, message: "필수 입력사항입니다." },
                    pattern: {
                      value: formRegEx.COMPANY_NUM,
                      message: "형식에 맞게 입력하세요.",
                    },
                  })}
                />
                {(errors.comRegNum?.type === "required" ||
                  errors.comRegNum?.type === "pattern" ||
                  errors.comRegNum?.type === "comCheckFalse" ||
                  errors.comRegNum?.type === "comExist" ||
                  errors.comRegNum?.type === "comCheckNeed") && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "red",
                    }}
                  >
                    {errors.comRegNum.message}
                  </p>
                )}
                {errors.comRegNum?.type === "comCheckTrue" && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "green",
                    }}
                  >
                    {errors.comRegNum.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={onComRegNumCheck}
                  disabled={companyCheck}
                >
                  인증
                </button>
              </div>
            </div>
          </div>
          {/* 정비업등록번호 */}
          <div>
            <div>*정비업 등록번호</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={CHAR_DEL(inputCompany.mbRegNum)}
              placeholder="정비업 등록번호를 입력해주세요."
              {...register("mbRegNum", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.MB_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.mbRegNum?.type === "required" ||
              errors.mbRegNum?.type === "pattern") && (
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                {errors.mbRegNum.message}
              </p>
            )}
          </div>
          {/* 정비업종 */}
          <div>
            <div>*정비업종</div>
            <select
              style={{ width: "100%" }}
              {...register("mbTypeNum", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: true,
              })}
            >
              <option value="">정비업종 선택</option>
              <option value="1급">자동차종합정비업</option>
            </select>
            {errors.mbTypeNum?.type === "required" && (
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                필수 선택사항입니다.
              </p>
            )}
          </div>
          {/* 대표자명 */}
          <div>
            <div>*대표자명</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputCompany.ownerName}
              placeholder="대표자명을 입력해주세요."
              {...register("ownerName", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
              })}
            />
            {errors.ownerName?.type === "required" && (
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                {errors.ownerName.message}
              </p>
            )}
          </div>
          {/* 사업자 전화번호 */}
          <div>
            <div>*업체 전화번호</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={CHAR_DEL(inputCompany.phoneNum)}
              placeholder="(- 제외, 지역번호 포함)"
              {...register("phoneNum", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.PH_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.phoneNum?.type === "required" ||
              errors.phoneNum?.type === "pattern") && (
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                {errors.phoneNum.message}
              </p>
            )}
          </div>
          {/* 사업자 팩스번호 */}
          <div style={{ width: "32%" }}>
            <div>업체 팩스번호(선택)</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={CHAR_DEL(inputCompany.faxNum)}
              placeholder="(- 제외)"
              {...register("faxNum", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: basicRegEx.NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.faxNum?.type === "required" ||
              errors.faxNum?.type === "pattern") && (
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                {errors.faxNum.message}
              </p>
            )}
          </div>
          {/* 업체 주소 */}
          <div>
            <div>*사업자 주소</div>
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
                  value={addressMain}
                  readOnly
                  {...register("addressMain", {
                    required: { value: true, message: "필수 입력사항입니다." },
                  })}
                />
                {errors.addressMain?.type === "required" && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "red",
                    }}
                  >
                    {errors.addressMain.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    setModalOpen(!modalOpen);
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
                value={addressDetail}
                readOnly={addressMain ? false : true}
                {...register("addressDetail", {
                  onChange: (e) => {
                    setAddressDetail(e.target.value);
                  },
                })}
              />
            </div>
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
                <DaumPostcode
                  onComplete={addressHandler}
                  style={{ height: "500px" }}
                />
              </Modal>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={(e) => {
                props.setStepNumber(props.stepNumber - 1);
              }}
            >
              이전
            </button>
            <button type="submit">다음</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default InputCompany;
