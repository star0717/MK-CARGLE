import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { UserState } from "../../../../store/interfaces";
import { User } from "../../../../../models/dist/user.entity";
import { Company } from "../../../../../models/dist/company.entity";

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

const SignUp: NextPage = () => {
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
  const [authNumCheck, setAuthNumCheck] = useState(false); // 인증번호 체크여부
  const [authNum, setAuthNum] = useState(""); // 인증번호 input

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 이용약관 form submit handler
  const agreeTermHandler: SubmitHandler<TermData> = (data) => {
    setStepNumber(stepNumber + 1);
  };

  // 이메일 종류에 따라 state를 통해 값 변경 및 readonly 변경
  const onEmailKindHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "" ? setEmailReadOnly(false) : setEmailReadOnly(true); // 이메일 직접입력 외에는 readonly true
    setEmailDomain(e.target.value);
  };

  // 회원가입 - input 값 입력 시 텍스트 변환을 위한 handler
  const onEmailAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이메일 주소
    setEmailAdderess(e.target.value);
  };
  const onEmailDomainHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이메일 도메인
    setEmailDomain(e.target.value);
  };
  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };
  const onInputCompanyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCompany({ ...inputCompany, [e.target.name]: e.target.value });
  };

  // 이메일 Address, Domain 입력 시 이메일 state 변경
  useEffect(() => {
    setInputUser({ ...inputUser, email: `${emailAddress}@${emailDomain}` });
  }, [emailAddress, emailDomain]);

  // 사업자 회원가입 form submit handler
  const onSignUpCompanyHandler: SubmitHandler<SignUpInfo> = () => {};

  console.log(isCompany);
  console.log("어드 : ", emailAddress);
  console.log("도메인: ", emailDomain);
  console.log("유저 : ", inputUser);
  console.log("업체 : ", inputCompany);

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
                        필수사항입니다11.
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
                    <div>*아이디(이메일 형식으로 입력해주세요)</div>
                    <div>
                      <input
                        type="text"
                        // name="emailAddress"
                        value={emailAddress}
                        // onChange={onEmailAddressHandler}
                        {...register("emailAddress", {
                          onChange: (e) => {
                            onEmailAddressHandler(e);
                          },
                          required: true,
                        })}
                      />
                      <span> @ </span>
                      <input
                        type="text"
                        // name="emailDomain"
                        value={emailDomain}
                        // onChange={onEmailDomainHandler}
                        readOnly={emailReadOnly}
                        {...register("emailDomain", {
                          onChange: (e) => {
                            onEmailDomainHandler(e);
                          },
                          required: true,
                        })}
                      />
                      <select onChange={onEmailKindHandler}>
                        {emailItem.map((item: any, index: Number) => (
                          <option key={item.key} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                      </select>
                      <input type="button" value="인증" />
                    </div>
                    <div style={{ fontSize: "7px" }}>
                      등록되지 않은 이메일일 경우 인증번호 전송 / 이미 등록된
                      이메일일 경우 이미 등록된 이메일입니다 메세지 표시
                    </div>
                    <div>*비밀번호</div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        value={inputUser.password}
                        onChange={onInputUserHandler}
                      />
                    </div>
                    <div style={{ fontSize: "7px" }}>
                      8~16자 영문,숫자,특수문자를 사용하세요.(조건에 부합하면 이
                      텍스트 사라짐)
                    </div>
                    <div>*비밀번호 확인</div>
                    <div>
                      <input type="password" />
                    </div>
                    <div style={{ fontSize: "7px" }}>
                      비밀번호가 일치합니다.
                    </div>
                    <div style={{ fontSize: "7px" }}>
                      비밀번호가 일치하지 않습니다.
                    </div>
                    <div>*사업자 등록번호</div>
                    <div>
                      <input type="text" />
                      <input type="button" value="인증" />
                    </div>
                    <div style={{ fontSize: "7px" }}>
                      사업자등록번호를 인증해주세요
                    </div>
                    <div style={{ fontSize: "7px" }}>
                      사업자등록번호를 인증이 완료되었습니다.
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>*정비업 등록번호</div>
                      <div style={{ width: "50%" }}>*정비업종</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input type="text" style={{ width: "50%" }} />
                      <select style={{ width: "50%" }}>
                        <option value="">정비업종 선택</option>
                        <option value="1급">자동차종합정비업</option>
                      </select>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>*상호명</div>
                      <div style={{ width: "50%" }}>*대표자명</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input type="text" style={{ width: "50%" }} />
                      <input type="text" style={{ width: "50%" }} />
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>*업태</div>
                      <div style={{ width: "50%" }}>*업종</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input type="text" style={{ width: "50%" }} />
                      <input type="text" style={{ width: "50%" }} />
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>*전화번호</div>
                      <div style={{ width: "50%" }}>*팩스번호(선택)</div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input type="text" style={{ width: "50%" }} />
                      <input type="text" style={{ width: "50%" }} />
                    </div>
                    <div>*사업자 주소</div>
                    <div style={{ display: "flex" }}>
                      <input type="text" style={{ width: "85%" }} />
                      <input
                        type="button"
                        style={{ width: "15%" }}
                        value="주소검색"
                      />
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
