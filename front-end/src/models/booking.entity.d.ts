import { BookingState } from 'src/constants/booking.const';
import { BaseEntity } from './base.entity';
import { MainCustomer, MainCar } from './maintenance.entity';
export declare class Booking extends BaseEntity {
    bookingNum: string;
    bookingDate: Date;
    mainHopeDate: Date;
    customer: MainCustomer;
    car: MainCar;
    mainReContents: string;
    bookingState: BookingState;
}
