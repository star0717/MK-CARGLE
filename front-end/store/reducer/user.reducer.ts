import { HYDRATE } from "next-redux-wrapper";
import {
  UserState,
  // UserInfo,
  // User,
  // Company,
  actionTypesUser,
  ActionsUser,
} from "../interfaces";
import { UserInfo } from "../../../models/dist/auth.entity";
import { User } from "../../../models/dist/user.entity";
import { Company } from "../../../models/dist/company.entity";

export const initialState: UserState = {
  signInInfo: <UserInfo>{
    id: "",
    pwd: "",
  },
  user: <User>{
    email: "",
    password: "",
    auth: "worker",
    name: "",
    comID: "",
    hpNumber: 0,
    approval: false,
  },
  company: <Company>{
    name: "",
    comRegNum: 0,
    mbRegNum: 0,
    mbTypeNum: 0,
    ownerName: "",
    busType: "",
    busItem: "",
    phoneNum: 0,
    faxNum: 0,
    address: "",
    approval: false,
  },
};

interface HydratePayload {
  userAll: UserState;
}

const userAll = (
  state = initialState,
  action: ActionsUser | { type: typeof HYDRATE; payload: HydratePayload }
): UserState => {
  switch (action.type) {
    //이게 뭘 뜻하는거지??
    case HYDRATE:
      return { ...state, ...action.payload.userAll };

    // onChange 기능
    case actionTypesUser.USER_INPUT:
      return {
        ...state,
        [action.data[0]]: action.data[1],
      };

    // 로그인 기능
    case actionTypesUser.USER_SIGNIN:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userAll;
