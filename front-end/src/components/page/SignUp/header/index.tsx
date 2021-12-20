import type { NextPage } from "next";
import { _cSignUpProps } from "../../../../configure/_cProps.entity";
import SignUpHeaderPresenter from "./indexPresenter";

/**
 * 회원가입: 공통 헤더 컴포넌트(기능)
 * @param props
 * @returns
 */
const SignUpHeader: NextPage<_cSignUpProps> = (props) => {
  return <SignUpHeaderPresenter {...props} />;
};

export default SignUpHeader;
