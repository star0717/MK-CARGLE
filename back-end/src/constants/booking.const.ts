import dayjs from 'dayjs';
import { BookingFindOptions } from 'src/models/booking.entity';

export enum BookingState {
  NEW = 'new',
  APPROVAL = 'approval',
  REJECT = 'reject',
  MAINTENANCE = 'maintenance',
}

export enum SetBookingTime {
  ALL = 'all',
  WEEK = 'week',
  DIFF = 'diff',
}

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

/********** 검색 옵션 쿼리 생성 ******************/
export const genBookingOptionQuery = (data: BookingFindOptions) => {
  let query = '&';
  if (data?.regNumber) query += 'regNumber=' + data.regNumber;
  if (data?.phoneNumber) query += 'phoneNumber=' + data.phoneNumber;
  return query;
};
