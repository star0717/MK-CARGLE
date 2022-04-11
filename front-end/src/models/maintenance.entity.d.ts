import { MainCustomerType, MainDocPubType, MainPartsType, MainStatus } from 'src/constants/maintenance.const';
import { BaseEntity } from './base.entity';
export declare class MainCar {
    name: string;
    model?: string;
    age?: string;
    regDate?: string;
    idNumber?: string;
    regNumber: string;
    distance?: string;
}
export declare class MainCustomer {
    phoneNumber: string;
    name?: string;
    _oID?: string;
}
export declare class MainWork {
    name: string;
    code?: string;
    tsCode?: string;
    type?: MainPartsType;
    price: number;
    quantity: number;
    sum: number;
    wage: number;
}
export declare class MainPrice {
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
export declare class MainDates {
    stored?: Date;
    startMa?: Date;
    endMa?: Date;
    released?: Date;
}
export declare class MainDocInfo {
    _oID: string;
    prAt?: Date;
    msgAt?: Date;
}
export declare class Maintenance extends BaseEntity {
    docNum?: string;
    workerName?: string;
    _tsID?: string;
    status: MainStatus;
    costomerType: MainCustomerType;
    dates?: MainDates;
    car: MainCar;
    works?: MainWork[];
    price?: MainPrice;
    customer: MainCustomer;
    estimate: MainDocInfo;
    statement: MainDocInfo;
}
export declare class MainFindOptions {
    regNumber?: string;
    status?: MainStatus;
    costomerType?: MainCustomerType;
}
export declare class MainPubDocInfo {
    type: MainDocPubType;
    phoneNumber?: string;
}
