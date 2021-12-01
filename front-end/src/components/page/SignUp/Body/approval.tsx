import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";

const Approval: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 다음에 하기(logout 같은 기능) handler
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push("/");
    });
  };

  return (
    <div>
      <h1>가입 심사가 진행 중입니다.</h1>
      <button type="button" onClick={onSignOutHandler}>
        돌아가기
      </button>
    </div>
  );
};

export default Approval;
