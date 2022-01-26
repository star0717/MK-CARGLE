import { BaseEntity } from './base.entity';
/**
 * 거래처의 연락처 정보를 저장하는 스키마
 */
export declare class Agency extends BaseEntity {
    name: string;
    comRegNum: string;
    manager: string;
    email: string;
    phoneNum: string;
    hpNum: string;
    faxNum: string;
    postcode: string;
    address1: string;
    address2: string;
    memo: string;
}
