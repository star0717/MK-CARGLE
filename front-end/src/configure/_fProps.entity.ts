// react-hook-form && 단순 사용 props

/**
 * 회원가입: 이용약관 form
 */
export interface _fTermData {
  mkTerm: Boolean;
  privacyTerm: Boolean;
}

/**
 * 마이페이지(계정관리): 비밀번호 변경 form
 */
export interface _fChangePw {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

/**
 * 마이페이지(계정관리): 회원탈퇴 form
 */
export interface _fWithdrawal {
  withdrawalTerm: boolean;
  password: string;
}

export interface _fFileCheck {
  eCheck: boolean;
  sCheck: boolean;
}

export interface _fPublish {
  print: boolean;
  online: boolean;
}
