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
import { FormCheck, FormInput } from "../../store/interfaces";
import { FindParameters, FindResult } from "../models/base.entity";
import { Company } from "../models/company.entity";
import { User, UserAuthority } from "../models/user.entity";
import { FileInit, MbType } from "./etc.entity";
import {
  _cChangePwModalProps,
  _cMyPageAccount,
  _cWithdrawalModalProps,
} from "./_cProps.entity";
import { _fTermData, _fWithdrawal } from "./_fProps.entity";
import { _MainProps } from "./_props.entity";

/***********************************************************************
 * 기본
 ***********************************************************************/
export interface _pFindDocs<T> extends _MainProps {
  findResult: FindResult<T>;
  setFindResult: React.Dispatch<React.SetStateAction<FindResult<T>>>;
  findDocHandler: (page: number) => void;
}

/***********************************************************************
 * 회원가입
 ***********************************************************************/

// 회원가입 공통사용 props
export interface _pSignUpProps {
  user: User;
  company: Company;
  formInput: FormInput;
  formCheck: FormCheck;
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
  userAuth: UserAuthority;
  UserAuthority: typeof UserAuthority;
  setUserAuth: React.Dispatch<React.SetStateAction<UserAuthority>>;
}

//업체 조회 modal props
export interface _pComFindModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputForm: FormInput;
  setInputForm: React.Dispatch<React.SetStateAction<FormInput>>;
  setInputUser: React.Dispatch<React.SetStateAction<User>>;
  inputUser: User;
  setValue: UseFormSetValue<FieldValues>;
}

// 파일업로드 전용 props
export interface _pFileUploadProps {
  stepNumber?: number;
  setStepNumber?: React.Dispatch<React.SetStateAction<number>>;
}

/***********************************************************************
 * FindEmail & FindPassword(계정찾기)
 ***********************************************************************/

// 계정찾기(이메일) props
export interface _pFindEmail {
  findEmail: string;
  setFindEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  hpNumber: string;
  setHpNumber: React.Dispatch<React.SetStateAction<string>>;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

// 계정찾기(비밀번호) props
export interface _pFindPassword {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  hpNumber: string;
  setHpNumber: React.Dispatch<React.SetStateAction<string>>;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

/***********************************************************************
 * MyPage(마이페이지)
 ***********************************************************************/

// 계정 관리 props
export interface _pMyAccountProps extends _MainProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  accountInfo: SignUpInfo;
  setAccountInfo: React.Dispatch<React.SetStateAction<SignUpInfo>>;
}

// 직원 관리용 props
export interface _pWorkerData extends _pFindDocs<User> {}

/***********************************************************************
 * Admin
 ***********************************************************************/

// 승인관리용 props
export interface _pAdminReviewCompanies extends _pFindDocs<Company> {}

// 업체관리용 props
export interface _pAdminManCompanies extends _pFindDocs<Company> {}
