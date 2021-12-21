import { FieldValues, UseFormSetValue } from "react-hook-form";
import { AuthTokenInfo, SignUpInfo } from "../../src/models/auth.entity";
import { FormCheck, FormInput } from "../../store/interfaces";
import { Company } from "../models/company.entity";
import { User, UserAuthority } from "../models/user.entity";
import { _MainProps } from "./_props.entity";

// 컴포넌트 props //
/**
 * 레이아웃 props
 */
export interface _cLayoutProps {
  tokenValue?: AuthTokenInfo;
}

/**
 * 회원가입: 공통사용 props
 */
export interface _cSignUpProps {
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

/**
 * 회원가입: 업체 조회 modal props
 */
export interface _cComFindModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputForm: FormInput;
  setInputForm: React.Dispatch<React.SetStateAction<FormInput>>;
  setInputUser: React.Dispatch<React.SetStateAction<User>>;
  inputUser: User;
  setValue: UseFormSetValue<FieldValues>;
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
 * 마이페이지(계정관리): 비밀번호 변경 modal props
 */
export interface _cChangePwModalProps extends _cMyPageAccount {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style: {
    height: string;
  };
}

/**
 * 마이페이지(계정관리): 도장 업로드 modal props
 */
export interface _cStampModalProps {
  stampNum: number;
  setStampNum: React.Dispatch<React.SetStateAction<number>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style: {
    height: string;
  };
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
 * 마이페이지(직원관리): 공통사용 props
 */
export interface _cMyPageWorker extends _MainProps {
  docs: User[];
  setDocs: React.Dispatch<React.SetStateAction<User[]>>;
  totalDocs: number;
  setTotalDocs: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
  setLastPage: React.Dispatch<React.SetStateAction<number>>;
  setLoadData: React.Dispatch<React.SetStateAction<boolean>>;
}
