import { NextPage } from "next";
import { useDispatch } from "react-redux";
import SelectUserPresenter from "./selectUserPresenter";

const SelectUser: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const user = props.user;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const setUserAuth = props.setUserAuth;
  const UserAuthority = props.UserAuthority;

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
