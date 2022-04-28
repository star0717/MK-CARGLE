import dayjs from "dayjs";
import "dayjs/locale/ko";

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
  breakFrom?: Date
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

  let startTime: dayjs.Dayjs = dayjs(workTo).hour(6).minute(0);
  let endTime: dayjs.Dayjs = dayjs(workFrom).hour(21).minute(0);
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
    workToLoop = workToDay.diff(startTime, "minutes") / 30;
    workToIdx = 0;
    if (workToDay.format("mm") === "30") workToIdx + 1;
    for (let i = 0; i < workToLoop; i++) {
      workToIdxArr.push(workToIdx + i);
    }
  }
  if (JSON.stringify(workFromDay) !== JSON.stringify(endTime)) {
    workFromLoop = endTime.diff(workFromDay, "minutes") / 30;
    workFromIdx = (parseInt(workFromDay.format("HH")) - 6) * 2;
    if (workFromDay.format("mm") === "30") workFromIdx + 1;
    for (let i = 0; i < workFromLoop; i++) {
      workFromIdxArr.push(workFromIdx + i);
    }
  }

  if (breakTo && breakFrom) {
    breakToLoop = breakFromDay.diff(breakToDay, "minutes") / 30;
    breakToIdx = (parseInt(breakToDay.format("HH")) - 6) * 2;
    if (breakToDay.format("mm") === "30") breakToIdx + 1;
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
