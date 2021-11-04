import { HYDRATE } from "next-redux-wrapper";
import { UserInfo, actionTypesUser, ActionsUser } from "../interfaces";

export const initialState: UserInfo = {
  id: "",
  password: "",
  email: "",
  address: "",
};

interface HydratePayload {
  user: UserInfo;
}

const user = (
  state = initialState,
  action: ActionsUser | { type: typeof HYDRATE; payload: HydratePayload }
): UserInfo => {
  switch (action.type) {
    //이게 뭘 뜻하는거지??
    case HYDRATE:
      return { ...state, ...action.payload.user };

    // 로그인 기능
    case actionTypesUser.USER_LOGIN:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default user;
