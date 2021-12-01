import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import DaumPostcode from "react-daum-postcode";
import { useInterval } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { RootStateInterface } from "../../../../../store/interfaces/RootState";
import { actionTypesUser, UserState } from "../../../../../store/interfaces";
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
import { initialState } from "../../../../../store/reducer/user.reducer";

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
  const user = props.user;
  const company = props.company;
  const formInput = props.formInput;
  const formCheck = props.formCheck;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const userAuth = props.userAuth;

  // // redux store에서 user, company 정보 가져옴
  // const { user, company, formInput, formCheck } = useSelector(
  //   (state: RootStateInterface): UserState => state.userAll
  // );

  const [inputCompany, setInputCompany] = useState({
    ...company,
    ownerName: user.name,
  }); // 업체 정보
  const [inputForm, setInputForm] = useState(formInput); // 폼에만 있는 인풋(ex. 이메일 도메인)
  // const [emailAddress, setEmailAdderess] = useState(""); // 이메일 주소
  // const [emailDomain, setEmailDomain] = useState(""); // 이메일 도메인
  // const [emailReadOnly, setEmailReadOnly] = useState(false); // 이메일 input readonly
  // const [emailSend, setEmailSend] = useState(false); // 이메일 인증 전송여부
  // const [timer, setTimer] = useState(0); // 인증번호 유효시간 타이머
  // const [authNumCheck, setAuthNumCheck] = useState(false); // 인증번호 체크여부
  // const [authNum, setAuthNum] = useState(""); // 인증번호 input
  // const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인
  // const [companyCheck, setCompanyCheck] = useState(false); // 사업자번호 유효성 검사 여부
  // const [addressMain, setAddressMain] = useState(""); // 주소(메인)
  // const [addressDetail, setAddressDetail] = useState(""); // 주소(상세)
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

  // 회원가입 - input 값 입력 시 텍스트 변환을 위한 handler
  // 업체 정보
  const onInputCompanyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCompany({ ...inputCompany, [e.target.name]: e.target.value });
  };
  // 그 외 form 정보
  const onInputFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
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
                  dispatch({
                    type: actionTypesUser.FORM_CHECK,
                    payload: { ...formCheck, companyCheck: true },
                  });
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

    setInputForm({ ...inputForm, cAddressMain: fullAddress });
    setValue("cAddressMain", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  // 사업자(owner) 회원가입 form submit handler
  const onSignUpCompanyHandler: SubmitHandler<SignUpInfo> = (data) => {
    dispatch({ type: actionTypesUser.INPUT_COMPANY, payload: inputCompany });
    dispatch({ type: actionTypesUser.INPUT_FORM, payload: inputForm });
    if (!formCheck.companyCheck) {
      setError("comRegNum", {
        type: "comCheckNeed",
        message: "사업자 등록번호 인증이 필요합니다.",
      });
    } else {
      delete user._cID;
      dispatch(
        signUpUserAction({
          user: {
            ...user,
            name: inputCompany.ownerName,
            email: `${formInput.emailAddress}@${formInput.emailDomain}`,
          },
          company: {
            ...inputCompany,
            address:
              inputForm.cAddressDetail !== ""
                ? `${inputForm.cAddressMain}, ${inputForm.cAddressDetail}`
                : inputForm.cAddressMain,
          },
        })
      ).then(
        (res: any) => {
          setStepNumber(stepNumber + 1);
        },
        (err) => {
          if (err.response.status === 400) {
            alert("회원가입에 실패했습니다.");
            setStepNumber(stepNumber - 1);
            dispatch({
              type: actionTypesUser.FORM_CHECK,
              payload: initialState.formCheck,
            });
          }
        }
      );
    }
  };

  console.log("@@회사 : ", inputCompany);
  console.log("##인풋스테이트 : ", formInput);
  console.log("##유저스테이트 : ", user);
  console.log("^^^폼체크 : ", formCheck);

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
                  readOnly={formCheck.companyCheck}
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
                  disabled={formCheck.companyCheck}
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
              value={inputCompany.mbTypeNum}
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
                pattern: {
                  value: basicRegEx.NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {errors.faxNum?.type === "pattern" && (
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
                  value={inputForm.cAddressMain}
                  readOnly
                  {...register("cAddressMain", {
                    required: { value: true, message: "필수 입력사항입니다." },
                  })}
                />
                {errors.cAddressMain?.type === "required" && (
                  <p
                    style={{
                      margin: "0",
                      fontSize: "8px",
                      color: "red",
                    }}
                  >
                    {errors.cAddressMain.message}
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
                value={inputForm.cAddressDetail}
                readOnly={inputForm.cAddressMain ? false : true}
                {...register("cAddressDetail", {
                  onChange: (e) => {
                    onInputFormHandler(e);
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
                setStepNumber(props.stepNumber - 1);
                dispatch({
                  type: actionTypesUser.INPUT_COMPANY,
                  payload: inputCompany,
                });
                dispatch({
                  type: actionTypesUser.INPUT_FORM,
                  payload: inputForm,
                });
              }}
            >
              이전
            </button>
            <button type="submit">완료</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default InputCompany;
