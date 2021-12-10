import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { actionTypesUser } from "../../../../../store/interfaces";
import { SignUpInfo } from "../../../../models/auth.entity";
import {
  companyCheckAction,
  companyFindAction,
  signUpUserAction,
} from "../../../../../store/action/user.action";
import { initialState } from "../../../../../store/reducer/user.reducer";
import CompanyPresenter from "./companyPresenter";
import { WholeWrapper, Wrapper } from "../../../styles/CommonComponents";
import { IoIosCloseCircle } from 'react-icons/io';

// modal setting
Modal.setAppElement("body");

const Company: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const user = props.user;
  const company = props.company;
  const formInput = props.formInput;
  const formCheck = props.formCheck;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;

  const [inputCompany, setInputCompany] = useState({
    ...company,
    ownerName: user.name,
  }); // 업체 정보
  const [inputForm, setInputForm] = useState(formInput); // 폼에만 있는 인풋(ex. 이메일 도메인)
  const [modalOpen, setModalOpen] = useState(false); // 모달창 open 여부

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // modal 창 닫기 기능
  const closeModal = () => {
    setModalOpen(false);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  // 회원가입 - input 값 입력 시 텍스트 변환을 위한 handler
  // 업체 정보
  const onInputCompanyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCompany({ ...inputCompany, [e.target.name]: e.target.value });
  };
  // 그 외 form 정보
  const onInputFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  // 사업자번호 유효성 검사 handler
  const onComRegNumCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputCompany.comRegNum) {
      dispatch(companyFindAction(inputCompany.comRegNum)).then(
        (res: any) => {
          if (res.payload.length === 0) {
            dispatch(companyCheckAction(inputCompany.comRegNum)).then(
              (res: any) => {
                if (res.payload) {
                  setError("comRegNum", {
                    type: "comCheckTrue",
                    message: "사업자등록번호 인증이 완료되었습니다.",
                  });
                  dispatch({
                    type: actionTypesUser.FORM_CHECK,
                    payload: { ...formCheck, companyCheck: true },
                  });
                } else {
                  setError("comRegNum", {
                    type: "comCheckFalse",
                    message: "유효하지 않은 사업자등록번호입니다.",
                  });
                }
              }
            );
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

  // 주소 검색 api handler
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

  // 사업자(owner) 회원가입 form submit handler
  const onSignUpCompanyHandler: SubmitHandler<SignUpInfo> = (data) => {
    dispatch({ type: actionTypesUser.INPUT_COMPANY, payload: inputCompany });
    dispatch({ type: actionTypesUser.INPUT_FORM, payload: inputForm });
    if (!formCheck.companyCheck) {
      setError("comRegNum", {
        type: "comCheckNeed",
        message: "사업자 등록번호 인증이 필요합니다.",
      });
    } else {
      delete user._cID;
      dispatch(
        signUpUserAction({
          user: {
            ...user,
            email: `${formInput.emailAddress}@${formInput.emailDomain}`,
          },
          company: {
            ...inputCompany,
          },
        })
      ).then(
        (res: any) => {
          setStepNumber(stepNumber + 1);
        },
        (err) => {
          if (err.response.status === 400) {
            alert("회원가입에 실패했습니다.");
            setStepNumber(stepNumber - 1);
            dispatch({
              type: actionTypesUser.FORM_CHECK,
              payload: initialState.formCheck,
            });
          }
        }
      );
    }
  };

  // 화면구성에 넘길 props
  const fProps = {
    ...props,
    register,
    handleSubmit,
    errors,
    onSignUpCompanyHandler,
    inputCompany,
    onInputCompanyHandler,
    onComRegNumCheck,
    inputForm,
    onInputFormHandler,
    modalOpen,
    setModalOpen,
  };

  return (
    <WholeWrapper>
      <CompanyPresenter {...fProps} />
      <Wrapper>
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 1020,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(255, 255, 255, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "45rem",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              inset: 0,
            },
          }}
        >
          <button type="button" onClick={closeModal}>
            <IoIosCloseCircle />
          </button>
          <DaumPostcode
            onComplete={addressHandler}
            style={{ height: "500px" }}
          />
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Company;
