import { BaseEntity } from './base.entity';
import { MainCar, MainCustomer, MainPrice } from './maintenance.entity';
import { MainPartsType } from 'src/constants/maintenance.const';
export declare class CompanyInfo {
    name: string;
    comRegNum: string;
    ownerName: string;
    busType?: string;
    busItem?: string;
    phoneNum: string;
    faxNum?: string;
    address: string;
}
export declare class WorkInfo {
    name: string;
    type?: MainPartsType;
    price: number;
    quantity: number;
    wage: number;
}
export declare class MainDoc extends BaseEntity {
    docNum: string;
    mainNum: string;
    customer: MainCustomer;
    company: CompanyInfo;
    car: MainCar;
    works: WorkInfo[];
    price?: MainPrice;
}
