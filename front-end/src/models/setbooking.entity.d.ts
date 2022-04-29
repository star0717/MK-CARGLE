import { BaseEntity } from './base.entity';
import { SetBookingTime } from 'src/constants/booking.const';
export declare class Hours {
    openingHours: Date;
    closingHours: Date;
    breakTime: Date;
    breakEndTime: Date;
}
export declare class OfficeHours {
    mon: Hours;
    tue: Hours;
    wed: Hours;
    thu: Hours;
    fri: Hours;
    sat: Hours;
    sun: Hours;
}
export declare class Mprice {
    mainItems?: string;
    mainPrice?: number;
}
export declare class SetBooking extends BaseEntity {
    intro?: string;
    dayOff?: string[];
    setBookingTime?: SetBookingTime;
    officeHour?: string;
    lift?: number;
    mPrice?: Mprice[];
    weekTime?: number[][];
}
