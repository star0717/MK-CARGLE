export class PartCategory {
  constructor(name: string, code: string, description?: string) {
    this.name = name;
    this.code = code;
    this.description = description;
  }
  name: string;
  code: string;
  description?: string;
}

export class TS_Code {
  // 분류
  class: string;
  // 인덱스
  index: string;
  // 코드
  code: string;
  // 이름
  name: string;
  // 별칭
  nickName?: string;
  // 옵션
  options?: [string];
}

export const TS_CodeList: [TS_Code] = [];
