import type { NextPage } from "next";
import SignUpHeaderPresenter from "./indexPresenter";

const SignUpHeader: NextPage<any> = (props) => {
  return <SignUpHeaderPresenter {...props} />;
};

export default SignUpHeader;
