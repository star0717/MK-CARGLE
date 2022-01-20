import { TransformFnParams } from 'class-transformer';
import { isNumber } from 'class-validator';
import { defTakeNum, maxTakeNum } from './model.const';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';
import { BadRequestException } from '@nestjs/common';

/***************************************************
 * 툴킷 초기화
 ***************************************************/
dayjs.extend(utc);
dayjs.extend(timezone);
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
  console.log('removePropertyWithEmptyValue');
  console.log('value: ' + params.value);

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

/***************************************************
 * DayJS 관련
 ***************************************************/

export function getStartOfDayDateTime(date?: Date) {
  return dayjs(date).startOf('day').toDate();
}

export function getEndOfDayDateTime(date?: Date) {
  return dayjs(date).endOf('day').toDate();
}

/**
 * date에 해당하는 문자열 포맷의 날짜 반환. 기본 오늘 날짜 반환
 * @param date 문자열 포맷의 날짜로 변환할 Date
 * @returns 문자열 포맷의 날짜
 */
export function getStrDate(date?: Date) {
  return dayjs(date).format('YYMMDD');
}

export function testDayJs() {
  console.log('KOR 시간: ', dayjs().format());
  console.log('UTC 시간: ', dayjs().utc().format());
  console.log('KOR format 시간: ', dayjs().format('YYMMDD HH:mm:ss'));
  console.log('UTC format 시간: ', dayjs().utc().format('YYMMDD HH:mm:ss'));
}
