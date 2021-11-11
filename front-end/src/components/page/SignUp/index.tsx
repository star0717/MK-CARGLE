import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import DaumPostcode from "react-daum-postcode";
import { useInterval } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { UserState } from "../../../../store/interfaces";
import { User } from "../../../../../models/dist/user.entity";
import { Company } from "../../../../../models/dist/company.entity";
import { basicRegEx, formRegEx } from "../../../validation/regEx";
import {
  authNumCheckAction,
  companyCheckAction,
  emailSendAction,
  signUpUserAction,
} from "../../../../store/action/user.action";
import Post from "../../common/react-daum-post";

// verticalAlign: "middle",
// alignItems: "center",
// textAlign: "center"

// react-hook-form을 사용하는 form에서 받을 데이터 타입 정의
// 이용약관 form
interface TermData {
  mkTerm: Boolean;
  privacyTerm: Boolean;
}

interface SignUpInfo {
  user: User;
  
  company: Company;
}

Modal.setAppElement("body");

const SignUp: NextPage = () => {
  enum UserAuthority {
    ADMIN = "admin",
    OWNER = "owner",
    WORKER = "worker",
  }

  const dispatch = useDispatch();
  const router = useRouter();

  // 이메일 종류
  const emailItem = [
    { key: 1, value: "", text: "직접 입력" },
    { key: 2, value: "google.com", text: "Google" },
    { key: 3, value: "naver.com", text: "Naver" },
    { key: 4, value: "daum.net", text: "Daum" },
  ];

  // redux store에서 user, company 정보 가져옴
  const { user, company } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  const [inputUser, setInputUser] = useState(user); // 사용자 정보
  const [inputCompany, setInputCompany] = useState(company); // 업체 정보

  const [isCompany, setIsCompany] = useState<boolean>(true); // 사업자일 경우 true
  const [stepNumber, setStepNumber] = useState<number>(1); // 스텝 숫자
  const [direct, setDirect] = useState<boolean>(false);

  const [mkTerm, setMkTerm] = useState(false); // 엠케이 이용약관 체크여부
  const [privacyTerm, setPrivacyTerm] = useState(false); // 개인정보 동의 체크여부

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
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  // modal 창 닫기 기능
  const closeModal = () => {
    setModalOpen(false);
  };

  // 이용약관 form submit handler
  const agreeTermHandler: SubmitHandler<TermData> = (data) => {
    setStepNumber(stepNumber + 1);
  };

  // 이메일 종류에 따라 state를 통해 값 변경 및 readonly 변경
  const onEmailKindHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "" ? setEmailReadOnly(false) : setEmailReadOnly(true); // 이메일 직접입력 외에는 readonly true
    setEmailDomain(e.target.value);
    setValue("emailDomain", e.target.value);
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

  // 이메일 Address, Domain 입력 시 이메일 state 변경
  useEffect(() => {
    if (emailAddress != "" || emailDomain != "") {
      setInputUser({ ...inputUser, email: `${emailAddress}@${emailDomain}` });
    }
  }, [emailAddress, emailDomain]);

  // 이메일 인증번호 전송 handler
  const onEmailSendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputUser.email.length !== 0) {
      if (formRegEx.EMAIL.test(inputUser.email)) {
        dispatch(emailSendAction(inputUser.email)).then((res: any) => {
          if (res.payload) {
            alert("인증번호가 전송되었습니다.");
            setEmailSend(true);
            setTimer(300);
          } else {
            alert("이미 존재하는 이메일입니다.");
          }
        });
      } else {
        alert("이메일 형식에 맞게 입력하세요.");
      }
    } else {
      alert("이메일을 입력해주세요.");
    }
  };

  // 인증번호 타이머
  useInterval(
    () => {
      setTimer(timer - 1);
      console.log(timer);
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
          alert("사업자등록번호 인증이 완료되었습니다.");
          setCompanyCheck(true);
        } else {
          alert("유효하지 않은 사업자등록번호입니다.");
        }
      });
    } else {
      alert("사업자 번호를 입력하세요.");
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

  // 주소 - 메인주소, 상세주소 입력 시 inputCompany.address state 변경
  useEffect(() => {
    if (addressDetail != "") {
      setInputCompany({
        ...inputCompany,
        address: addressMain + ", " + addressDetail,
      });
    } else {
      setInputCompany({ ...inputCompany, address: addressMain });
    }
  }, [addressMain, addressDetail]);

  // 사업자 회원가입 form submit handler
  const onSignUpCompanyHandler: SubmitHandler<SignUpInfo> = (data) => {
    if (!authNumCheck) {
      alert("이메일 인증을 해주세요.");
    } else if (!companyCheck) {
      alert("사업자 등록번호 인증을 해주세요.");
    } else {
      console.log("@@@", inputUser);
      console.log("###", inputCompany);
      setInputUser({
        ...inputUser,
        auth: UserAuthority.OWNER,
        name: inputCompany.ownerName,
      });
      console.log("$$$", UserAuthority.OWNER);
      dispatch(
        signUpUserAction({
          user: inputUser,
          company: inputCompany,
        })
      ).then((res: any) => {
        console.log(res);
      });
    }
    // setStepNumber(stepNumber + 1);
  };

  console.log(isCompany);
  console.log("어드 : ", emailAddress);
  console.log("도메인: ", emailDomain);
  console.log("유저 : ", inputUser);
  console.log("업체 : ", inputCompany);
  console.log("에러 : ", errors.addressMain);

  return (
    <div
      style={{
        width: "100%",
        height: "900px",
        backgroundImage: `url("../../images/background2.png")`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 헤더 부분 (ex.01 회원구분) */}
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "#E2E2E2",
        }}
      >
        <div
          style={{
            height: "100%",
            textAlign: "center",
          }}
        >
          {stepNumber === 1 ? ( // 01 회원구분
            <div>123</div>
          ) : stepNumber === 2 ? ( // 02 약관 동의
            `02 약관 동의`
          ) : stepNumber === 3 ? ( // 03 정보 입력
            `03 정보 입력`
          ) : stepNumber === 4 ? (
            isCompany ? (
              `04 서류 제출` // 04 서류 제출(사업자)
            ) : (
              `04 가입승인`
            ) // 04 가입 승인(직원)
          ) : stepNumber === 5 ? ( // 05 가입 승인(사업자)
            `05 가입승인`
          ) : (
            ""
          )}
        </div>
      </div>

      {/* 바디 부분 ( 전체 틀 ) 나중에 컨텐츠 크기에 맞게끔 반응형으로 만들어야 함 */}
      <div
        style={{
          width: "100%",
          height: "800px",
          backgroundColor: "lightblue",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* 바디 부분 ( 가운데 전체 영역 ) */}
        <div
          style={{
            width: "60%",
            height: "100%",
            backgroundColor: "lightgray",
          }}
        >
          {/* 바디 부분 ( 단계 표시 ) 이미지 대체 고려중 */}
          <div
            style={{
              width: "100%",
              height: "10%",
              backgroundColor: "lightgreen",
            }}
          >
            {isCompany ? ( // 사업자일 경우
              stepNumber === 1 ? ( // 사업자 step 1
                <div>사업자1 회원구분</div> // 여기에 이미지를 넣거나 변수에 따라 css 변경
              ) : stepNumber === 2 ? (
                <div>사업자2 약관동의</div>
              ) : stepNumber === 3 ? (
                <div>사업자3 정보입력</div>
              ) : stepNumber === 4 ? (
                <div>사업자4 서류제출</div>
              ) : stepNumber === 5 ? (
                <div>사업자5 가입승인</div>
              ) : (
                ""
              )
            ) : stepNumber === 1 ? ( // 직원 step 1
              <div>직원1 회원구분</div>
            ) : stepNumber === 2 ? (
              <div>직원2 약관동의</div>
            ) : stepNumber === 3 ? (
              <div>직원3 정보입력</div>
            ) : stepNumber === 4 ? (
              <div>직원4 가입승인</div>
            ) : (
              ""
            )}
          </div>

          {/* 바디 부분 ( 단계별 내용들 ) */}
          <div
            style={{
              width: "100%",
              height: "90%",
              backgroundColor: "lightpink",
            }}
          >
            {stepNumber === 1 ? ( // step이 1일 때 (사업자 or 직원 선택)
              <div
                style={{
                  width: "100%",
                  height: "350px",
                  backgroundColor: "red",
                  display: "flex",
                }}
              >
                {/* 사업자 회원가입 버튼 */}
                <div
                  style={{
                    width: "50%",
                    height: "80%",
                    backgroundColor: "lightslategrey",
                    margin: "60px",
                  }}
                  onClick={() => {
                    setStepNumber(2);
                    setIsCompany(true);
                  }}
                ></div>

                {/* 직원 회원가입 버튼 */}
                <div
                  style={{
                    width: "50%",
                    height: "80%",
                    backgroundColor: "linen",
                    margin: "60px",
                  }}
                  onClick={() => {
                    setStepNumber(2);
                    setIsCompany(false);
                  }}
                ></div>
              </div>
            ) : stepNumber === 2 ? ( //step이 2일 때 (약관동의화면 : 사업자, 직원 상관 없음)
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  backgroundColor: "linen",
                }}
              >
                <form onSubmit={handleSubmit(agreeTermHandler)}>
                  <div>엠케이솔루션 이용약관</div>
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "mediumpurple",
                    }}
                  ></div>
                  <div style={{ textAlign: "right" }}>
                    엠케이솔루션 이용약관 동의(필수)
                    <input
                      type="checkbox"
                      checked={mkTerm}
                      {...register("mkTerm", {
                        onChange: (e) => {
                          setMkTerm(e.target.checked);
                        },
                        required: true,
                      })}
                    />
                    {errors.mkTerm && (
                      <p style={{ margin: "0", fontSize: "8px", color: "red" }}>
                        필수사항입니다.
                      </p>
                    )}
                  </div>
                  <div>개인정보 수집 및 이용약관</div>
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "mediumpurple",
                    }}
                  ></div>
                  <div style={{ textAlign: "right" }}>
                    개인정보 수집 및 이용약관 동의(필수)
                    <input
                      type="checkbox"
                      checked={privacyTerm}
                      {...register("privacyTerm", {
                        onChange: (e) => {
                          setPrivacyTerm(e.target.checked);
                        },
                        required: true,
                      })}
                    />
                    {errors.privacyTerm && (
                      <p style={{ margin: "0", fontSize: "8px", color: "red" }}>
                        필수사항입니다.
                      </p>
                    )}
                  </div>
                  {/* {(errors.mkTerm || errors.privacyTerm) && (
                    <p style={{ margin: "0", fontSize: "8px", color: "red" }}>
                      엠케이 이용약관과 개인정보 수집 및 이용에 대한 안내에 모두
                      동의해주세요.
                    </p>
                  )} */}
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={(e) => {
                        setStepNumber(stepNumber - 1);
                      }}
                    >
                      이전
                    </button>
                    <button type="submit">다음</button>
                  </div>
                </form>
              </div>
            ) : stepNumber === 3 ? (
              isCompany === true ? ( // step 3, 사업자일 때
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
                            placeholder="이메일을 입력해주세요."
                            {...register("emailAddress", {
                              onChange: (e) => {
                                setEmailAdderess(e.target.value);
                              },
                              required: true,
                              pattern: formRegEx.EMAIL_ADDRESS,
                            })}
                          />
                          {errors.emailAddress?.type === "required" && (
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
                          {errors.emailAddress?.type === "pattern" && (
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
                        <div style={{ backgroundColor: "yellowgreen" }}>@</div>
                        <div style={{ backgroundColor: "greenyellow" }}>
                          <input
                            type="text"
                            value={emailDomain}
                            placeholder="주소 선택"
                            readOnly={emailReadOnly}
                            {...register("emailDomain", {
                              onChange: (e) => {
                                setEmailDomain(e.target.value);
                              },
                              required: true,
                              pattern: formRegEx.EMAIL_DOMAIN,
                            })}
                          />
                          {errors.emailDomain?.type === "required" && (
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
                          {errors.emailDomain?.type === "pattern" && (
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
                        <div style={{ padding: "1px 2px" }}>
                          <select
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
                            <button
                              type="button"
                              onClick={onAuthNumCheckHandler}
                            >
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
                          인증완료
                        </p>
                      ) : null}
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
                            validate: (value) =>
                              value === watch("password", ""),
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
                    {/* 업태 & 업종 */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* 업태 */}
                      <div style={{ width: "49%" }}>
                        <div>*업태</div>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          value={inputCompany.busType}
                          placeholder="업태를 입력해주세요."
                          {...register("busType", {
                            onChange: (e) => {
                              onInputCompanyHandler(e);
                            },
                            required: true,
                          })}
                        />
                        {errors.busType?.type === "required" && (
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
                      {/* 업종 */}
                      <div style={{ width: "49%" }}>
                        <div>*업종</div>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          value={inputCompany.busItem}
                          placeholder="업종을 입력해주세요."
                          {...register("busItem", {
                            onChange: (e) => {
                              onInputCompanyHandler(e);
                            },
                            required: true,
                          })}
                        />
                        {errors.busItem?.type === "required" && (
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
                        {/* {addressApi ? (
                          <DaumPostcode onComplete={addressHandler} />
                        ) : null} */}
                        <Modal
                          isOpen={modalOpen}
                          onRequestClose={() => setModalOpen(false)}
                        >
                          {/* <DaumPostcode
                            onComplete={addressHandler}
                            style={{ height: "700px" }}
                          /> */}
                          <Post {...setAddressMain} {...setModalOpen}></Post>
                        </Modal>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => {
                          setStepNumber(stepNumber - 1);
                        }}
                      >
                        이전
                      </button>
                      <button type="submit">다음</button>
                    </div>
                  </form>
                </div>
              ) : (
                // step 3, 직원일 때
                <div
                  style={{
                    width: "95%",
                    height: "650px",
                    backgroundColor: "mintcream",
                    margin: "10px",
                  }}
                >
                  <div>*사업자 등록번호</div>
                  <div style={{ display: "flex" }}>
                    <input type="text" style={{ width: "85%" }} />
                    <input
                      type="button"
                      style={{ width: "15%" }}
                      value="주소검색"
                    />
                  </div>
                  <div>*아이디(이메일 형식으로 입력해주세요)</div>
                  <div>
                    <input type="text" />
                    <input type="button" value="인증" />
                  </div>
                  <div style={{ fontSize: "7px" }}>
                    등록되지 않은 이메일일 경우 인증번호 전송 / 이미 등록된
                    이메일일 경우 이미 등록된 이메일입니다 메세지 표시
                  </div>
                  <div>*비밀번호</div>
                  <div>
                    <input type="password" />
                  </div>
                  <div style={{ fontSize: "7px" }}>
                    8~16자 영문,숫자,특수문자를 사용하세요.(조건에 부합하면 이
                    텍스트 사라짐)
                  </div>
                  <div>*비밀번호 확인</div>
                  <div>
                    <input type="password" />
                  </div>
                  <div style={{ fontSize: "7px" }}>비밀번호가 일치합니다.</div>
                  <div style={{ fontSize: "7px" }}>
                    비밀번호가 일치하지 않습니다.
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>*성명</div>
                    <div style={{ width: "50%" }}>*휴대전화번호</div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <input type="text" style={{ width: "50%" }} />
                    <input type="text" style={{ width: "50%" }} />
                  </div>
                  <div>*자택주소(선택)</div>
                  <div style={{ display: "flex" }}>
                    <input type="text" style={{ width: "85%" }} />
                    <input
                      type="button"
                      style={{ width: "15%" }}
                      value="주소검색"
                    />
                  </div>
                  <div>입사일자(선택)</div>
                  <div>
                    <input type="date" />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={(e) => {
                        setStepNumber(stepNumber - 1);
                      }}
                    >
                      이전
                    </button>
                    <button
                      onClick={(e) => {
                        setStepNumber(stepNumber + 1);
                      }}
                    >
                      다음
                    </button>
                  </div>
                </div>
              )
            ) : stepNumber === 4 ? (
              isCompany === true ? ( // step 4, 사업자일 때(서류제출)
                <div
                  style={{
                    width: "95%",
                    height: "400px",
                    backgroundColor: "mintcream",
                    margin: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "40%",
                      backgroundColor: "peru",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>*성명</div>
                      <div style={{ width: "50%" }}>*휴대전화번호</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input type="text" style={{ width: "50%" }} />
                      <input type="text" style={{ width: "50%" }} />
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <input
                          type="button"
                          style={{ width: "20%" }}
                          value="파일선택"
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <input
                          type="button"
                          style={{ width: "20%" }}
                          value="파일선택"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      backgroundColor: "orange",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => {
                          setStepNumber(stepNumber - 1);
                        }}
                      >
                        다음에하기
                      </button>
                      <button
                        onClick={(e) => {
                          setStepNumber(stepNumber + 1);
                        }}
                      >
                        제출하기
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      backgroundColor: "yellow",
                    }}
                  >
                    {/* 물음표 이모티콘, 메세지 삽입 */}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "95%",
                    height: "300px",
                    backgroundColor: "mintcream",
                    margin: "10px",
                  }}
                >
                  <div>
                    회원가입이 완료되었습니다.
                    <br />
                    가입승인 후 정상 이용이 가능합니다.
                  </div>
                  <input
                    value="확인"
                    type="button"
                    onClick={() => {
                      router.push("/");
                    }}
                  />
                </div>
              )
            ) : stepNumber === 5 ? ( // step 5, 사업자만 적용
              <div
                style={{
                  width: "95%",
                  height: "300px",
                  backgroundColor: "mintcream",
                  margin: "10px",
                }}
              >
                <div>
                  회원가입이 완료되었습니다.
                  <br />
                  가입승인 후 정상 이용이 가능합니다.
                </div>
                <input
                  value="확인"
                  type="button"
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
