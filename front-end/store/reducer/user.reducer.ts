import { HYDRATE } from "next-redux-wrapper";
import {
  UserState,
  actionTypesUser,
  ActionsUser,
  FormInput,
  FormCheck,
} from "../interfaces";
import { UserInfo } from "../../src/models/auth.entity";
import { User, UserAuthority } from "../../src/models/user.entity";
import { Company, CompanyApproval } from "../../src/models/company.entity";

export const initialState: UserState = {
  signInInfo: <UserInfo>{
    id: "",
    pwd: "",
  },
  user: <User>{
    email: "",
    password: "",
    auth: UserAuthority.WORKER,
    name: "",
    _cID: "",
    hpNumber: "",
    postcode: "",
    address1: "",
    address2: "",
    joinDate: null,
    approval: false,
  },
  company: <Company>{
    name: "",
    comRegNum: "",
    mbRegNum: "",
    mbTypeNum: "",
    ownerName: "",
    busType: "",
    busItem: "",
    phoneNum: "",
    faxNum: "",
    postcode: "",
    address1: "",
    address2: "",
    approval: CompanyApproval.BEFORE,
  },
  formInput: <FormInput>{
    companyNum: "",
    passwordCheck: "",
  },
  formCheck: <FormCheck>{
    mkTerm: false,
    privacyTerm: false,
    marketTerm: false,
    emailReadOnly: false,
    emailSend: false,
    authNumCheck: false,
  },
};

interface HydratePayload {
  userAll: UserState;
}

const userAll = (
  state = initialState,
  action: ActionsUser | { type: typeof HYDRATE; payload: HydratePayload }
): UserState => {
  switch (action.type) {
    //이게 뭘 뜻하는거지??
    case HYDRATE:
      return { ...state, ...action.payload.userAll };

    case actionTypesUser.USER_INIT:
      return {
        ...state,
        user: initialState.user,
        company: initialState.company,
        formInput: initialState.formInput,
        formCheck: initialState.formCheck,
      };

    // 계정 정보 state 변환
    case actionTypesUser.INPUT_ACCOUNT:
      return {
        ...state,
        user: action.payload,
      };

    // 업체 정보 state 변환
    case actionTypesUser.INPUT_COMPANY:
      return {
        ...state,
        company: action.payload,
      };

    // 그 외 form state 변환
    case actionTypesUser.INPUT_FORM:
      return {
        ...state,
        formInput: action.payload,
      };

    // form check 변환
    case actionTypesUser.FORM_CHECK:
      return {
        ...state,
        formCheck: action.payload,
      };

    // 로그인 기능
    case actionTypesUser.USER_SIGNIN:
      return {
        ...state,
      };

    // 로그아웃 기능
    case actionTypesUser.USER_SIGNOUT:
      return {
        ...state,
      };

    // 회원가입 기능
    case actionTypesUser.USER_SIGNUP:
      return {
        ...state,
      };

    /**
     * 토큰 체크 기능
     */
    case actionTypesUser.TOKEN_CHECK:
      return {
        ...state,
      };

    // 이메일 인증번호 전송 기능
    case actionTypesUser.USER_EMAIL_SEND:
      return {
        ...state,
      };

    // 이메일 인증번호 체크 기능
    case actionTypesUser.USER_AUTHNUM_CHECK:
      return {
        ...state,
      };

    // 사업자번호 유효성 검사 기능
    case actionTypesUser.USER_COMPANY_CHECK:
      return {
        ...state,
      };

    // 사업자번호 검색 기능
    case actionTypesUser.USER_COMPANY_FIND:
      return {
        ...state,
      };

    // 이메일 찾기 기능
    case actionTypesUser.USER_FIND_EMAIL:
      return {
        ...state,
      };

    // 비밀번호 찾기 기능
    case actionTypesUser.USER_FIND_PW:
      return {
        ...state,
      };

    // 사업자등록증 업로드 기능
    case actionTypesUser.COM_FILE_UPLOAD:
      return {
        ...state,
      };

    // 정비업등록증 업로드 기능
    case actionTypesUser.MAN_FILE_UPLOAD:
      return {
        ...state,
      };

    // 심사요청
    case actionTypesUser.APPROVAL_REQUEST:
      return {
        ...state,
      };

    // 비밀번호 체크 기능
    case actionTypesUser.PASSWORD_CHECK:
      return {
        ...state,
      };

    case actionTypesUser.GET_MY_INFO:
      return {
        ...state,
      };

    case actionTypesUser.SET_MY_INFO:
      return {
        ...state,
      };

    case actionTypesUser.CHANGE_PASSWORD:
      return {
        ...state,
      };
    case actionTypesUser.UPROAD_STAMP:
      return {
        ...state,
      };
    case actionTypesUser.DOWNROAD_STAMP:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userAll;
