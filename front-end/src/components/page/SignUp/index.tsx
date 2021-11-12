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
import { UserAuthority } from "../../../models/user.entity";
import { formRegEx } from "../../../validation/regEx";
import {
  authNumCheckAction,
  companyCheckAction,
  emailSendAction,
  signUpUserAction,
} from "../../../../store/action/user.action";
import WorkerSignUp from "./Body/worker";
import OwnerSignUp from "./Body/owner";
import TermSignUp from "./Body/term";
import { SignUpInfo } from "../../../models/auth.entity";

// modal setting
Modal.setAppElement("body");

const SignUp: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const [isCompany, setIsCompany] = useState<boolean>(true); // 사업자일 경우 true
  const [stepNumber, setStepNumber] = useState<number>(1); // 스텝 숫자
  // const [direct, setDirect] = useState<boolean>(false);

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

  // component에 전달할 props들 정의
  const SignUpProps = {
    stepNumber,
    setStepNumber,
  };

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
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

  // // 컴포넌트 구분 후 적용 테스트
  // // 이메일 error 생성(react-hook-form에서 지원하는 require는 onChange만 인식함)
  // useEffect(() => {
  //   if (emailAddress === "" || emailDomain === "") {
  //     setError("emailAddress", {
  //       type: "emailNull",
  //       message: "필수 입력사항입니다.",
  //     });
  //   }
  // }, [emailAddress, emailDomain]);

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

  console.log(isCompany);
  console.log("@유저 : ", inputUser);
  console.log("@유저 : ", inputCompany);

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
                    setInputUser({ ...inputUser, auth: UserAuthority.OWNER });
                    setIsCompany(true);
                  }}
                >
                  사업자
                </div>

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
                    setInputUser({ ...inputUser, auth: UserAuthority.WORKER });
                    setIsCompany(false);
                  }}
                >
                  직원
                </div>
              </div>
            ) : stepNumber === 2 ? ( //step이 2일 때 (약관동의화면 : 사업자, 직원 상관 없음)
              <TermSignUp {...SignUpProps} />
            ) : stepNumber === 3 ? (
              isCompany === true ? ( // step 3, 사업자일 때
                <OwnerSignUp {...SignUpProps} />
              ) : (
                <WorkerSignUp {...SignUpProps} />
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
