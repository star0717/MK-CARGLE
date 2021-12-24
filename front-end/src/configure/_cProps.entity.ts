import { FieldValues, UseFormSetValue } from "react-hook-form";
import { AuthTokenInfo, SignUpInfo } from "../../src/models/auth.entity";
import { FormCheck, FormInput } from "../../store/interfaces";
import { Company } from "../models/company.entity";
import { User, UserAuthority } from "../models/user.entity";
import { _pWorkerData } from "./_pProps.entity";
import { _MainProps } from "./_props.entity";

// 컴포넌트 props //
/**
 * 레이아웃 props
 */
export interface _cLayoutProps {
  tokenValue?: AuthTokenInfo;
}

/**
 * 회원가입: 파일업로드 전용 props
 */
export interface _cFileUploadProps {
  stepNumber?: number;
  setStepNumber?: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * 마이페이지(계정관리): 공통사용 props
 */
export interface _cMyPageAccount extends _MainProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  accountInfo: SignUpInfo;
  setAccountInfo: React.Dispatch<React.SetStateAction<SignUpInfo>>;
}

/**
 * 마이페이지(계정관리): 회원탈퇴 modal props
 */
export interface _cWithdrawalModalProps {
  password: string;
  accountInfo: SignUpInfo;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style: {
    height: string;
  };
}

/**
 * 마이페이지(직원관리): 직원정보 modal props
 */
export interface _cWorkerInfoModalProps extends _pWorkerData {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickDoc: User;
  style: {
    height: string;
  };
}
