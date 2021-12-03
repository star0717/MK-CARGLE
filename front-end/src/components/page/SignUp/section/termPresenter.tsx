import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  CommonButton,
} from "../../../styles/CommonComponents";
import React from "react";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";

const TermPresenter: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const formCheck = props.formCheck;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const handleSubmit = props.handleSubmit;
  const agreeTermHandler = props.agreeTermHandler;
  const register = props.register;
  const errors = props.errors;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <form onSubmit={handleSubmit(agreeTermHandler)}>
          <Wrapper>
            <Text>CARGLE 서비스 이용 약관(필수)</Text>
            <Text>내용</Text>
            <input
              type="checkbox"
              checked={formCheck.mkTerm}
              {...register("mkTerm", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch({
                    type: actionTypesUser.FORM_CHECK,
                    payload: { ...formCheck, mkTerm: e.target.checked },
                  });
                },
                required: true,
              })}
            />
            {errors.mkTerm && (
              <p style={{ margin: "0", fontSize: "8px", color: "red" }}>
                필수사항입니다.
              </p>
            )}
          </Wrapper>
          <Wrapper>
            <Text>개인정보 수집 및 이용 약관(필수)</Text>
            <Text>내용</Text>
            <input
              type="checkbox"
              checked={formCheck.privacyTerm}
              {...register("privacyTerm", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch({
                    type: actionTypesUser.FORM_CHECK,
                    payload: { ...formCheck, privacyTerm: e.target.checked },
                  });
                },
                required: true,
              })}
            />
            {errors.privacyTerm && (
              <p style={{ margin: "0", fontSize: "8px", color: "red" }}>
                필수사항입니다.
              </p>
            )}
          </Wrapper>
          <Wrapper>
            <Text>마케팅 정보 수신 동의(선택)</Text>
            <Text>내용</Text>
            <input
              type="checkbox"
              checked={formCheck.marketTerm}
              {...register("marketTerm", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch({
                    type: actionTypesUser.FORM_CHECK,
                    payload: { ...formCheck, marketTerm: e.target.checked },
                  });
                },
              })}
            />
          </Wrapper>
          <Wrapper style={{ textAlign: "center" }}>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setStepNumber(stepNumber - 1);
              }}
            >
              이전
            </CommonButton>
            <CommonButton type="submit">다음</CommonButton>
          </Wrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default TermPresenter;
