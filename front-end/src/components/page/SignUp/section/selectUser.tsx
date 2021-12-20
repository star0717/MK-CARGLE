import { NextPage } from "next";
import { _cSignUpProps } from "../../../../configure/_cProps.entity";
import { _pSelectUserProps } from "../../../../configure/_pProps.entity";
import SelectUserPresenter from "./selectUserPresenter";

/**
 * 회원가입: 가입유형 선택 컴포넌트(기능)
 * @param props
 * @returns
 */
const SelectUser: NextPage<_cSignUpProps> = (props) => {
  // 화면구성에 넘길 props
  const fProps: _pSelectUserProps = {
    ...props,
  };

  return <SelectUserPresenter {...fProps} />;
};

export default SelectUser;
