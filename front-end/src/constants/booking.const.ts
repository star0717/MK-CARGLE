import { BookingFindOptions } from 'src/models/booking.entity';

export enum BookingState {
  NEW = 'new',
  APPROVAL = 'approval',
  REJECT = 'reject',
  MAINTENANCE = 'maintenance',
}

/********** 검색 옵션 쿼리 생성 ******************/
export const genBookingOptionQuery = (data: BookingFindOptions) => {
  let query = '&';
  if (data?.regNumber) query += 'regNumber=' + data.regNumber;
  if (data?.phoneNumber) query += 'phoneNumber=' + data.phoneNumber;
  return query;
};
