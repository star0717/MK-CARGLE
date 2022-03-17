import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { actionTypesUser, FormInput } from "../../../../../store/interfaces";
import { SignUpInfo } from "../../../../models/auth.entity";
import {
  _aGetAuthValidateComRegNumber,
  _aGetAuthCompany,
  _aPostAuthSignup,
} from "../../../../../store/action/user.action";
import { useResizeDetector } from "react-resize-detector";
import {
  CloseButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
  SmallButton,
  CommonButton,
  Combo,
  RsWrapper,
  CommonButtonWrapper,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  JoinStepBar,
  JoinStepBarWrapper,
  ColorSpan,
} from "../../../styles/CommonComponents";
import { IoIosCloseCircle } from "react-icons/io";
import { CHAR_DEL, formRegEx } from "../../../../validation/regEx";
import { Company } from "../../../../models/company.entity";
import { AxiosError } from "axios";
import { DbErrorInfo } from "../../../../models/base.entity";
import { mbTypeOption } from "../../../../configure/list.entity";
import { _pSignUpProps } from "../../../../configure/_pProps.entity";
import { AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdOutlineBusinessCenter, MdOutlineUploadFile } from "react-icons/md";

/**
 * 회원가입: 업체정보 컴포넌트(기능)
 * @param props
 * @returns
 */
