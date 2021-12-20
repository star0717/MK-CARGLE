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
} from "../../../styles/CommonComponents";
import React from "react";
import { formRegEx } from "../../../../validation/regEx";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { _pSignCompanyProps } from "../../../../configure/_pProps.entity";
import { mbTypeOption } from "../../../../configure/list.entity";

/**
 * 회원가입: 업체정보 컴포넌트(화면)
 * @param props
 * @returns
 */
const SignCompanyPresenter: NextPage<_pSignCompanyProps> = (props) => {
  const dispatch = useDispatch();

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <form onSubmit={props.handleSubmit(props.onSignUpCompanyHandler)}>
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
                value={props.inputCompany.name}
                placeholder="상호명을 입력해주세요."
                {...props.register("name", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputCompanyHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                })}
              />
              {props.errors.name?.type === "required" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.name.message}
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
                  value={props.inputCompany.comRegNum}
                  readOnly={props.formCheck.companyCheck}
                  placeholder="사업자 등록번호를 입력해주세요."
                  {...props.register("comRegNum", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      props.onInputCompanyHandler(e);
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
                  onClick={props.onComRegNumCheck}
                  disabled={props.formCheck.companyCheck}
                >
                  인증
                </SmallButton>
              </Wrapper>
              {(props.errors.comRegNum?.type === "required" ||
                props.errors.comRegNum?.type === "pattern" ||
                props.errors.comRegNum?.type === "comCheckFalse" ||
                props.errors.comRegNum?.type === "comExist" ||
                props.errors.comRegNum?.type === "comCheckNeed") && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.comRegNum.message}
                </Text>
              )}
              {props.errors.comRegNum?.type === "comCheckTrue" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#1ccd8d`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.comRegNum.message}
                </Text>
              )}
            </Wrapper>
            {/* 정비업등록번호 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*정비업 등록번호</Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={props.inputCompany.mbRegNum}
                placeholder="정비업 등록번호를 입력해주세요."
                {...props.register("mbRegNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputCompanyHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                  pattern: {
                    value: formRegEx.MB_NUM,
                    message: "형식에 맞게 입력하세요.",
                  },
                })}
              />
              {(props.errors.mbRegNum?.type === "required" ||
                props.errors.mbRegNum?.type === "pattern") && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.mbRegNum.message}
                </Text>
              )}
            </Wrapper>
            {/* 정비업종 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*정비업종</Text>
              <Combo
                width={`400px`}
                margin={`0px`}
                value={props.inputCompany.mbTypeNum}
                {...props.register("mbTypeNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputCompanyHandler(e);
                  },
                  required: true,
                })}
              >
                <option value="">정비업종 선택</option>
                {/* <option value="1급">자동차종합정비업</option> */}
                {mbTypeOption.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  );
                })}
              </Combo>
              {props.errors.mbTypeNum?.type === "required" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  필수 선택사항입니다.
                </Text>
              )}
            </Wrapper>
            {/* 대표자명 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*대표자명</Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={props.inputCompany.ownerName}
                placeholder="대표자명을 입력해주세요."
                {...props.register("ownerName", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputCompanyHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                })}
              />
              {props.errors.ownerName?.type === "required" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.ownerName.message}
                </Text>
              )}
            </Wrapper>
            {/* 사업자 전화번호 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>*업체 전화번호</Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={props.inputCompany.phoneNum}
                placeholder="(- 제외, 지역번호 포함)"
                {...props.register("phoneNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputCompanyHandler(e);
                  },
                  required: { value: true, message: "필수 입력사항입니다." },
                  pattern: {
                    value: formRegEx.PH_NUM,
                    message: "형식에 맞게 입력하세요.",
                  },
                })}
              />
              {(props.errors.phoneNum?.type === "required" ||
                props.errors.phoneNum?.type === "pattern") && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.phoneNum.message}
                </Text>
              )}
            </Wrapper>
            {/* 사업자 팩스번호 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>업체 팩스번호(선택)</Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={props.inputCompany.faxNum}
                placeholder="(- 제외)"
                {...props.register("faxNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    props.onInputCompanyHandler(e);
                  },
                  pattern: {
                    value: formRegEx.FAX_NUM,
                    message: "형식에 맞게 입력하세요.",
                  },
                })}
              />
              {props.errors.faxNum?.type === "pattern" && (
                <Text
                  margin={`0px 0px 10px 0px`}
                  width={`100%`}
                  color={`#d6263b`}
                  al={`flex-start`}
                  fontSize={`14px`}
                  textAlign={`left`}
                >
                  {props.errors.faxNum.message}
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
                  value={props.inputCompany.address1}
                  readOnly
                  {...props.register("address1", {
                    required: true,
                  })}
                />
                <SmallButton
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    props.setModalOpen(!props.modalOpen);
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
              value={props.inputCompany.address2}
              readOnly={props.inputCompany.address1 ? false : true}
              {...props.register("address2", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  props.onInputCompanyHandler(e);
                },
                required: true,
              })}
            />
            {(props.errors.address1?.type === "required" ||
              props.errors.address2?.type === "required") && (
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
              props.setStepNumber(props.stepNumber - 1);
              dispatch({
                type: actionTypesUser.INPUT_COMPANY,
                payload: props.inputCompany,
              });
              dispatch({
                type: actionTypesUser.INPUT_FORM,
                payload: props.inputForm,
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

export default SignCompanyPresenter;
