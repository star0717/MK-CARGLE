import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';

/**
 * 타임테이블 예약가능여부
 * init: 예약 및 표시 불가능
 * on: 예약 가능
 * off: 예약 불가능
 */
export enum BookingCount {
  init = -1,
  on = 0,
  off = 0,
}

export enum WorkTime {
  start = 6,
  end = 21,
  interval = 30,
  intervalType = 'minutes',
}

/**
 * 업체 업무시간별 예약카운팅 리스트
 * @param workTo 업무시작시간
 * @param workFrom 업무종료시간
 * @param breakTo 휴게시작시간
 * @param breakFrom 휴게종료시간
 * @returns
 */
export const makeTimeArray = (
  workTo?: Date,
  workFrom?: Date,
  breakTo?: Date,
  breakFrom?: Date,
) => {
  let timeArr: number[] = [];
  let workToIdx: number;
  let workFromIdx: number;
  let breakToIdx: number;
  let workToLoop: number;
  let workFromLoop: number;
  let breakToLoop: number;
  let workToIdxArr: number[] = [];
  let workFromIdxArr: number[] = [];
  let breakToIdxArr: number[] = [];

  let startTime: dayjs.Dayjs = dayjs(workTo).hour(WorkTime.start).minute(0);
  let endTime: dayjs.Dayjs = dayjs(workFrom).hour(WorkTime.end).minute(0);
  let workToDay: dayjs.Dayjs = dayjs(workTo);
  let workFromDay: dayjs.Dayjs = dayjs(workFrom);
  let breakToDay: dayjs.Dayjs = dayjs(breakTo);
  let breakFromDay: dayjs.Dayjs = dayjs(breakFrom);

  if (!workTo && !workFrom) {
    for (let i = 0; i < 30; i++) {
      timeArr.push(BookingCount.init);
    }
    return timeArr;
  }
  if (JSON.stringify(workToDay) !== JSON.stringify(startTime)) {
    workToLoop =
      workToDay.diff(startTime, WorkTime.intervalType) / WorkTime.interval;
    workToIdx = 0;
    if (workToDay.format('mm') === `${WorkTime.interval}`) workToIdx + 1;
    for (let i = 0; i < workToLoop; i++) {
      workToIdxArr.push(workToIdx + i);
    }
  }
  if (JSON.stringify(workFromDay) !== JSON.stringify(endTime)) {
    workFromLoop =
      endTime.diff(workFromDay, WorkTime.intervalType) / WorkTime.interval;
    workFromIdx = (parseInt(workFromDay.format('HH')) - WorkTime.start) * 2;
    if (workFromDay.format('mm') === `${WorkTime.interval}`) workFromIdx + 1;
    for (let i = 0; i < workFromLoop; i++) {
      workFromIdxArr.push(workFromIdx + i);
    }
  }

  if (breakTo && breakFrom) {
    breakToLoop =
      breakFromDay.diff(breakToDay, WorkTime.intervalType) / WorkTime.interval;
    breakToIdx = (parseInt(breakToDay.format('HH')) - WorkTime.start) * 2;
    if (breakToDay.format('mm') === `${WorkTime.interval}`) breakToIdx + 1;
    for (let i = 0; i < breakToLoop; i++) {
      breakToIdxArr.push(breakToIdx + i);
    }
  }

  for (let i = 0; i < 30; i++) {
    if (workToIdxArr.includes(i)) {
      timeArr.push(BookingCount.init);
    } else if (workFromIdxArr.includes(i)) {
      timeArr.push(BookingCount.init);
    } else if (breakToIdxArr.includes(i)) {
      timeArr.push(BookingCount.init);
    } else {
      timeArr.push(BookingCount.on);
    }
  }

  return timeArr;
};

/**
 * 일자에 해당하는 타임테이블 idx 구하기
 * @param date
 * @returns
 */
export const dateToTableIdx = (date: Date) => {
  let idx: number;

  idx = (Number(dayjs(date).format('HH')) - WorkTime.start) * 2;
  if (dayjs(date).format('mm') === `${WorkTime.interval}`) idx = idx + 1;

  return idx;
};

/**
 * 일자에 해당하는 요일명 구하기
 * @param date
 * @returns
 */
export const dateGetWeekDay = (date: Date) => {
  switch (dayjs(date).day()) {
    case 0:
      return 'sun';
    case 1:
      return 'mon';
    case 2:
      return 'tue';
    case 3:
      return 'wed';
    case 4:
      return 'thu';
    case 5:
      return 'fri';
    case 6:
      return 'sat';
    default:
      return null;
  }
};

/**
 * 요일명에 해당하는 setbooking weekTime idx 구하기
 * @param day
 * @returns
 */
export const weekDayGetIdx = (day: string) => {
  switch (day) {
    case 'mon':
      return 0;
    case 'tue':
      return 1;
    case 'wed':
      return 2;
    case 'thu':
      return 3;
    case 'fri':
      return 4;
    case 'sat':
      return 5;
    case 'sun':
      return 6;

    default:
      return null;
  }
};