const SignCompany: NextPage<_pSignUpProps> = (props) => {
  const dispatch = useDispatch();

  // state 관리
  const [inputCompany, setInputCompany] = useState<Company>({
    ...props.company,
    ownerName: props.user.name,
  }); // 업체 정보
  const [inputForm, setInputForm] = useState<FormInput>(props.formInput); // 폼에만 있는 인풋(ex. 이메일 도메인)
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달창 open 여부
  const [errBorder, setErrBorder] = useState<string>(""); // 중복에러 표시

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * 회원가입 - input 텍스트 변환 handler
   * @param e
   */
  const onInputCompanyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === "comRegNum" ||
      e.target.name === "mbRegNum" ||
      e.target.name === "phoneNum" ||
      e.target.name === "faxNum"
    ) {
      e.target.value = CHAR_DEL(e.target.value);
    }
    setInputCompany({ ...inputCompany, [e.target.name]: e.target.value });
  };

  /**
   * 사업자번호 유효성 검사 handler
   * @param e
   */
  const onComRegNumCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputCompany.comRegNum) {
      dispatch(_aGetAuthCompany(inputCompany.comRegNum)).then(
        (res: any) => {
          if (res.payload.length === 0) {
            dispatch(
              _aGetAuthValidateComRegNumber(inputCompany.comRegNum)
            ).then((res: any) => {
              if (res.payload) {
                setError("comRegNum", {
                  type: "comCheckTrue",
                  message: "사업자등록번호 인증이 완료되었습니다.",
                });
                dispatch({
                  type: actionTypesUser.FORM_CHECK,
                  payload: { ...props.formCheck, companyCheck: true },
                });
              } else {
                setError("comRegNum", {
                  type: "comCheckFalse",
                  message: "유효하지 않은 사업자등록번호입니다.",
                });
              }
            });
          } else {
            setError("comRegNum", {
              type: "comExist",
              message: "이미 가입된 사업자등록번호입니다.",
            });
          }
        },
        (err) => {
          alert("사업자등록번호 인증에 실패했습니다.");
        }
      );
    }
  };

  /**
   * 주소검색 api handler
   * @param data
   */
  const addressHandler = (data: any) => {
    let fullAddress = data.address;
    let zonecode = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setInputCompany({
      ...inputCompany,
      address1: fullAddress,
      postcode: zonecode,
    });
    setValue("address1", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  /**
   * 사업자(owner) 회원가입 form submit handler
   * @param data
   */
  const onSignUpCompanyHandler: SubmitHandler<Partial<SignUpInfo>> = (data) => {
    dispatch({ type: actionTypesUser.INPUT_COMPANY, payload: inputCompany });
    dispatch({ type: actionTypesUser.INPUT_FORM, payload: inputForm });
    if (!props.formCheck.companyCheck) {
      setError("comRegNum", {
        type: "comCheckNeed",
        message: "사업자 등록번호 인증이 필요합니다.",
      });
    } else {
      delete props.user._cID;
      dispatch(
        _aPostAuthSignup({
          user: props.user,
          company: inputCompany,
        })
      )
        .then((res: any) => {
          props.setStepNumber(props.stepNumber + 1);
          window.scrollTo(0, 0);
        })
        .catch((err: AxiosError<any, any>) => {
          const errInfo: DbErrorInfo = err.response.data;
          switch (errInfo.key) {
            case "email":
              alert("이미 가입된 이메일입니다.");
              break;
            case "hpNumber":
              alert("이미 가입된 휴대폰 번호입니다.");
              break;
            case "mbRegNum":
              alert("이미 가입된 정비업등록번호입니다.");
              break;
            case "phoneNum":
              alert("이미 가입된 업체 전화번호입니다.");
              break;
            default:
              alert("회원가입에 실패했습니다.");
              break;
          }
          dispatch({
            type: actionTypesUser.FORM_CHECK,
            payload: {
              ...props.formCheck,
              emailReadOnly: false,
              emailSend: false,
              authNumCheck: false,
              companyCheck: false,
            },
          });
          props.setStepNumber(props.stepNumber - 1);
        });
    }
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>회원가입</CommonTitle>
          <CommonSubTitle>사업자 정보를 입력해주세요.</CommonSubTitle>
        </CommonTitleWrapper>
        <JoinStepBarWrapper>
          <Wrapper width={`auto`}>
            <JoinStepBar
              kindOf={props.stepNumber === 2 ? `progress` : `complete`}
            >
              {props.stepNumber === 2 ? <AiOutlineFileText /> : <GoCheck />}
            </JoinStepBar>
            <Text height={`0px`} padding={`10px 0px 0px`}>
              약관동의
            </Text>
          </Wrapper>
          <JoinStepBar
            kindOf={props.stepNumber > 2 ? `line` : `line2`}
          ></JoinStepBar>
          <Wrapper width={`auto`}>
            <JoinStepBar
              kindOf={
                props.stepNumber < 3
                  ? `before`
                  : props.stepNumber === 3
                  ? `progress`
                  : `complete`
              }
            >
              {props.stepNumber > 3 ? <GoCheck /> : <AiOutlineUser />}
            </JoinStepBar>
            <Text height={`0px`} padding={`10px 0px 0px`}>
              계정정보
            </Text>
          </Wrapper>
          <JoinStepBar
            kindOf={props.stepNumber > 3 ? `line` : `line2`}
          ></JoinStepBar>
          <Wrapper width={`auto`}>
            <JoinStepBar
              kindOf={
                props.stepNumber < 4
                  ? `before`
                  : props.stepNumber === 4
                  ? `progress`
                  : `complete`
              }
            >
              {props.stepNumber > 4 ? <GoCheck /> : <MdOutlineBusinessCenter />}
            </JoinStepBar>
            <Text height={`0px`} padding={`10px 0px 0px`}>
              사업자정보
            </Text>
          </Wrapper>
          <JoinStepBar
            kindOf={props.stepNumber > 4 ? `line` : `line2`}
          ></JoinStepBar>
          <Wrapper width={`auto`}>
            <JoinStepBar
              kindOf={props.stepNumber === 5 ? `progress` : `before`}
            >
              <MdOutlineUploadFile />
            </JoinStepBar>
            <Text height={`0px`} padding={`10px 0px 0px`}>
              서류제출
            </Text>
          </Wrapper>
        </JoinStepBarWrapper>
        <form onSubmit={handleSubmit(onSignUpCompanyHandler)}>
          <Wrapper
            width={`auto`}
            padding={`50px`}
            border={`1px solid #ccc`}
            radius={`5px`}
          >
            {/* 상호명 */}
            <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`auto`}>
              <Text margin={`0px 0px 10px`}>
                <ColorSpan color={`#d6263b`}>*</ColorSpan>상호명{" "}
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
                  required: {
                    value: true,
                    message: "필수 입력사항입니다.",
                  },
                })}
              />
              {errors.name?.type === "required" && (
                <Text
                  margin={`0px 0px 10px 0px`}
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
              <Text margin={`0px 0px 10px`}>
                <ColorSpan color={`#d6263b`}>*</ColorSpan>사업자 등록번호
              </Text>
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
                  readOnly={props.formCheck.companyCheck}
                  placeholder="사업자 등록번호를 입력해주세요."
                  {...register("comRegNum", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      onInputCompanyHandler(e);
                    },
                    required: {
                      value: true,
                      message: "필수 입력사항입니다.",
                    },
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
                  disabled={props.formCheck.companyCheck}
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
              <Text margin={`0px 0px 10px`}>
                <ColorSpan color={`#d6263b`}>*</ColorSpan>정비업 등록번호
              </Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={inputCompany.mbRegNum}
                placeholder="정비업 등록번호를 입력해주세요."
                {...register("mbRegNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputCompanyHandler(e);
                  },
                  required: {
                    value: true,
                    message: "필수 입력사항입니다.",
                  },
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
              <Text margin={`0px 0px 10px`}>
                <ColorSpan color={`#d6263b`}>*</ColorSpan>정비업종
              </Text>
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
                {mbTypeOption.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  );
                })}
              </Combo>
              {errors.mbTypeNum?.type === "required" && (
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
              <Text margin={`0px 0px 10px`}>
                <ColorSpan color={`#d6263b`}>*</ColorSpan>대표자명
              </Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={inputCompany.ownerName}
                placeholder="대표자명을 입력해주세요."
                {...register("ownerName", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputCompanyHandler(e);
                  },
                  required: {
                    value: true,
                    message: "필수 입력사항입니다.",
                  },
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
              <Text margin={`0px 0px 10px`}>
                <ColorSpan color={`#d6263b`}>*</ColorSpan>업체 전화번호
              </Text>
              <TextInput2
                width={`400px`}
                type="text"
                value={inputCompany.phoneNum}
                placeholder="(- 제외, 지역번호 포함)"
                {...register("phoneNum", {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onInputCompanyHandler(e);
                  },
                  required: {
                    value: true,
                    message: "필수 입력사항입니다.",
                  },
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
              <Text margin={`0px 0px 10px`}>
                <ColorSpan color={`#d6263b`}>*</ColorSpan>사업자 주소
              </Text>
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
                  주소검색
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
          <CommonButtonWrapper kindOf={`column`}>
            <CommonButton
              kindOf={`white`}
              margin={`0px 0px 10px 0px`}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                props.setStepNumber(props.stepNumber - 1);
                dispatch({
                  type: actionTypesUser.INPUT_COMPANY,
                  payload: inputCompany,
                });
                dispatch({
                  type: actionTypesUser.INPUT_FORM,
                  payload: inputForm,
                });
                window.scrollTo(0, 0);
              }}
            >
              이전
            </CommonButton>
            <CommonButton margin={`10px 0px 0px 0px`} type="submit">
              완료
            </CommonButton>
          </CommonButtonWrapper>
        </form>
      </RsWrapper>
      <Modal
        isOpen={modalOpen}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(71, 71, 71, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            background: "white",
            width: "45rem",
            height: "575px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "calc(100vh - 2rem)",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "0.3rem",
            boxShadow: "0px 10px 15px rgba(61,61,61,1)",
            inset: 0,
          },
        }}
      >
        <Wrapper fontSize={`28px`} al={`flex-end`}>
          <CloseButton onClick={closeModal}>
            <IoIosCloseCircle />
          </CloseButton>
        </Wrapper>
        <DaumPostcode onComplete={addressHandler} style={{ height: "500px" }} />
      </Modal>
    </WholeWrapper>
  );
};

export default SignCompany;
