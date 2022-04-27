import dayjs from 'dayjs';

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

export const makeTimeArray = (
  workTo: Date,
  workFrom: Date,
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
  let a = 0;
  let b = 0;
  let c = 0;

  let startTime: dayjs.Dayjs = dayjs().hour(6).minute(0);
  let endTime: dayjs.Dayjs = dayjs().hour(21).minute(0);
  let workToDay: dayjs.Dayjs = dayjs(workTo);
  let workFromDay: dayjs.Dayjs = dayjs(workFrom);
  let breakToDay: dayjs.Dayjs = dayjs(breakTo);
  let breakFromDay: dayjs.Dayjs = dayjs(breakFrom);

  if (workToDay !== startTime) {
    workToLoop = workToDay.diff(startTime, 'minutes') / 30;
    workToIdx = 0;
    for (let i = 0; i < workToLoop; i++) {
      workToIdxArr.push(workToIdx + i);
    }
  }
  if (workFromDay !== endTime) {
    workFromLoop = endTime.diff(workFromDay, 'minutes') / 30;
    workFromIdx = (parseInt(workFromDay.format('HH')) - 6) * 2;
    if (workFromDay.format('mm') === '30') workFromIdx + 1;
    for (let i = 0; i < workFromLoop; i++) {
      workFromIdxArr.push(workFromIdx + i);
    }
  }

  if (breakTo && breakFrom) {
    breakToLoop = breakFromDay.diff(breakToDay, 'minutes') / 30;
    breakToIdx = (parseInt(breakToDay.format('HH')) - 6) * 2;
    if (breakToDay.format('mm') === '30') breakToIdx + 1;
    for (let i = 0; i < breakToLoop; i++) {
      breakToIdxArr.push(breakToIdx + i);
    }
  }

  console.log('$$', workFromDay, endTime);

  console.log('@@', workToIdx);
  console.log('@@', workFromIdx);
  console.log('@@', breakToIdx);
  console.log('##', workToLoop);
  console.log('##', workFromLoop);
  console.log('##', breakToLoop);

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
