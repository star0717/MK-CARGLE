import { BaseEntity } from "./base.entity";
export enum CompanyApproval {
  BEFORE = "before",
  ING = "ing",
  DONE = "done",
}
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
  postcode: string;
  address1: string;
  address2: string;
  approval: CompanyApproval;
}
