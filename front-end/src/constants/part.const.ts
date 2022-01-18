/***************************************************
 * Part 모델 참조 상수
 ***************************************************/
/*****************************************************************
 * 국토부 정비이력 관련 체계
 *****************************************************************/

// 국토부 정비이력 분류 클래스
export class TsClass {
  label: string; // 레이블
  description: string; // 설명
}

// 국토부 정비이력 분류
export const tsClassB: TsClass = { label: "B", description: "차체(보디)" };
export const tsClassD: TsClass = { label: "D", description: "외장" };
export const tsClassE: TsClass = { label: "E", description: "엔진" };
export const tsClassH: TsClass = { label: "H", description: "고전원전기장치" };
export const tsClassS: TsClass = { label: "S", description: "섀시" };

// 국토부 정비이력 분류 리스트
export const TsClassList: TsClass[] = [
  tsClassB,
  tsClassD,
  tsClassE,
  tsClassH,
  tsClassS,
];

// 국토부 정비이력 아이템 클래스
export class TsItem {
  class: TsClass; // 분류 체계
  index: string; // 인덱스 (순서)
  name: string; // 이름
  nickName?: string; // 별칭
  options?: string[]; // 추가 옵션
}

// 국토부 정비이력 리스트
export const tsItemListB: TsItem[] = [
  {
    class: tsClassB,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "02",
    name: "후미등",
    nickName: "콤비네이션램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "03",
    name: "전면범퍼",
    nickName: "프런트범퍼",
  },
  {
    class: tsClassB,
    index: "04",
    name: "후면범퍼",
    nickName: "리어범퍼",
  },
  {
    class: tsClassB,
    index: "05",
    name: "보닛",
    nickName: "후드",
  },
  {
    class: tsClassB,
    index: "06",
    name: "전ㆍ후패널",
  },
  {
    class: tsClassB,
    index: "07",
    name: "전ㆍ후펜더",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "08",
    name: "앞문",
    nickName: "프런트도어",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "09",
    name: "사이드미러",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "10",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "11",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "12",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "13",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "14",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "15",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "16",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "17",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "18",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "19",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassB,
    index: "20",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
];

export const tsItemListD: TsItem[] = [
  {
    class: tsClassD,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassD,
    index: "02",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassD,
    index: "03",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassD,
    index: "04",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassD,
    index: "05",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassD,
    index: "06",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassD,
    index: "07",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassD,
    index: "08",
    name: "안전벨트",
  },
  {
    class: tsClassD,
    index: "09",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
];

export const tsItemListE: TsItem[] = [
  {
    class: tsClassE,
    index: "01",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "02",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "03",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "04",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "05",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "06",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "07",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "08",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "09",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "10",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "11",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "12",
    name: "연료분사펌프",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "13",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
  {
    class: tsClassE,
    index: "14",
    name: "침수차량 정비",
    options: ["엔진", "전기", "하체"],
  },
];

export const tsItemListH: TsItem[] = [
  {
    class: tsClassH,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassH,
    index: "02",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassH,
    index: "03",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassH,
    index: "04",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassH,
    index: "05",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
];

export const tsItemListS: TsItem[] = [
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "01",
    name: "전조등",
    nickName: "헤드램프",
    options: ["좌", "우"],
  },
  {
    class: tsClassS,
    index: "14",
    name: "차동기어",
  },
];

/**
 * 클래스에 해당하는 국토부 정비이력 리스트 반환
 * @param tsClass 국토부 정비이력 클래스
 * @returns 정비이력 리스트
 */
export const getTsItemList = (tsClass: TsClass): TsItem[] => {
  switch (tsClass) {
    case tsClassB:
      return tsItemListB;
    case tsClassD:
      return tsItemListD;
    case tsClassE:
      return tsItemListE;
    case tsClassH:
      return tsItemListH;
    case tsClassS:
      return tsItemListS;
    default:
      return null;
  }
};

/**
 * 국토부 정비이력 코드에 해당하는 정비이력 정보(아이템) 반환
 * @param tsCode 정비이력 (예, B01)
 * @returns 정비이력 정보(아이템)
 */
export const getTsItem = (tsCode: string) => {
  const prefix = tsCode.charAt(0);
  const postfix = tsCode.substring(1);

  for (let i = 0; i < TsClassList.length; i++) {
    if (TsClassList[i].label == prefix) {
      const itemList = getTsItemList(TsClassList[i]);
      for (let j = 0; j < itemList.length; j++) {
        if (itemList[j].index == postfix) {
          return itemList[j];
        }
      }
      return null;
    }
  }
  return null;
};

/**
 * 국토부 정비이력에 해당하는 국토부 정비이력 코드 반환
 * @param item 코드를 조회할 정비이력 아이템
 * @returns 코드
 */
export const getTsCode = (item: TsItem) => {
  return item.class.label + item.index;
};

/*****************************************************************
 * 부품 관리 체계
 *****************************************************************/

// 부품 분류 클래스
export class PartClass {
  label: string;
  description: string;
}

// 부품 분류
export const partClassEA: PartClass = { label: "EA", description: "오일/기타" };
export const partClassEB: PartClass = { label: "EB", description: "필터" };
export const partClassEC: PartClass = { label: "EC", description: "브레이크" };
export const partClassED: PartClass = { label: "ED", description: "램프" };
export const partClassEE: PartClass = {
  label: "EE",
  description: "타이밍밸트",
};
export const partClassEF: PartClass = { label: "EF", description: "배터리" };
export const partClassEG: PartClass = { label: "EG", description: "타이어" };
export const partClassEH: PartClass = { label: "EH", description: "연료/점화" };
export const partClassEI: PartClass = { label: "EI", description: "전기/전자" };
export const partClassEJ: PartClass = { label: "EJ", description: "센서" };
export const partClassEK: PartClass = { label: "EK", description: "바디" };
export const partClassEL: PartClass = { label: "EL", description: "조향/하부" };
export const partClassEM: PartClass = { label: "EM", description: "엔진" };
export const partClassEN: PartClass = { label: "EN", description: "냉각/히터" };
export const partClassEO: PartClass = { label: "EO", description: "의장/실내" };

// 부품 분류 리스트
export const partClassList: PartClass[] = [
  partClassEA,
  partClassEB,
  partClassEC,
  partClassED,
  partClassEE,
  partClassEF,
  partClassEG,
  partClassEH,
  partClassEI,
  partClassEJ,
  partClassEK,
  partClassEL,
  partClassEM,
  partClassEN,
  partClassEO,
];

/**
 * 레이블에 해당하는 부품클래스 정보를 반환
 * @param label 부품 레이블
 * @returns 부품 클래스 정보
 */
export const getPartClass = (label: string): PartClass => {
  for (let i = 0; i < partClassList.length; i++) {
    if (partClassList[i].label == label) return partClassList[i];
  }
  return null;
};
