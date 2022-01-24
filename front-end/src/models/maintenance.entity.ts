import { MaintenanceCustomerType, MaintenancePartsType, MaintenanceStatus } from 'src/constants/model.const';
import { BaseEntity } from './base.entity';
export declare class CarInfo {
    name: string;
    model?: string;
    regNumber: string;
    distance?: string;
    regDate?: string;
    idNumber: string;
}
export declare class CustomerInfo {
    name: string;
    phoneNumber: string;
}
export declare class PartInfo {
    name: string;
    code: string;
    tsCode?: string;
    type: MaintenancePartsType;
    price: string;
    quantity: string;
    wage?: string;
}
export declare class Maintenance extends BaseEntity {
    storedAt?: Date;
    releasedAt?: Date;
    workerName: string;
    _tsID?: string;
    status: MaintenanceStatus;
    costomerType: MaintenanceCustomerType;
    carInfo: CarInfo;
    customer: CustomerInfo;
}
