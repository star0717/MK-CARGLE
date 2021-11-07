import { UserInfo } from "../../../../models/dist/auth.entity";
import { User } from "../../../../models/dist/user.entity";
import { Company } from "../../../../models/dist/company.entity";
// import { UserAuthority } from "../../../../models/dist/user.entity";

// export interface UserInfo {
//   id: string;
//   pwd: string;
// }

// export interface User {
//   email: string;
//   password: string;
//   auth: UserAuthority;
//   name: string;
//   comID: string;
//   hpNumber: number;
//   approval: boolean;
// }

// export interface Company {
//   name: string;
//   comRegNum: number;
//   mbRegNum: number;
//   mbTypeNum: number;
//   ownerName: string;
//   busType: string;
//   busItem: string;
//   phoneNum: number;
//   faxNum: number;
//   address: string;
//   approval: boolean;
// }

export interface UserState {
  signInInfo: UserInfo;
  user: User;
  company: Company;
}
