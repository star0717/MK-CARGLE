import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";
import ApprovalPresenter from "./approvalPresenter";

/**
 * 회원가입: 업체 승인 대기 컴포넌트(기능)
 * @param props
 * @returns
 */
const Approval: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * 다음에 하기(logout 같은 기능) handler
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

  return <ApprovalPresenter {...fProps} />;
};

export default Approval;
