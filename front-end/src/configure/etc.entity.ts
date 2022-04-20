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
 * Select 박스 타입
 */
export interface SelectOpt {
  key?: any;
  value: string;
  label?: string;
  text?: string;
}
