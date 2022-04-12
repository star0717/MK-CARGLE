import { BaseEntity } from './base.entity';
import { MainCar, MainCustomer } from './maintenance.entity';
import { BookingState } from 'src/constants/booking.const';
export declare class Hours {
    openingHours: Date;
    closingHours: Date;
    breakTime: Date;
    breakEndTime: Date;
}
export declare class OfficeHours {
    MON: Hours;
    TUE: Hours;
    WED: Hours;
    THU: Hours;
    FRI: Hours;
    SET: Hours;
    SUN: Hours;
}
export declare class Mprice {
    mainItems?: string;
    mainPrice?: number;
}
export declare class SetBooking extends BaseEntity {
    intro?: string;
    dayOff?: string[];
    officeHour: OfficeHours;
    lift?: number;
    mPrice?: Mprice[];
}
export declare class Booking extends BaseEntity {
    bookingDate: Date;
    mainHopeDate: Date;
    customer: MainCustomer;
    car: MainCar;
    mainReContents: string;
    bookingState: BookingState;
}
