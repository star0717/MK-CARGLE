/*****************************************************************
 * 국토부 정비이력 관련 체계
 *****************************************************************/
import { BaseEntity } from './base.entity';
export declare class Part extends BaseEntity {
    label: string;
    name: string;
    nickName: string[];
    code: string;
    tsCode?: string;
    __v?: number;
}
