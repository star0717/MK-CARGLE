import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
  SmallButton,
  CommonButton,
  Combo,
  JoinStepBarWrapper,
  JoinStepBar,
} from "../../../styles/CommonComponents";
import React from "react";
import { basicRegEx, formRegEx } from "../../../../validation/regEx";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { GoCheck } from "react-icons/go";

const CompanyPresenter: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // 필요한 props 재정의
  const register = props.register;
  const handleSubmit = props.handleSubmit;
  const errors = props.errors;
  const onSignUpCompanyHandler = props.onSignUpCompanyHandler;
  const inputCompany = props.inputCompany;
  const inputForm = props.inputForm;
  const onInputCompanyHandler = props.onInputCompanyHandler;
  const formCheck = props.formCheck;
  const onComRegNumCheck = props.onComRegNumCheck;
  // const inputForm = props.inputForm;
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <form onSubmit={handleSubmit(onSignUpCompanyHandler)}>
        <Wrapper
          width={`auto`}
          padding={`50px`}
          border={`1px solid #ccc`}
          radius={`5px`}
        >
          <Wrapper>
            {/* 상호명 */}
            <Wrapper
              al={`flex-start`}
              ju={`flex-start`}
              margin={`0px 0px 10px`}
              width={`auto`}
            >
              <Text margin={`0px 0px 10px`}>
                *상호명{" "}
                <small>(사업자등록증에 등록한 상호명을 입력해주세요.)</small>
              </Text>
              <TextInput2
                width={`400px`}
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
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.name.message}
                </Text>
              )}
            </Wrapper>
            {/* 사업자등록번호 */}
            <Wrapper
              ju={`flex-start`}
              al={`flex-start`}
              margin={`0px 0px 10px`}
              width={`auto`}
            >
              <Text margin={`0px 0px 10px`}>*사업자 등록번호</Text>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`0px 0px 10px`}
                width={`400px`}
              >
                <TextInput2
                  width={`300px`}
                  type="text"
                  value={inputCompany.comRegNum}
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
                <SmallButton
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  type="button"
                  onClick={onComRegNumCheck}
                  disabled={formCheck.companyCheck}
                >
                  인증
                </SmallButton>
              </Wrapper>
              {(errors.comRegNum?.type === "required" ||
                errors.comRegNum?.type === "pattern" ||
                errors.comRegNum?.type === "comCheckFalse" ||
                errors.comRegNum?.type === "comExist" ||
                errors.comRegNum?.type === "comCheckNeed") && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.comRegNum.message}
                </Text>
              )}
              {errors.comRegNum?.type === "comCheckTrue" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#1ccd8d`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.comRegNum.message}
                </Text>
              )}
            </Wrapper>
            {/* 정비업등록번호 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*정비업 등록번호</Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={inputCompany.mbRegNum}
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
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.mbRegNum.message}
                </Text>
              )}
            </Wrapper>
            {/* 정비업종 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*정비업종</Text>
              <Combo
                width={`400px`}
                margin={`0px`}
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
              </Combo>
              {errors.mbTypeNum?.type === "required" && (
                <Text>필수 선택사항입니다.</Text>
              )}
            </Wrapper>
            {/* 대표자명 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*대표자명</Text>
              <TextInput2
                width={`400px`}
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
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.ownerName.message}
                </Text>
              )}
            </Wrapper>
            {/* 사업자 전화번호 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*업체 전화번호</Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={inputCompany.phoneNum}
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
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.phoneNum.message}
                </Text>
              )}
            </Wrapper>
            {/* 사업자 팩스번호 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>업체 팩스번호(선택)</Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={inputCompany.faxNum}
                placeholder="(- 제외)"
                {...register("faxNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputCompanyHandler(e);
                  },
                  pattern: {
                    value: formRegEx.FAX_NUM,
                    message: "형식에 맞게 입력하세요.",
                  },
                })}
              />
              {errors.faxNum?.type === "pattern" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {errors.faxNum.message}
                </Text>
              )}
            </Wrapper>
            {/* 업체 주소 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*사업자 주소</Text>
              <Wrapper dr={`row`}>
                <TextInput2
                  width={`300px`}
                  type="text"
                  placeholder="주소를 입력해주세요."
                  value={inputCompany.address1}
                  readOnly
                  {...register("address1", {
                    required: true,
                  })}
                />
                <SmallButton
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setModalOpen(!modalOpen);
                  }}
                >
                  주소 검색
                </SmallButton>
              </Wrapper>
            </Wrapper>
            <TextInput2
              width={`400px`}
              type="text"
              placeholder="상세 주소"
              value={inputCompany.address2}
              readOnly={inputCompany.address1 ? false : true}
              {...register("address2", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  onInputCompanyHandler(e);
                },
                required: true,
              })}
            />
            {(errors.address1?.type === "required" ||
              errors.address2?.type === "required") && (
              <Text
                margin={`0px 0px 10px 0px`}
                width={`100%`}
                color={`#d6263b`}
                al={`flex-start`}
                fontSize={`14px`}
                textAlign={`left`}
              >
                필수 입력사항입니다.
              </Text>
            )}
          </Wrapper>
        </Wrapper>
        <Wrapper padding={`50px 0px 100px 0px`}>
          <CommonButton
            kindOf={`white`}
            margin={`0px 0px 10px 0px`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
          </CommonButton>
          <CommonButton margin={`10px 0px 0px 0px`} type="submit">
            완료
          </CommonButton>
        </Wrapper>
      </form>
    </WholeWrapper>
  );
};

export default CompanyPresenter;
