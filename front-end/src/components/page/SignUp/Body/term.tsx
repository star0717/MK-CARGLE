import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import TermPresenter from "./termPresenter";

// react-hook-form을 사용하는 form에서 받는 데이터 타입 정의
// 이용약관 form
interface TermData {
  mkTerm: Boolean;
  privacyTerm: Boolean;
}

const Term: NextPage<any> = (props) => {
  // props 재정의
  // const formCheck = props.formCheck;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  // 이용약관 form submit handler
  const agreeTermHandler: SubmitHandler<TermData> = (data) => {
    setStepNumber(stepNumber + 1);
  };

  // 화면구성에 넘겨줄 props
  const fProps = {
    ...props,
    register,
    handleSubmit,
    errors,
    agreeTermHandler,
  };

  return <TermPresenter {...fProps} />;
};

export default Term;
