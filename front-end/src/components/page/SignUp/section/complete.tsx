import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";
import { _cSignUpProps } from "../../../../configure/_cProps.entity";
import { UseLink } from "../../../../configure/router.entity";
import CompletePresenter from "./completePresenter";
import { _pCompleteProps } from "../../../../configure/_pProps.entity";

/**
 * 회원가입: 완료 컴포넌트(기능)
 * @param props
 * @returns
 */
const Complete: NextPage<_cSignUpProps> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * 확인(logout 같은 기능) handler
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push(UseLink.INDEX);
    });
  };

  // 화면구성에 넘길 props
  const fProps: _pCompleteProps = {
    onSignOutHandler,
  };

  return <CompletePresenter {...fProps} />;
};

export default Complete;
