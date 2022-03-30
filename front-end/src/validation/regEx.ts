export const basicRegEx = {
  ENG: /^[a-zA-Z]*$/, // 영어만
  NUM: /^[0-9]*$/, // 숫자만
  ENGNUM: /^[a-zA-Z0-9]*$/, //영어+숫자
  SP_CHAR: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, // 특수문자 비허용
};

export const formRegEx = {
  EMAIL:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,6}$/, //이메일
  EMAIL_ADDRESS: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/, // 이메일 주소 부분만
  EMAIL_DOMAIN: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,6}$/, // 이메일 도메인 부분만
  PASSWORD:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/, //비밀번호(영어+숫자+특수문자 반드시 포함 & 8~16)
  COMPANY_NUM: /^[0-9]{3}-?[0-9]{2}-?[0-9]{5}$/, // 사업자등록번호(10자리)
  MB_NUM: /^[0-9]{2}-?[0-9]{4}-?[0-9]{6}$/, // 정비업등록번호(12자리)
  HP_NUM: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, // 휴대폰번호(-포함가능)
  PH_NUM: /^\d{2,3}-?\d{3,4}-?\d{4}$/, // 전화번호(-제외)
  FAX_NUM: /^\+?[0-9-]{6,}$/, // fax번호
  CAR_NUM: /\d{2,3}[가-힣]{1}\d{4}/gm,
  MONEY: /^[0-9,]*$/,
};

export const CHAR_DEL = (str: any) => {
  if (basicRegEx.SP_CHAR.test(str)) {
    return str.replace(basicRegEx.SP_CHAR, "");
  } else {
    return str;
  }
};

export const NUM_ONLY = (num: any) => {
  if (!basicRegEx.NUM.test(num)) {
    return false;
  } else {
    return num;
  }
};
