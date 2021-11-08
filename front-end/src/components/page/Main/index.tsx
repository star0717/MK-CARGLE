import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../../store/action/user.action";

const Main: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      router.push("/");
    });
  };
  return (
    <div>
      <p>메인테스트</p>
      <button type="button" onClick={onSignOutHandler}>
        로그아웃
      </button>
    </div>
  );
};

export default Main;
