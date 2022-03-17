import { UserInfo } from "../../../src/models/auth.entity";
import { User } from "../../../src/models/user.entity";
import { Company } from "../../../src/models/company.entity";

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

export interface FormInput {
  companyName: string;
  companyNum: string;
  passwordCheck: string;
}

export interface FormCheck {
  mkTerm: boolean;
  privacyTerm: boolean;
  marketTerm: boolean;
  emailReadOnly: boolean;
  emailSend: boolean;
  authNumCheck: boolean;
  companyCheck: boolean;
}

export interface UserState {
  signInInfo: UserInfo;
  user: User;
  company: Company;
  formInput: FormInput;
  formCheck: FormCheck;
}
