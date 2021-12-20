import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import TermPresenter from "./termPresenter";
import { _cSignUpProps } from "../../../../configure/_cProps.entity";
import { _fTermData } from "../../../../configure/_fProps.entity";
import { _pTermProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 이용약관 컴포넌트(기능)
 * @param props
 * @returns
 */
const Term: NextPage<_cSignUpProps> = (props) => {
  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  /**
   * 이용약관 form submit handler
   * @param data
   */
  const agreeTermHandler: SubmitHandler<_fTermData> = (data) => {
    props.setStepNumber(props.stepNumber + 1);
  };

  // 화면구성에 넘겨줄 props
  const fProps: _pTermProps = {
    ...props,
    register,
    handleSubmit,
    errors,
    agreeTermHandler,
  };

  return <TermPresenter {...fProps} />;
};

export default Term;
