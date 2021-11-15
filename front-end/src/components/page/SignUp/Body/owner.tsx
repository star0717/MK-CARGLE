import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
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
import { basicRegEx, formRegEx } from "../../../../validation/regEx";
import {
  authNumCheckAction,
  companyCheckAction,
  emailSendAction,
  signUpUserAction,
} from "../../../../../store/action/user.action";

// modal setting
Modal.setAppElement("body");

const OwnerSignUp: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // props 재정의
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;

  // 이메일 종류
  const emailItem = [
    { key: 1, value: "", text: "직접 입력" },
    { key: 2, value: "gmail.com", text: "Gmail" },
    { key: 3, value: "naver.com", text: "Naver" },
    { key: 4, value: "daum.net", text: "Daum" },
  ];

  // redux store에서 user, company 정보 가져옴
  const { user, company } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  const [inputUser, setInputUser] = useState(user); // 사용자 정보
  const [inputCompany, setInputCompany] = useState(company); // 업체 정보

  const [emailAddress, setEmailAdderess] = useState(""); // 이메일 주소
  const [emailDomain, setEmailDomain] = useState(""); // 이메일 도메인
  const [emailReadOnly, setEmailReadOnly] = useState(false); // 이메일 input readonly
  const [emailSend, setEmailSend] = useState(false); // 이메일 인증 전송여부
  const [timer, setTimer] = useState(0); // 인증번호 유효시간 타이머
  const [authNumCheck, setAuthNumCheck] = useState(false); // 인증번호 체크여부
  const [authNum, setAuthNum] = useState(""); // 인증번호 input
  const [companyCheck, setCompanyCheck] = useState(false);
  const [addressMain, setAddressMain] = useState(""); // 주소(메인)
  const [addressDetail, setAddressDetail] = useState(""); // 주소(상세)
  const [modalOpen, setModalOpen] = useState(false); // 모달창 open 여부

  const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

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
    if (email.length !== 0) {
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
      }
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
        setEmailSend(false);
      }
    }
  }, [timer]);

  // 인증번호 검사 handler
  const onAuthNumCheckHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (authNum) {
      dispatch(authNumCheckAction(authNum)).then((res: any) => {
        if (res.payload) {
          alert("인증되었습니다.");
          setAuthNumCheck(true);
          setTimer(0);
          setEmailSend(false);
        } else {
          alert("인증번호가 일치하지 않습니다.");
        }
      });
    }
  };

  // 사업자번호 유효성 검사 handler
  const onComRegNumCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputCompany.comRegNum) {
      dispatch(companyCheckAction(inputCompany.comRegNum)).then((res: any) => {
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

    setAddressMain(fullAddress);
    setModalOpen(false);
  };

  // 사업자(owner) 회원가입 form submit handler
  const onSignUpCompanyHandler: SubmitHandler<SignUpInfo> = (data) => {
    if (!authNumCheck) {
      alert("이메일 인증을 해주세요.");
    } else if (!companyCheck) {
      alert("사업자 등록번호 인증을 해주세요.");
    } else {
      console.log("@@@", inputUser);
      console.log("###", inputCompany);
      console.log("$$$", user.auth);

      dispatch(
        signUpUserAction({
          user: {
            ...inputUser,
            name: inputCompany.ownerName,
            email: `${emailAddress}@${emailDomain}`,
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
          }
        }
      );
    }
  };

  return (
    <div
      style={{
        width: "95%",
        height: "650px",
        backgroundColor: "mintcream",
        margin: "10px",
      }}
    >
      <form onSubmit={handleSubmit(onSignUpCompanyHandler)}>
        {/* 아이디 */}
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
                value={emailAddress}
                readOnly={authNumCheck}
                placeholder="이메일을 입력해주세요."
                {...register("emailAddress", {
                  onChange: (e) => {
                    setEmailAdderess(e.target.value);
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
                value={emailDomain}
                placeholder="주소 선택"
                readOnly={emailReadOnly || authNumCheck}
                {...register("emailDomain", {
                  onChange: (e) => {
                    setEmailDomain(e.target.value);
                  },
                  required: true,
                  pattern: formRegEx.EMAIL_DOMAIN,
                })}
              />
            </div>
            <div style={{ padding: "1px 2px" }}>
              <select
                disabled={authNumCheck}
                {...register("emailSelect", {
                  onChange: (e) => {
                    onEmailKindHandler(e);
                  },
                })}
              >
                {emailItem.map((item: any, index: Number) => (
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
                disabled={authNumCheck}
              >
                {emailSend ? "인증번호 재전송" : "인증번호 전송"}
              </button>
            </div>
          </div>
          {emailSend ? (
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
          {authNumCheck ? (
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
            {((errors.emailAddress?.type === "pattern" &&
              errors.emailAddress?.type !== "required") ||
              (errors.emailDomain?.type === "pattern" &&
                errors.emailDomain?.type === "required")) && (
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
            {errors.emailAddress?.type === "emailExist" && (
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
                required: true,
                pattern: formRegEx.PASSWORD,
              })}
            />
            {errors.password?.type === "required" && (
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
            {errors.password?.type === "pattern" && (
              <p
                style={{
                  margin: "0",
                  fontSize: "8px",
                  color: "red",
                }}
              >
                8~16자 영문, 숫자, 특수문자를 사용하세요.
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
              value={passwordCheck}
              placeholder="비밀번호 확인을 위해 다시 입력해주세요."
              {...register("passwordCheck", {
                onChange: (e) => {
                  setPasswordCheck(e.target.value);
                },
                required: true,
                validate: (value) => value === watch("password", ""),
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
                필수 입력사항입니다.
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
                value={inputCompany?.comRegNum}
                readOnly={companyCheck}
                placeholder="사업자 등록번호를 입력해주세요."
                {...register("comRegNum", {
                  onChange: (e) => {
                    onInputCompanyHandler(e);
                  },
                  required: true,
                  pattern: formRegEx.COMPANY_NUM,
                })}
              />
              {errors.comRegNum?.type === "required" && (
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
              {errors.comRegNum?.type === "pattern" && (
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
              {errors.comRegNum?.type === "comCheckFalse" && (
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
        {/* 정비업 등록번호 & 정비업종 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* 정비업등록번호 */}
          <div style={{ width: "49%" }}>
            <div>*정비업 등록번호</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputCompany.mbRegNum}
              placeholder="정비업 등록번호를 입력해주세요."
              {...register("mbRegNum", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: true,
                pattern: formRegEx.MB_NUM,
              })}
            />
            {errors.mbRegNum?.type === "required" && (
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
            {errors.mbRegNum?.type === "pattern" && (
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
          </div>
          {/* 정비업종 */}
          <div style={{ width: "49%" }}>
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
        </div>
        {/* 상호명 & 대표자명 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* 상호명 */}
          <div style={{ width: "49%" }}>
            <div>*상호명</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputCompany.name}
              placeholder="상호명을 입력해주세요."
              {...register("name", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: true,
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
                필수 입력사항입니다.
              </p>
            )}
          </div>
          {/* 대표자명 */}
          <div style={{ width: "49%" }}>
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
                required: true,
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
                필수 입력사항입니다.
              </p>
            )}
          </div>
        </div>

        {/* 대표자 휴대폰번호 & 사업자 전화번호 & 사업자 팩스번호 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* 대표자 휴대폰번호 */}
          <div style={{ width: "32%" }}>
            <div>*대표 휴대폰번호</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputUser.hpNumber}
              placeholder="(- 제외)"
              {...register("hpNumber", {
                onChange: (e) => {
                  onInputUserHandler(e);
                },
                required: true,
                pattern: formRegEx.HP_NUM,
              })}
            />
            {errors.hpNumber?.type === "required" && (
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
            {errors.hpNumber?.type === "pattern" && (
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
          </div>
          {/* 사업자 전화번호 */}
          <div style={{ width: "32%" }}>
            <div>*업체 전화번호</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputCompany.phoneNum}
              placeholder="(- 제외, 지역번호 포함)"
              {...register("phoneNum", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: true,
                pattern: formRegEx.PH_NUM,
              })}
            />
            {errors.phoneNum?.type === "required" && (
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
            {errors.phoneNum?.type === "pattern" && (
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
          </div>
          {/* 사업자 팩스번호 */}
          <div style={{ width: "32%" }}>
            <div>업체 팩스번호(선택)</div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={inputCompany.faxNum}
              placeholder="(- 제외)"
              {...register("faxNum", {
                onChange: (e) => {
                  onInputCompanyHandler(e);
                },
                required: true,
                pattern: basicRegEx.NUM,
              })}
            />
            {errors.faxNum?.type === "required" && (
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
            {errors.faxNum?.type === "pattern" && (
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
          </div>
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
                  validate: (value) => {
                    value = addressMain;
                    return value === "" ? false : true;
                  },
                })}
              />
              {errors.addressMain?.type === "validate" && (
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
  );
};

export default OwnerSignUp;
