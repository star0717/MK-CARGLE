import { combineReducers, Reducer, AnyAction } from "redux";
import { RootStateInterface } from "../interfaces/RootState";
import user from "./user.reducer";

const rootReducer: Reducer<RootStateInterface, AnyAction> =
  combineReducers<RootStateInterface>({
    user,
  });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
