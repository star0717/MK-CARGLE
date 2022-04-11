import { BaseEntity } from './base.entity';
import { UserAuthority } from 'src/constants/model.const';
/**
 * 사용자 모델 스키마
 */
export declare class User extends BaseEntity {
    email: string;
    password: string;
    auth: UserAuthority;
    name: string;
    _cID: string;
    hpNumber: string;
    postcode: string;
    address1: string;
    address2: string;
    joinDate: Date;
    approval: boolean;
    confirm_rcv_mktInfo: boolean;
    fcmToken?: string;
}
