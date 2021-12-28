import { combineReducers, Reducer, AnyAction } from "redux";
import { RootStateInterface } from "../interfaces/RootState";
import userAll from "./user.reducer";
import baseAll from "./base.reducer";

const rootReducer: Reducer<RootStateInterface, AnyAction> =
  combineReducers<RootStateInterface>({
    userAll,
    baseAll,
  });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
