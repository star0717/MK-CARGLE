import type { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";

import StepOne from "../../src/components/page/Find/stepone";
import StepTwo from "../../src/components/page/Find/steptwo";
import StepThree from "../../src/components/page/Find/stepthree";
import StepFour from "../../src/components/page/Find/stepfour";

const FindPage: NextPage = () => {
  const [headerName, setHeaderName] = useState("email");
  const [stepNumber, setStepNumber] = useState(1);
  //step1 -> step2
  const [findEmail, setFindEmail] = useState(""); // 찾은 이메일 주소

  const stepProps = {
    setHeaderName,
    setStepNumber,
    setFindEmail,
    findEmail,
    headerName,
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
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "#E2E2E2",
        }}
      >
        {
          headerName === "email" ? ( // 이메일 찾기 헤더
            <div>이메일 찾기</div>
          ) : (
            <div>비밀번호 찾기</div>
          ) // 비밀번호 찾기 헤더
        }
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
            width: "30%",
            height: "100%",
            backgroundColor: "lightgreen",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          {stepNumber === 1 ? ( // step 1, (사업자번호, 휴대전화번호 입력)
            <StepOne {...stepProps} />
          ) : stepNumber === 2 ? (
            <StepTwo {...stepProps} />
          ) : stepNumber === 3 ? (
            <StepThree {...stepProps} />
          ) : stepNumber === 4 ? (
            <StepFour {...stepProps} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPage;
