import { BaseEntity } from "./base.entity";
export declare class Company extends BaseEntity {
    name: string;
    comRegNum: string;
    mbRegNum: string;
    mbTypeNum: string;
    ownerName: string;
    busType: string;
    busItem: string;
    phoneNum: string;
    faxNum: string;
    address: string;
    approval: boolean;
}
