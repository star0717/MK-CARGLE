import { MainCar } from "src/models/maintenance.entity";
import { AuthTokenInfo } from "../models/auth.entity";

// 페이지 props //

/**
 * 로그인 페이지 props
 */
export interface _SignInProps {
  saveId: string;
  saveCheck: boolean;
}

/**
 * 메인 페이지 props
 */
export interface _MainProps {
  tokenValue: AuthTokenInfo;
  data?: any;
  openMenu?: boolean;
  setOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 정비장부: 차량검색
 */
export interface CarSearch extends MainCar {
  regNumQuery?: string;
}
