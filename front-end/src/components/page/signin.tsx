import type { NextPage } from "next";
import { useEffect, useState } from "react";

const SignIn: NextPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        backgroundImage: `url("../../images/background2.png")`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "900px",
          height: "400px",
          display: "flex",
          backgroundColor: "#E2E2E2",
        }}
      >
        <div
          style={{
            width: "50%",
            padding: "20px",
            backgroundImage: `url("../../images/background1.png")`,
          }}
        >
          <h3 style={{ marginTop: "0" }}>
            엠케이솔루션에 오신 것을 환영합니다.
          </h3>
          <p>등록된 회원정보가 기억나지 않으십니까?</p>
          <p style={{ fontWeight: "bold" }}>이메일 및 패스워드 찾기 &#62;</p>
          <button>회원가입</button>
        </div>
        <div style={{ width: "50%", padding: "40px", textAlign: "center" }}>
          <h3>로그인</h3>
          <div>
            <div style={{ textAlign: "left" }}>
              <p>이메일</p>
              <input type="email" name="email" style={{ width: "100%" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p>비밀번호</p>
              <input
                type="password"
                name="password"
                style={{ width: "100%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>아이디 저장</span>
                <input type="checkbox"></input>
              </div>
              <div>
                <span>로그인 상태 유지</span>
                <input type="checkbox"></input>
              </div>
            </div>
            <button>완료</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
