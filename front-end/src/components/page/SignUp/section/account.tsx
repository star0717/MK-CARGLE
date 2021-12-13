import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { useInterval } from "react-use";
import { useDispatch } from "react-redux";
import { actionTypesUser, FormInput } from "../../../../../store/interfaces";
import { CHAR_DEL, formRegEx } from "../../../../validation/regEx";
import {
  authNumCheckAction,
  emailSendAction,
  signUpUserAction,
} from "../../../../../store/action/user.action";
import { SignUpInfo } from "../../../../models/auth.entity";
import DaumPostcode from "react-daum-postcode";
import CompanyFindModal from "./comFindModal";
import { User, UserAuthority } from "../../../../models/user.entity";
import { initialState } from "../../../../../store/reducer/user.reducer";
import AccountPresenter from "./accountPresenter";
import {
  CloseButton,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import { IoIosCloseCircle } from "react-icons/io";

// modal setting
Modal.setAppElement("body");

const Account: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const user = props.user;
  const formInput = props.formInput;
  const formCheck = props.formCheck;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const userAuth = props.userAuth;

  const [inputUser, setInputUser] = useState<User>(user); // 사용자 정보
  const [inputForm, setInputForm] = useState<FormInput>(formInput); // 폼에만 있는 인풋(ex. 이메일 도메인)
  const [timer, setTimer] = useState<number>(0); // 인증번호 유효시간 타이머
  const [authNum, setAuthNum] = useState<string>(""); // 인증번호 input
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달창 open 여부
  const [modalOption, setModalOption] = useState<string>("");

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
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
  // 사용자 정보
  const onInputUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "hpNumber") {
      e.target.value = CHAR_DEL(e.target.value);
    }
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };
  // 그 외 form 정보
  const onInputFormHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  // 이메일 인증번호 전송 handler
  const onEmailSendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const email = `${inputForm.emailAddress}@${inputForm.emailDomain}`;
    if (formRegEx.EMAIL.test(inputUser.email)) {
      dispatch(emailSendAction(inputUser.email)).then((res: any) => {
        if (res.payload) {
          alert("인증번호가 전송되었습니다.");
          dispatch({
            type: actionTypesUser.FORM_CHECK,
            payload: { ...formCheck, emailSend: true },
          });
          clearErrors("email");
          setTimer(300);
        } else {
          setError("email", {
            type: "emailExist",
            message: "이미 등록된 이메일입니다.",
          });
        }
      });
    } else {
      setError("email", {
        type: "emailNull",
        message: "형식에 맞게 입력하세요.",
      });
    }
  };

  // 인증번호 타이머
  useInterval(
    () => {
      setTimer(timer - 1);
    },
    formCheck.emailSend ? 1000 : null
  );

  // 인증번호 만료 시 emailSend state 변경
  useEffect(() => {
    if (timer === 0) {
      if (
        !Cookies.get("mk_amtn") &&
        formCheck.emailSend &&
        !formCheck.authNumCheck
      ) {
        alert("인증번호가 만료되었습니다.");
        setAuthNum("");
        dispatch({
          type: actionTypesUser.FORM_CHECK,
          payload: { ...formCheck, emailSend: false },
        });
      }
    }
  }, [timer, formCheck]);

  // 인증번호 검사 handler
  const onAuthNumCheckHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (authNum) {
      dispatch(authNumCheckAction(authNum)).then((res: any) => {
        if (res.payload) {
          alert("인증되었습니다.");
          setTimer(0);
          dispatch({
            type: actionTypesUser.FORM_CHECK,
            payload: { ...formCheck, authNumCheck: true, emailSend: false },
          });
          setAuthNum("");
          Cookies.remove("mk_amtn");
        } else {
          alert("인증번호가 일치하지 않습니다.");
          setAuthNum("");
        }
      });
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

    setInputUser({ ...inputUser, address1: fullAddress, postcode: zonecode });
    setValue("address1", fullAddress, { shouldValidate: true });
    setModalOpen(false);
  };

  // 직원(worker) 회원가입 form submit handler
  const onSignUpUserHandler: SubmitHandler<SignUpInfo> = (data) => {
    if (!formCheck.authNumCheck) {
      alert("이메일 인증을 해주세요.");
    } else {
      if (userAuth === UserAuthority.OWNER) {
        dispatch({ type: actionTypesUser.INPUT_FORM, payload: inputForm });
        dispatch({ type: actionTypesUser.INPUT_ACCOUNT, payload: inputUser });
        setStepNumber(stepNumber + 1);
      } else {
        dispatch(
          signUpUserAction({
            user: inputUser,
          })
        ).then(
          (res: any) => {
            setStepNumber(stepNumber + 1);
          },
          (err) => {
            if (err.response.status === 400) {
              alert("회원가입에 실패했습니다.");
              dispatch({
                type: actionTypesUser.FORM_CHECK,
                payload: initialState.formCheck,
              });
            }
          }
        );
        setStepNumber(stepNumber + 1);
      }
    }
  };

  console.log(inputUser);

  // MODAL에 넘길 props
  const ComfindModalProps = {
    setModalOpen,
    inputForm,
    setInputForm,
    setInputUser,
    inputUser,
    setValue,
  };

  // 화면구성에 넘길 props
  const fProps = {
    ...props,
    handleSubmit,
    register,
    watch,
    errors,
    setValue,
    inputForm,
    setInputForm,
    formInput,
    formCheck,
    inputUser,
    setInputUser,
    modalOption,
    setModalOption,
    modalOpen,
    setModalOpen,
    addressHandler,
    onInputFormHandler,
    onInputUserHandler,
    onEmailSendHandler,
    authNum,
    setAuthNum,
    onAuthNumCheckHandler,
    stepNumber,
    setStepNumber,
    onSignUpUserHandler,
  };

  return (
    <WholeWrapper>
      <AccountPresenter {...fProps} />
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
          <Wrapper fontSize={`28px`} al={`flex-end`}>
            <CloseButton onClick={closeModal}>
              <IoIosCloseCircle color={`#0066ff`} />
            </CloseButton>
          </Wrapper>
          {modalOption === "address" ? (
            <DaumPostcode
              onComplete={addressHandler}
              style={{ height: "500px" }}
            />
          ) : (
            <CompanyFindModal {...ComfindModalProps} />
          )}
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default Account;
