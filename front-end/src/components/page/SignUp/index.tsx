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
import SelectUser from "./Body/selectUser";
import InputAccount from "./Body/inputAccout";
import InputCompany from "./Body/inputCompany";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { UserState } from "../../../../store/interfaces";

// modal setting
Modal.setAppElement("body");

const SignUp: NextPage = () => {
  // redux store에서 user, company 정보 가져옴
  const { user, company, formInput, formCheck } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  // 이메일 종류
  const emailItem = [
    { key: 1, value: "", text: "직접 입력" },
    { key: 2, value: "gmail.com", text: "Gmail" },
    { key: 3, value: "naver.com", text: "Naver" },
    { key: 4, value: "daum.net", text: "Daum" },
  ];

  const [userAuth, setUserAuth] = useState(UserAuthority.WORKER); // 유저 권한 종류
  const [stepNumber, setStepNumber] = useState<number>(1); // 스텝 숫자

  // component에 전달할 props들 정의
  const SignUpProps = {
    user,
    company,
    formInput,
    formCheck,
    stepNumber,
    setStepNumber,
    userAuth,
    setUserAuth,
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
          {/* 바디 부분 ( 단계별 내용들 ) */}
          <div
            style={{
              width: "100%",
              height: "90%",
              backgroundColor: "lightpink",
            }}
          >
            {stepNumber === 1 && <SelectUser {...SignUpProps} />}
            {stepNumber === 2 && <TermSignUp {...SignUpProps} />}
            {stepNumber === 3 && <InputAccount {...SignUpProps} />}
            {stepNumber === 4 &&
              (userAuth === "owner" ? (
                <InputCompany {...SignUpProps} />
              ) : (
                <SignupComplete />
              ))}
            {stepNumber === 5 && <FileUpload {...SignUpProps} />}
            {stepNumber === 6 && <SignupComplete {...SignUpProps} />}
            {/* {stepNumber === 1 ? ( // step이 1일 때 (사업자 or 직원 선택)
              <SelectUser {...SignUpProps} />
            ) : stepNumber === 2 ? ( //step이 2일 때 (약관동의화면 : 사업자, 직원 상관 없음)
              <TermSignUp {...SignUpProps} />
            ) : stepNumber === 3 ? (
              userAuth === "owner" ? ( // step 3, 사업자일 때
                <OwnerSignUp {...SignUpProps} />
              ) : (
                <WorkerSignUp {...SignUpProps} />
              )
            ) : stepNumber === 4 ? (
              userAuth === "worker" ? ( // step 4, 사업자일 때(서류제출)
                <FileUpload {...SignUpProps} />
              ) : (
                <SignupComplete />
              )
            ) : stepNumber === 5 ? ( // step 5, 사업자만 적용
              <SignupComplete />
            ) : (
              ""
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
