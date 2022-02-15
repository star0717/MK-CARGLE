import { MainCustomerType, MainPartsType, MainStatus } from 'src/constants/maintenance.const';
import { BaseEntity } from './base.entity';
export declare class CarInfo {
    name: string;
    model?: string;
    age?: string;
    regDate?: string;
    idNumber?: string;
    regNumber: string;
    distance?: string;
}
export declare class Customer {
    phoneNumber: string;
    _oID?: string;
}
export declare class Work {
    name: string;
    code?: string;
    tsCode?: string;
    type?: MainPartsType;
    price: number;
    quantity: number;
    wage: number;
}
export declare class Price {
    isIncluded: boolean;
    partsSum: number;
    wageSum: number;
    sum: number;
    discount: number;
    vat: number;
    total: number;
    cash: number;
    credit: number;
    insurance: number;
    balance: number;
}
export declare class Dates {
    stored?: Date;
    startMa?: Date;
    endMa?: Date;
    released?: Date;
}
export declare class Maintenance extends BaseEntity {
    docNum?: string;
    workerName?: string;
    _tsID?: string;
    status: MainStatus;
    costomerType: MainCustomerType;
    dates?: Dates;
    car: CarInfo;
    works?: Work[];
    price?: Price;
    customer: Customer;
}
export declare class MainFindOptions {
    regNumber?: string;
    status?: MainStatus;
    costomerType?: MainCustomerType;
}
