import { BaseEntity } from './base.entity';
/**
 * 거래처의 연락처 정보를 저장하는 스키마
 */
export declare class Agency extends BaseEntity {
    name: string;
    manager: string;
    phoneNum: string;
    hpNum: string;
    address1: string;
    address2: string;
    memo?: string;
}
