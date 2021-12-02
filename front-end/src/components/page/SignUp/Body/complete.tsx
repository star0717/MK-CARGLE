import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { signOutUserAction } from "../../../../../store/action/user.action";
import { actionTypesUser } from "../../../../../store/interfaces";

const SignupComplete: NextPage<any> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 확인(logout 같은 기능) handler
  const onSignOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOutUserAction()).then((res: any) => {
      dispatch({ type: actionTypesUser.USER_INIT });
      router.push("/");
    });
  };

  return (
    <div
      style={{
        width: "95%",
        height: "300px",
        backgroundColor: "mintcream",
        margin: "10px",
      }}
    >
      <div>
        회원가입이 완료되었습니다.
        <br />
        가입승인 후 정상 이용이 가능합니다.
      </div>
      <button type="button" onClick={onSignOutHandler}>
        확인
      </button>
    </div>
  );
};

export default SignupComplete;
