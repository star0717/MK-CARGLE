import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import React from "react";
import { basicRegEx, CHAR_DEL, formRegEx } from "../../../../validation/regEx";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";

const CompanyPresenter: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // 필요한 props 재정의
  const register = props.register;
  const handleSubmit = props.handleSubmit;
  const errors = props.errors;
  const onSignUpCompanyHandler = props.onSignUpCompanyHandler;
  const inputCompany = props.inputCompany;
  const onInputCompanyHandler = props.onInputCompanyHandler;
  const formCheck = props.formCheck;
  const onComRegNumCheck = props.onComRegNumCheck;
  const inputForm = props.inputForm;
  const onInputFormHandler = props.onInputFormHandler;
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <Wrapper>
        <form onSubmit={handleSubmit(onSignUpCompanyHandler)}>
          <Wrapper>
            {/* 상호명 */}
            <Text>
              *상호명{" "}
              <small>(사업자등록증에 등록한 상호명을 입력해주세요.)</small>
            </Text>
            <TextInput
              type="text"
              value={inputCompany.name}
              placeholder="상호명을 입력해주세요."
              {...register("name", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
              })}
            />
            {errors.name?.type === "required" && (
              <Text>{errors.name.message}</Text>
            )}
            {/* 사업자등록번호 */}
            <Text>*사업자 등록번호</Text>
            <TextInput
              type="text"
              value={CHAR_DEL(inputCompany.comRegNum)}
              readOnly={formCheck.companyCheck}
              placeholder="사업자 등록번호를 입력해주세요."
              {...register("comRegNum", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.COMPANY_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.comRegNum?.type === "required" ||
              errors.comRegNum?.type === "pattern" ||
              errors.comRegNum?.type === "comCheckFalse" ||
              errors.comRegNum?.type === "comExist" ||
              errors.comRegNum?.type === "comCheckNeed") && (
              <Text>{errors.comRegNum.message}</Text>
            )}
            {errors.comRegNum?.type === "comCheckTrue" && (
              <Text>{errors.comRegNum.message}</Text>
            )}
            <button
              type="button"
              onClick={onComRegNumCheck}
              disabled={formCheck.companyCheck}
            >
              인증
            </button>
            {/* 정비업등록번호 */}
            <Text>*정비업 등록번호</Text>
            <TextInput
              type="text"
              value={CHAR_DEL(inputCompany.mbRegNum)}
              placeholder="정비업 등록번호를 입력해주세요."
              {...register("mbRegNum", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.MB_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.mbRegNum?.type === "required" ||
              errors.mbRegNum?.type === "pattern") && (
              <Text>{errors.mbRegNum.message}</Text>
            )}
            {/* 정비업종 */}
            <Text>*정비업종</Text>
            <select
              style={{ width: "100%" }}
              value={inputCompany.mbTypeNum}
              {...register("mbTypeNum", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                required: true,
              })}
            >
              <option value="">정비업종 선택</option>
              <option value="1급">자동차종합정비업</option>
            </select>
            {errors.mbTypeNum?.type === "required" && (
              <Text>필수 선택사항입니다.</Text>
            )}
            {/* 대표자명 */}
            <Text>*대표자명</Text>
            <TextInput
              type="text"
              value={inputCompany.ownerName}
              placeholder="대표자명을 입력해주세요."
              {...register("ownerName", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
              })}
            />
            {errors.ownerName?.type === "required" && (
              <Text>{errors.ownerName.message}</Text>
            )}
            {/* 사업자 전화번호 */}
            <Text>*업체 전화번호</Text>
            <TextInput
              type="text"
              value={CHAR_DEL(inputCompany.phoneNum)}
              placeholder="(- 제외, 지역번호 포함)"
              {...register("phoneNum", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                required: { value: true, message: "필수 입력사항입니다." },
                pattern: {
                  value: formRegEx.PH_NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {(errors.phoneNum?.type === "required" ||
              errors.phoneNum?.type === "pattern") && (
              <Text>{errors.phoneNum.message}</Text>
            )}
            {/* 사업자 팩스번호 */}
            <Text>업체 팩스번호(선택)</Text>
            <TextInput
              type="text"
              value={CHAR_DEL(inputCompany.faxNum)}
              placeholder="(- 제외)"
              {...register("faxNum", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                pattern: {
                  value: basicRegEx.NUM,
                  message: "형식에 맞게 입력하세요.",
                },
              })}
            />
            {errors.faxNum?.type === "pattern" && (
              <Text>{errors.faxNum.message}</Text>
            )}
            {/* 업체 주소 */}
            <Text>*사업자 주소</Text>
            <TextInput
              type="text"
              placeholder="주소를 입력해주세요."
              value={inputForm.cAddressMain}
              readOnly
              {...register("cAddressMain", {
                required: { value: true, message: "필수 입력사항입니다." },
              })}
            />
            {errors.cAddressMain?.type === "required" && (
              <Text>{errors.cAddressMain.message}</Text>
            )}
            <button
              type="button"
              onClick={(e) => {
                setModalOpen(!modalOpen);
              }}
            >
              주소 검색
            </button>
            <TextInput
              style={{ width: "100%" }}
              type="text"
              placeholder="상세 주소"
              value={inputForm.cAddressDetail}
              readOnly={inputForm.cAddressMain ? false : true}
              {...register("cAddressDetail", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputFormHandler(e);
                },
              })}
            />
          </Wrapper>
          <Wrapper>
            <button
              onClick={(e) => {
                setStepNumber(stepNumber - 1);
                dispatch({
                  type: actionTypesUser.INPUT_COMPANY,
                  payload: inputCompany,
                });
                dispatch({
                  type: actionTypesUser.INPUT_FORM,
                  payload: inputForm,
                });
              }}
            >
              이전
            </button>
            <button type="submit">완료</button>
          </Wrapper>
        </form>
      </Wrapper>
    </WholeWrapper>
  );
};

export default CompanyPresenter;
