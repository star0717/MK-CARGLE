import { HYDRATE } from "next-redux-wrapper";
import { ActionAPIs, ActionInterfaces } from "../interfaces";
import { User, UserAuthority } from "../../src/models/user.entity";
import { Company, CompanyApproval } from "../../src/models/company.entity";
import { BaseState } from "../interfaces/base/base.interface";

export const initialState: BaseState = {
  user: <User>{
    email: "",
    password: "",
    auth: UserAuthority.WORKER,
    name: "",
    _cID: "",
    hpNumber: "",
    postcode: "",
    address1: "",
    address2: "",
    joinDate: null,
    approval: false,
    confirm_rcv_mktInfo: false,
  },
  company: <Company>{
    name: "",
    comRegNum: "",
    mbRegNum: "",
    mbTypeNum: "",
    ownerName: "",
    busType: "",
    busItem: "",
    phoneNum: "",
    faxNum: "",
    postcode: "",
    address1: "",
    address2: "",
    approval: CompanyApproval.BEFORE,
  },
};

interface HydratePayload {
  baseAll: BaseState;
}

const baseAll = (
  state = initialState,
  action: ActionInterfaces | { type: typeof HYDRATE; payload: HydratePayload }
): BaseState => {
  switch (action.type) {
    //이게 뭘 뜻하는거지??
    case HYDRATE:
      return { ...state, ...action.payload.baseAll };

    case ActionAPIs.FIND_COMPANY_CLICK:
      return { ...state };

    default:
      return state;
  }
};

export default baseAll;
