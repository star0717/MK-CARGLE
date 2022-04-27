import { BaseEntity } from './base.entity';
import { SetBookingTime } from 'src/constants/booking.const';
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
    SAT: Hours;
    SUN: Hours;
}
export declare class Mprice {
    mainItems?: string;
    mainPrice?: number;
}
export declare class SetBooking extends BaseEntity {
    intro?: string;
    dayOff?: string[];
    setBookingTime?: SetBookingTime;
    officeHour: string;
    lift?: number;
    mPrice?: Mprice[];
    weekTime?: [][];
}
