import dayjs from 'dayjs';
import { BookingFindOptions } from 'src/models/booking.entity';

/** 예약 상태 */
export enum BookingState {
  NEW = 'new',
  APPROVAL = 'approval',
  REJECT = 'reject',
  MAINTENANCE = 'maintenance',
}

/** 예약 상태 string -> BookingState 변환 */
export const bookingStateInput = (state: string) => {
  switch (state) {
    case 'new':
      return BookingState.NEW;
    case 'approval':
      return BookingState.APPROVAL;
    case 'reject':
      return BookingState.REJECT;
    case 'maintenance':
      return BookingState.MAINTENANCE;
    default:
      return null;
  }
};

/** 예약 상태별 문구 출력 */
export const bookingStateName = (state: BookingState) => {
  switch (state) {
    case BookingState.NEW:
      return '신규';
    case BookingState.APPROVAL:
      return '승인';
    case BookingState.REJECT:
      return '거절';
    case BookingState.MAINTENANCE:
      return '정비';
    default:
      return null;
  }
};

/** 예약 상태별 색상 출력 */
export const bookingStateColor = (state: BookingState) => {
  switch (state) {
    case BookingState.NEW:
      return '#314FA5';
    case BookingState.APPROVAL:
      return '#51b351';
    case BookingState.REJECT:
      return '#d6263b';
    case BookingState.MAINTENANCE:
      return '#9d9d9d';
    default:
      return null;
  }
};

/** 예약 상태 리스트 */
export const bookingStateList = Object.values(BookingState).map((e) => e);

/**
 * 추후 사용될 가능성있음
 * 업체 업무시간 리스트
 * @param workTo
 * @param workFrom
 * @param breakTo
 * @param breakFrom
 * @returns
 */
export const bookingTimeList = (
  workTo: Date,
  workFrom: Date,
  breakTo?: Date,
  breakFrom?: Date,
) => {
  let workToDay: dayjs.Dayjs = dayjs(workTo);
  let workFromDay: dayjs.Dayjs = dayjs(workFrom);
  let breakToDay: dayjs.Dayjs = dayjs(breakTo);
  let breakFromDay: dayjs.Dayjs = dayjs(breakFrom);

  let workToStr: string = workToDay.format('HH:mm'); // 시작시간 string
  let workFromStr: string = workFromDay.format('HH:mm'); // 종료시간 string
  let breakToStr: string = breakToDay.format('HH:mm');
  let breakFromStr: string = breakFromDay.format('HH:mm');

  // 예약가능시간 리스트(초기값: 업무시작시간)
  let bookingArr: string[] = [workToStr];
  // 휴게시간 리스트(초기값: 휴게시작시간)
  let breakArr: string[] = [breakToStr];

  // 예약가능시간 간격(30분)
  let workInterval: number = workFromDay.diff(workToDay, 'minutes') / 30;
  // 휴게시간 간격(30분)
  let breakInterval: number = breakFromDay.diff(breakToDay, 'minutes') / 30;

  // 휴게시간에 30분 더한 후, 리스트에 추가
  for (let j = 0; j < breakInterval; j++) {
    breakToDay = breakToDay.add(30, 'minutes');
    breakArr.push(breakToDay.format('HH:mm'));
  }
  // 예약가능시간에 30분 더한 후, 리스트에 추가
  for (let i = 0; i < workInterval; i++) {
    workToDay = workToDay.add(30, 'minutes');
    if (!breakArr.includes(workToDay.format('HH:mm')))
      bookingArr.push(workToDay.format('HH:mm'));
  }

  return bookingArr;
};

/**
 * 업체 업무시간(시간) 리스트
 * @param list
 * @returns
 */
export const bookingHourList = (list: string[]) => {
  let hourArr: string[] = [];
  for (let i = 0; i < list.length; i++) {
    if (!hourArr.includes(list[i].split(':')[0]))
      hourArr.push(list[i].split(':')[0]);
  }
  return hourArr;
};

/**
 * 업체 업무시간(분) 리스트
 * @param list
 * @returns
 */
export const bookingMinuteList = (list: string[], hour: string) => {
  let minuteArr: string[] = [];
  for (let i = 0; i < list.length; i++) {
    if (hour === list[i].split(':')[0]) minuteArr.push(list[i].split(':')[1]);
  }
  return minuteArr;
};

/** 거절사유 */
export enum RejectReason {
  hard = 'hard',
  many = 'many',
  text = 'text',
}

/** 예약 상태별 문구 출력 */
export const rejectReasonName = (reason: RejectReason) => {
  switch (reason) {
    case RejectReason.hard:
      return '정비가 어려운 차량';
    case RejectReason.many:
      return '수리할 차량이 밀림';
    case RejectReason.text:
      return '직접 입력';
    default:
      return null;
  }
};

/**
 * 업무시간 종류
 * all: 매일 같음
 * week: 주말 다름
 * diff: 매일 다름
 */
export enum SetBookingTime {
  ALL = 'all',
  WEEK = 'week',
  DIFF = 'diff',
}

// export enum dayOff {
//   MON = `monday`,
//   TUE = `tuesday`,
//   WED = `wedensday`,
//   THU = `thursday`,
//   FRI = `friday`,
//   SAT = `satureday`,
//   SUN = `sunday`,
//   ALLDAY = `allday`,
//   WEEKDAY = `weekday`,
//   WEEKEND = `weekend`,
// }

/********** 검색 옵션 쿼리 생성 ******************/
export const genBookingOptionQuery = (data: BookingFindOptions) => {
  let query = '&';
  if (data?.regNumber) query += 'regNumber=' + data.regNumber + '&';
  if (data?.phoneNumber) query += 'phoneNumber=' + data.phoneNumber + '&';
  if (data?.mainHopeDate) query += 'mainHopeDate=' + data.mainHopeDate + '&';
  if (data?.bookingState) query += 'bookingState=' + data.bookingState;
  return query;
};
