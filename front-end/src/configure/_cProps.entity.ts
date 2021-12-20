import { FieldValues, UseFormSetValue } from "react-hook-form";
import { AuthTokenInfo } from "../../src/models/auth.entity";
import { FormCheck, FormInput } from "../../store/interfaces";
import { Company } from "../models/company.entity";
import { User, UserAuthority } from "../models/user.entity";

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
