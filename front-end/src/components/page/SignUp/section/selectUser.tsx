import { NextPage } from "next";
import SelectUserPresenter from "./selectUserPresenter";

/**
 * 회원가입: 가입유형 선택 컴포넌트(기능)
 * @param props
 * @returns
 */
const SelectUser: NextPage<any> = (props) => {
  // props 재정의
  const user = props.user;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const setUserAuth = props.setUserAuth;
  const UserAuthority = props.UserAuthority;

  // 화면구성에 넘길 props
  const fProps = {
    user,
    stepNumber,
    setStepNumber,
    setUserAuth,
    UserAuthority,
  };

  return <SelectUserPresenter {...fProps} />;
};

export default SelectUser;
