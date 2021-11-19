import type { NextPage } from "next";
import React, { useState } from "react";
import Modal from "react-modal";
import { UserAuthority } from "../../../models/user.entity";
import Header from "./Header";
import WorkerSignUp from "./Body/worker";
import OwnerSignUp from "./Body/owner";
import TermSignUp from "./Body/term";
import FileUpload from "./Body/fileUpload";
import SignupComplete from "./Body/complete";

// modal setting
Modal.setAppElement("body");

const SignUp: NextPage = () => {
  // 이메일 종류
  const emailItem = [
    { key: 1, value: "", text: "직접 입력" },
    { key: 2, value: "gmail.com", text: "Gmail" },
    { key: 3, value: "naver.com", text: "Naver" },
    { key: 4, value: "daum.net", text: "Daum" },
  ];

  const [isCompany, setIsCompany] = useState<boolean>(true); // 사업자일 경우 true
  const [userAuth, setUserAuth] = useState(UserAuthority.WORKER);
  const [stepNumber, setStepNumber] = useState<number>(1); // 스텝 숫자

  // component에 전달할 props들 정의
  const SignUpProps = {
    stepNumber,
    setStepNumber,
    userAuth,
    emailItem,
  };

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
      <Header {...SignUpProps} />

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
                    setUserAuth(UserAuthority.OWNER);
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
                    setUserAuth(UserAuthority.WORKER);
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
                <FileUpload {...SignUpProps} />
              ) : (
                <SignupComplete />
              )
            ) : stepNumber === 5 ? ( // step 5, 사업자만 적용
              <SignupComplete />
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
