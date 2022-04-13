import React from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { AuthTokenInfo, SignUpInfo } from "../models/auth.entity";
import { FormCheck, FormInput } from "../../store/interfaces";
import { UserAuthority } from "../constants/model.const";
import { FindResult } from "../models/base.entity";
import { Company } from "../models/company.entity";
import { User } from "../models/user.entity";
import { _fFileCheck, _fTermData, _fWithdrawal } from "./_fProps.entity";
import { _MainProps } from "./_props.entity";
import { Part } from "../models/part.entity";
import { PartsSet } from "src/models/partsset.entity";
import { Maintenance, MainWork } from "src/models/maintenance.entity";
import { Estimate } from "src/models/estimate.entity";
import { Statement } from "src/models/statement.entity";
import { SetBooking } from "src/models/setbooking.entity";
import { Booking } from "src/models/booking.entity";

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
  userAuth?: UserAuthority;
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
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: {
    height: string;
  };
}

// 도장 업로드 modal props
export interface _pStampModalProps {
  selectedFile: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stampImgSrc: string;
  setStampImgSrc: React.Dispatch<React.SetStateAction<string>>;
  comData: Company;
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
  setClickDoc?: React.Dispatch<React.SetStateAction<User>>;
  style?: {
    height: string;
  };
}

// 예약 설정용 props
export interface _pSetBookingDataProps extends _MainProps {
  booking: SetBooking;
  setBooking: React.Dispatch<React.SetStateAction<SetBooking>>;
  modify: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
}

// 부품 세트 관리 props
export interface _pPartsSetProps extends _MainProps {
  modalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  clickDoc?: MainWork;
  setClickDoc?: React.Dispatch<React.SetStateAction<MainWork>>;
  modalOption?: string;
  setModalOption?: React.Dispatch<React.SetStateAction<string>>;
  partSetData?: Partial<PartsSet>;
  setPartSetData?: React.Dispatch<React.SetStateAction<Partial<PartsSet>>>;
  partSetClass?: Partial<PartsSet>[];
  setPartSetClass?: React.Dispatch<React.SetStateAction<Partial<PartsSet>[]>>;
  workList?: MainWork[];
  setWorkList?: React.Dispatch<React.SetStateAction<MainWork[]>>;
  mtInfo?: Maintenance;
  setMtInfo?: React.Dispatch<React.SetStateAction<Maintenance>>;
  modify?: boolean;
  setModify?: React.Dispatch<React.SetStateAction<boolean>>;
  setInitMtInfo?: React.Dispatch<React.SetStateAction<Maintenance>>;
}

/***********************************************************************
 * Admin
 ***********************************************************************/

// 승인관리용 props
export interface _pAdminReviewCompanies extends _pFindDocs<Company> {
  searchOption: string;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

// 업체관리용 props
export interface _pAdminManCompanies extends _pFindDocs<Company> {
  searchOption: string;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

// 직원관리용 props
export interface _pAdminUsers extends _pFindDocs<User> {
  searchOption: string;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

// 부품관리용 modal props
export interface _pAdminManParts extends _MainProps {
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  clickDoc?: Part;
  setClickDoc?: React.Dispatch<React.SetStateAction<Part>>;
  style?: {
    height: string;
  };
}

export interface _pComPageModalProps extends _pFindDocs<Company> {
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  clickDoc?: Part;
  setClickDoc?: React.Dispatch<React.SetStateAction<Part>>;
  style?: {
    height: string;
  };
}

// 정비장부용 props
export interface _pMaintenanceProps extends _pFindDocs<any> {
  searchOption: string;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  searchList: any;
  setSearchList: any;
  // setSearchFrom: React.Dispatch<React.SetStateAction<string>>;
  // setSearchTo: React.Dispatch<React.SetStateAction<string>>;
  // searchDetails: any;
  // setSearchDetails: React.Dispatch<React.SetStateAction<MainFindOptions>>;
}

// 서류 미리보기 props
export interface _pPreviewModalProps {
  propToken?: AuthTokenInfo;
  modal2Open?: boolean;
  setModal2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  fileCheck?: _fFileCheck;
  propMtInfo?: Maintenance;
  eInfo: Estimate;
  sInfo: Statement;
  stampImgSrc: string;
}
