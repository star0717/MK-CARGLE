import React from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { AuthTokenInfo, SignUpInfo } from "../../src/models/auth.entity";
import { FormCheck, FormInput } from "../../store/interfaces";
import { FindResult } from "../models/base.entity";
import { Company } from "../models/company.entity";
import { User, UserAuthority } from "../models/user.entity";
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
 * 레이아웃
 ***********************************************************************/
export interface _pLayoutProps {
  tokenValue?: AuthTokenInfo;
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
export interface _pMyPageAccountProps extends _MainProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  accountInfo: SignUpInfo;
  setAccountInfo: React.Dispatch<React.SetStateAction<SignUpInfo>>;
}

// 비밀번호 변경 modal props
export interface _pChangePwModalProps extends _pMyPageAccountProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style: {
    height: string;
  };
}

// 도장 업로드 modal props
export interface _pStampModalProps {
  stampNum: number;
  setStampNum: React.Dispatch<React.SetStateAction<number>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stampImgSrc: string;
  setStampImgSrc: React.Dispatch<React.SetStateAction<string>>;
  style: {
    height: string;
  };
}

// 회원탈퇴 modal props
export interface _pWithdrawalModalProps {
  password: string;
  accountInfo: SignUpInfo;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style: {
    height: string;
  };
}

// 직원 관리용 props
export interface _pWorkerDataProps extends _pFindDocs<User> {
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  clickDoc?: User;
  style?: {
    height: string;
  };
}

// // 직원정보 modal props
// export interface _pWorkerInfoModalProps extends _pWorkerDataProps {
//   setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   clickDoc: User;
//   style: {
//     height: string;
//   };
// }

/***********************************************************************
 * Admin
 ***********************************************************************/

// 승인관리용 props
export interface _pAdminReviewCompanies extends _pFindDocs<Company> {}

// 업체관리용 props
export interface _pAdminManCompanies extends _pFindDocs<Company> {}
