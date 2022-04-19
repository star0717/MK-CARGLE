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
    case 'new':
      return '신규';
    case 'approval':
      return '승인';
    case 'reject':
      return '거절';
    case 'maintenance':
      return '정비';
    default:
      return null;
  }
};

/** 예약 상태별 색상 출력 */
export const bookingStateColor = (state: BookingState) => {
  switch (state) {
    case 'new':
      return '#314FA5';
    case 'approval':
      return '#51b351';
    case 'reject':
      return '#d6263b';
    case 'maintenance':
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
 * @param restTo
 * @param restFrom
 * @returns
 */
export const bookingTimeList = (
  workTo: Date,
  workFrom: Date,
  restTo?: Date,
  restFrom?: Date,
) => {
  let toStr: string = dayjs(workTo).format('HH:mm'); // 시작시간 string
  let fromStr: string = dayjs(workFrom).format('HH:mm'); // 종료시간 string

  let toHour: number = Number(toStr.split(':')[0]); // 시작시간 시
  let toMinute: number = Number(toStr.split(':')[1]); // 시작시간 분
  let fromHour: number = Number(fromStr.split(':')[0]); // 종료시간 시
  let fromMinute: number = Number(fromStr.split(':')[1]); // 종료시간 분

  let toBookingTime: dayjs.Dayjs; // 예약가능 시작시간
  let fromBookingTime: dayjs.Dayjs; // 예약가능 종료시간

  if (toMinute === 0) toBookingTime = dayjs(workTo);
  else if (toMinute <= 30) {
    toBookingTime = dayjs(workTo).minute(30);
  } else {
    toBookingTime = dayjs(workTo)
      .hour(toHour + 1)
      .minute(0);
  }

  if (fromMinute <= 30) {
    fromBookingTime = dayjs(workFrom).minute(0);
  } else {
    fromBookingTime = dayjs(workFrom).minute(30);
  }

  let bookingArr: string[] = [toBookingTime.format('HH:mm')]; // 예약가능시간 리스트(초기값: 시작시간)

  // 예약가능시간 간격(30분)
  let interval: number = Math.floor(
    fromBookingTime.diff(toBookingTime, 'minute') / 30,
  );
  console.log(interval);

  // 예약가능시간에 30분 더한 후, 리스트에 추가
  for (let i = 0; i < interval; i++) {
    toBookingTime = toBookingTime.add(30, 'minutes');
    bookingArr.push(toBookingTime.format('HH:mm'));
  }

  return bookingArr;
};

export enum RejectReason {
  hard = 'hard',
  many = 'many',
  text = 'text',
}

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

export enum dayOff {
  MON = `monday`,
  TUE = `tuesday`,
  WED = `wedensday`,
  THU = `thursday`,
  FRI = `friday`,
  SAT = `satureday`,
  SUN = `sunday`,
  ALLDAY = `allday`,
  WEEKDAY = `weekday`,
  WEEKEND = `weekend`,
}

/********** 검색 옵션 쿼리 생성 ******************/
export const genBookingOptionQuery = (data: BookingFindOptions) => {
  let query = '&';
  if (data?.regNumber) query += 'regNumber=' + data.regNumber;
  if (data?.phoneNumber) query += 'phoneNumber=' + data.phoneNumber;
  return query;
};
