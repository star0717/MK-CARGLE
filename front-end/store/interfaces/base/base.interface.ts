import { Company } from "../../../src/models/company.entity";
import { User } from "../../../src/models/user.entity";

export interface BaseState {
  user: User;
  company: Company;
}
