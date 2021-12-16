import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";
import CompletePresenter from "./completePresenter";

/**
 * 회원가입: 완료 컴포넌트(기능)
 * @param props
 * @returns
 */
const Complete: NextPage<any> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * 확인(logout 같은 기능) handler
   * @param e
   */
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push("/");
    });
  };

  // 화면구성에 넘길 props
  const fProps = {
    onSignOutHandler,
  };

  return <CompletePresenter {...fProps} />;
};

export default Complete;
