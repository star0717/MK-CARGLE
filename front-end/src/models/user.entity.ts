import { BaseEntity } from "./base.entity";
/**
 * 사용자의 권한
 */
export enum UserAuthority {
  ADMIN = "admin",
  OWNER = "owner",
  WORKER = "worker",
}
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
}
