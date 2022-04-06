/**
 * 회원가입: 파일업로드 초기값
 */
export interface FileDataInit {
  comFile: File;
  manFile: File;
}

export interface FileNameInit {
  comFile: string;
  manFile: string;
}

/**
 * 회원가입 및 마이페이지: 업종
 */
export interface MbType {
  value: string;
  text: string;
}
