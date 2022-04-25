import { TransformFnParams } from 'class-transformer';
import { isNumber } from 'class-validator';
import { defTakeNum, maxTakeNum } from '../../constants/model.const';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';
import * as duration from 'dayjs/plugin/duration';
// import { AES, enc } from 'crypto-js';
import * as dotenv from 'dotenv';
dotenv.config();

/***************************************************
 * 툴킷 초기화
 ***************************************************/
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

/***************************************************
 * Base 모델 참조 상수
 ***************************************************/
// 페이지번호 검증
export function getValidPageNumber(params: TransformFnParams) {
  // console.log('getValidPageNumber');
  // console.log('input: ' + params.value);

  params.value = parseInt(params.value);

  if (!isNumber(params.value)) {
    params.value = 1;
  }
  if (params.value <= 0) {
    params.value = 1;
  }
  return params.value;
}

// 페이지당 출력 문서 수 검증
export function getValidTakeNumber(params: TransformFnParams) {
  // console.log('getValidTakeNumber');
  // console.log('input: ' + params.value);

  params.value = parseInt(params.value);

  if (!isNumber(params.value)) {
    params.value = defTakeNum;
  }

  if (params.value <= 0) {
    params.value = defTakeNum;
  } else if (params.value > maxTakeNum) {
    params.value = maxTakeNum;
  }

  return params.value;
}

export function strToBoolean(params: TransformFnParams) {
  if (params.value == 'true' || params.value == true) {
    params.value = true;
  } else {
    params.value = false;
  }

  return params.value;
}

export function removePropertyWithEmptyValue(params: TransformFnParams) {
  // console.log('removePropertyWithEmptyValue');
  // console.log('value: ' + params.value);

  // 빈값 null 처리
  if (
    params.value == '' ||
    params.value == undefined ||
    params.value == 'undefined'
  ) {
    return null;
  }
  return params.value;
}

export function getValidSearchYear(params: TransformFnParams) {
  params.value = parseInt(params.value);
  // console.log('sYear: ' + params.value);
  return params.value;
}
/***************************************************
 * 암복호 관련
 ***************************************************/

const crtKey = process.env.CRT_KEY;

// // 정비이력의 고객정보 암복호
// export function encMainCustomer(doc: MainCustomer): MainCustomer {
//   if (doc.name) doc.name = AES.encrypt(doc.name, crtKey).toString();
//   return doc;
// }

// export function decMainCustomer(doc: MainCustomer): MainCustomer {
//   if (doc.name) doc.name = AES.decrypt(doc.name, crtKey).toString(enc.Utf8);
//   console.log('name: ' + doc);
//   return doc;
// }

/***************************************************
 * DayJS 관련
 ***************************************************/
export const dtFormatForDocNum = 'YYMMDD';
export const dtFormatForDurationSerarch = 'YYYY-mm-DD';

export function getStartOfDayDateTime(date?: Date): Date {
  return dayjs(date).startOf('day').toDate();
}

export function getEndOfDayDateTime(date?: Date): Date {
  return dayjs(date).endOf('day').toDate();
}

export function getStartOfYearDateTime(date?: Date): Date {
  return dayjs(date).startOf('year').toDate();
}

export function getEndOfYearDateTime(date?: Date): Date {
  return dayjs(date).endOf('year').toDate();
}

export function getStartOfMonthDateTime(date?: Date): Date {
  return dayjs(date).startOf('month').toDate();
}

export function getEndOfMonthDateTime(date?: Date): Date {
  return dayjs(date).endOf('month').toDate();
}

export function getDuration(from: Date, to: Date): number {
  let diff = dayjs(from).diff(dayjs(to), 'days');
  diff = Math.abs(diff);
  console.log(diff);
  return diff;
}

/**
 * date에 해당하는 문자열 포맷의 날짜 반환. 기본 오늘 날짜 반환
 * @param date 문자열 포맷의 날짜로 변환할 Date
 * @returns 문자열 포맷의 날짜
 */
export function getStrDate(date?: Date, format?: string) {
  if (!format) format = dtFormatForDocNum;
  return dayjs(date).format(format);
}

export function testDayJs() {
  console.log('KOR 시간: ', dayjs().format());
  console.log('UTC 시간: ', dayjs().utc().format());
  console.log('KOR format 시간: ', dayjs().format('YYMMDD HH:mm:ss'));
  console.log('UTC format 시간: ', dayjs().utc().format('YYMMDD HH:mm:ss'));
}
