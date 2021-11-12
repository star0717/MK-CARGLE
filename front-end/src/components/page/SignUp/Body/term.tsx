import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// react-hook-form을 사용하는 form에서 받을 데이터 타입 정의
// 이용약관 form
interface TermData {
  mkTerm: Boolean;
  privacyTerm: Boolean;
}

const TermSignUp: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // props 재정의
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;

  const [mkTerm, setMkTerm] = useState(false); // 엠케이 이용약관 체크여부
  const [privacyTerm, setPrivacyTerm] = useState(false); // 개인정보 동의 체크여부

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  // 이용약관 form submit handler
  const agreeTermHandler: SubmitHandler<TermData> = (data) => {
    setStepNumber(stepNumber + 1);
  };

  return (
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
  );
};

export default TermSignUp;
