import React from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { SignUpInfo, UserInfo } from "../../src/models/auth.entity";
import { FormInput } from "../../store/interfaces";
import { FindParameters, FindResult } from "../models/base.entity";
import { Company } from "../models/company.entity";
import { User } from "../models/user.entity";
import { FileInit, MbType } from "./etc.entity";
import {
  _cChangePwModalProps,
  _cComFindModalProps,
  _cMyPageAccount,
  _cSignUpProps,
  _cWithdrawalModalProps,
} from "./_cProps.entity";
import { _fTermData, _fWithdrawal } from "./_fProps.entity";
import { _MainProps } from "./_props.entity";

// 화면구성(presenter) props //

/**
 * 로그인 화면구성 props
 */
export interface _pSignInProps {
  onSignInHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  inputSignIn: UserInfo;
  onInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveCheck: boolean;
  setSaveCheck: React.Dispatch<React.SetStateAction<boolean>>;
  userInit: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * 회원가입: 가입유형 화면구성 props
 */
export interface _pSelectUserProps extends _cSignUpProps {}

/**
 * 회원가입: 이용약관 화면구성 props
 */
export interface _pTermProps extends _cSignUpProps {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: {
    [x: string]: any;
  };
  agreeTermHandler: SubmitHandler<_fTermData>;
}

/**
 * 회원가입: 계정정보 화면구성 props
 */
export interface _pSignAccountProps extends _cSignUpProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: {
    [x: string]: any;
  };
  setValue: UseFormSetValue<FieldValues>;
  inputForm: FormInput;
  setInputForm: React.Dispatch<React.SetStateAction<FormInput>>;
  inputUser: User;
  setInputUser: React.Dispatch<React.SetStateAction<User>>;
  modalOption: string;
  setModalOption: React.Dispatch<React.SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addressHandler: (data: any) => void;
  onInputFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputUserHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailSendHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  authNum: string;
  setAuthNum: React.Dispatch<React.SetStateAction<string>>;
  onAuthNumCheckHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSignUpUserHandler: SubmitHandler<SignUpInfo>;
}

/**
 * 회원가입: 업체검색 모달 화면구성 props
 */
export interface _pComFindModalProps extends _cComFindModalProps {
  findCompanyHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  companyList: any;
}

/**
 * 회원가입: 업체정보 화면구성 props
 */
export interface _pSignCompanyProps extends _cSignUpProps {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: {
    [x: string]: any;
  };
  onSignUpCompanyHandler: SubmitHandler<SignUpInfo>;
  inputCompany: Company;
  onInputCompanyHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onComRegNumCheck: (e: React.MouseEvent<HTMLButtonElement>) => void;
  inputForm: FormInput;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 회원가입: 파일업로드 화면구성 props
 */
export interface _pFileUploadProps {
  fileName: FileInit;
  file: FileInit;
  onFileUploadHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  onFileSelectHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSignOutHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * 회원가입: 승인대기 화면구성 props
 */
export interface _pApprovalProps {
  onSignOutHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * 회원가입: 가입완료 화면구성 props
 */
export interface _pCompleteProps {
  onSignOutHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * 계정찾기: 이메일 props
 */
export interface _pFindEmail {
  findEmail: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  hpNumber: string;
  setHpNumber: React.Dispatch<React.SetStateAction<string>>;
  onfindEmailHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * 계정찾기: 비밀번호 props
 */
export interface _pFindPassword {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  hpNumber: string;
  setHpNumber: React.Dispatch<React.SetStateAction<string>>;
  onFindPwHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * 마이페이지(계정관리): 비밀번호 확인 props
 */
export interface _pAccountCheckProps {
  pwCheckHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * 마이페이지(계정관리): 회원정보 수정 props
 */
export interface _pAccountInfoProps extends _cMyPageAccount {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  onChangeInfoHandler: SubmitHandler<SignUpInfo>;
  userData: User;
  onInputUserHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  comData: Company;
  onInputComHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
  stampImgSrc: string;
  setStampImgSrc: React.Dispatch<React.SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOption: React.Dispatch<React.SetStateAction<string>>;
  textMbType: MbType;
}

/**
 * 마이페이지(계정관리): 비밀번호 변경 modal props
 */
export interface _pChangePwModalProps extends _cChangePwModalProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  watch: UseFormWatch<FieldValues>;
  onChangePwHandler: SubmitHandler<any>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  newPasswordCheck: string;
  setNewPasswordCheck: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * 마이페이지(계정관리): 도장 업로드 modal props
 */
export interface _pStampModalProps {
  fileName: string;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  upImg: any;
  onLoad: (img: any) => void;
  crop: any;
  setCrop: React.Dispatch<any>;
  completedCrop: any;
  setCompletedCrop: React.Dispatch<any>;
  previewCanvasRef: React.MutableRefObject<any>;
  stampFileUpload: (canvas: any, crop: any) => void;
}

/**
 * 마이페이지(계정관리): 회원탈퇴 props
 */
export interface _pWithdrawalProps extends _cMyPageAccount {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  pwCheckHandler: SubmitHandler<_fWithdrawal>;
  termCheck: boolean;
  setTermCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 마이페이지(계정관리): 회원탈퇴 modal props
 */
export interface _pWithdrawalModalProps extends _cWithdrawalModalProps {
  withdrawalHandler: () => void;
}

/**
 * 마이페이지(직원관리): 직원 리스트 props
 */
export interface _pWorkerInfoProps extends _pWorkerData {}

/**
 * 마이페이지(직원관리): 직원 데이터 props
 */

export interface _pFindDocs<T> extends _MainProps {
  findResult: FindResult<T>;
  setFindResult: React.Dispatch<React.SetStateAction<FindResult<T>>>;
  findDocHandler: (page: number) => void;
}

export interface _pWorkerData extends _pFindDocs<User> {}

// ADMIN_REVIEW_COMPANIES용 props
export interface _pADMIN_REVIEW_COMPANIES extends _pFindDocs<Company> {}
