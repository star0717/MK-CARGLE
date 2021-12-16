import type { NextPage } from "next";
import SignUpHeaderPresenter from "./indexPresenter";

/**
 * 회원가입: 공통 헤더 컴포넌트(기능)
 * @param props
 * @returns
 */
const SignUpHeader: NextPage<any> = (props) => {
  return <SignUpHeaderPresenter {...props} />;
};

export default SignUpHeader;
