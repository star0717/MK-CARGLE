export class TsClass {
  label: string;
  description: string;
}

export class TsItem {
  class: TsClass;
  index: string;
  name: string;
  nickName?: string;
  options?: string[];
}

export const tsClassB: TsClass = { label: 'B', description: '차체(보디)' };
export const tsClassD: TsClass = { label: 'D', description: '외장' };
export const tsClassE: TsClass = { label: 'E', description: '엔진' };
export const tsClassH: TsClass = { label: 'H', description: '고전원전기장치' };
export const tsClassS: TsClass = { label: 'S', description: '섀시' };

export const TsClassList: TsClass[] = [tsClassB, tsClassD, tsClassE, tsClassS];

export const TsItemListB: TsItem[] = [
  {
    class: tsClassB,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '02',
    name: '후미등',
    nickName: '콤비네이션램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '03',
    name: '전면범퍼',
    nickName: '프런트범퍼',
  },
  {
    class: tsClassB,
    index: '04',
    name: '후면범퍼',
    nickName: '리어범퍼',
  },
  {
    class: tsClassB,
    index: '05',
    name: '보닛',
    nickName: '후드',
  },
  {
    class: tsClassB,
    index: '06',
    name: '전ㆍ후패널',
  },
  {
    class: tsClassB,
    index: '07',
    name: '전ㆍ후펜더',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '08',
    name: '앞문',
    nickName: '프런트도어',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '09',
    name: '사이드미러',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '10',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '11',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '12',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '13',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '14',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '15',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '16',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '17',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '18',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '19',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassB,
    index: '20',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
];

export const TsItemListD: TsItem[] = [
  {
    class: tsClassD,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassD,
    index: '02',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassD,
    index: '03',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassD,
    index: '04',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassD,
    index: '05',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassD,
    index: '06',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassD,
    index: '07',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassD,
    index: '08',
    name: '안전벨트',
  },
  {
    class: tsClassD,
    index: '09',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
];

export const TsItemListE: TsItem[] = [
  {
    class: tsClassE,
    index: '01',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '02',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '03',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '04',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '05',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '06',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '07',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '08',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '09',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '10',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '11',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '12',
    name: '연료분사펌프',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '13',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
  {
    class: tsClassE,
    index: '14',
    name: '침수차량 정비',
    options: ['엔진', '전기', '하체'],
  },
];

export const TsItemListH: TsItem[] = [
  {
    class: tsClassH,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassH,
    index: '02',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassH,
    index: '03',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassH,
    index: '04',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassH,
    index: '05',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
];

export const TsItemListS: TsItem[] = [
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: tsClassS,
    index: '14',
    name: '차동기어',
  },
];

export const getTsItemList = (tsClass: TsClass): TsItem[] => {
  switch (tsClass) {
    case tsClassB:
      return TsItemListB;
    case tsClassD:
      return TsItemListD;
    case tsClassE:
      return TsItemListE;
    case tsClassH:
      return TsItemListH;
    case tsClassS:
      return TsItemListS;
    default:
      return null;
  }
};

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

export const getCode = (item: TsItem) => {
  return item.class.label + item.index;
};
