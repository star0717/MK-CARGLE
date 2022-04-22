import { BookingState, RejectReason } from 'src/constants/booking.const';
import { BaseEntity } from './base.entity';
import { MainCustomer, MainCar } from './maintenance.entity';
export declare class RejectOption {
    phoneNumber?: string;
    rejectReason?: RejectReason;
    rejectText?: string;
}
export declare class Booking extends BaseEntity {
    bookingNum?: string;
    bookingDate?: Date;
    mainHopeDate: Date;
    customer?: MainCustomer;
    car?: MainCar;
    mainReContents?: string;
    bookingState: BookingState;
    rejectOption?: RejectOption;
}
export declare class BookingFindOptions {
    regNumber?: string;
    phoneNumber?: string;
    mainHopeDate?: any;
    bookingState?: BookingState | string;
}
export declare class MainHopeTime {
    hour?: string;
    minute?: string;
}
