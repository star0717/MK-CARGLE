export class TsClass {
  class: string;
  name: string;
}

export const TsClassB: TsClass = { class: 'B', name: '차체(보디)' };
export const TsClassD: TsClass = { class: 'D', name: '외장' };
export const TsClassE: TsClass = { class: 'E', name: '엔진' };
export const TsClassS: TsClass = { class: 'S', name: '섀시' };

export const TsClassList: TsClass[] = [TsClassB, TsClassD, TsClassE, TsClassS];

export class TsCode {
  class: TsClass;
  index: string;
  name: string;
  nickName?: string;
  options?: string[];
}

export const TsCodeListA: TsCode[] = [
  {
    class: TsClassB,
    index: '01',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '02',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '03',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '04',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '05',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '06',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '07',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '08',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '09',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '10',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '11',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '12',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '13',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '14',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '15',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '16',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '17',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '18',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '19',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
  {
    class: TsClassB,
    index: '20',
    name: '전조등',
    nickName: '헤드램프',
    options: ['좌', '우'],
  },
];
