import { NextPage } from "next";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { actionTypesUser, UserState } from "../../../../../store/interfaces";
import { RootStateInterface } from "../../../../../store/interfaces/RootState";
import { UserAuthority } from "../../../../models/user.entity";

const SelectUser: NextPage<any> = (props) => {
  const dispatch = useDispatch();

  // props 재정의
  const user = props.user;
  const stepNumber = props.stepNumber;
  const setStepNumber = props.setStepNumber;
  const setUserAuth = props.setUserAuth;

  // // redux store에서 user, company 정보 가져옴
  // const { user } = useSelector(
  //   (state: RootStateInterface): UserState => state.userAll
  // );

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "350px",
          backgroundColor: "red",
          display: "flex",
        }}
      >
        {/* 사업자 회원가입 버튼 */}
        <div
          style={{
            width: "50%",
            height: "80%",
            backgroundColor: "lightslategrey",
            margin: "60px",
          }}
          onClick={() => {
            setStepNumber(stepNumber + 1);
            setUserAuth(UserAuthority.OWNER);
            dispatch({ type: actionTypesUser.USER_INIT });
            dispatch({
              type: actionTypesUser.INPUT_ACCOUNT,
              payload: { ...user, auth: UserAuthority.OWNER },
            });
          }}
        >
          사업자
        </div>

        {/* 직원 회원가입 버튼 */}
        <div
          style={{
            width: "50%",
            height: "80%",
            backgroundColor: "linen",
            margin: "60px",
          }}
          onClick={() => {
            setStepNumber(stepNumber + 1);
            setUserAuth(UserAuthority.WORKER);
            dispatch({ type: actionTypesUser.USER_INIT });
            dispatch({
              type: actionTypesUser.INPUT_ACCOUNT,
              payload: { ...user, auth: UserAuthority.WORKER },
            });
          }}
        >
          직원
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link href="/">
          <a>다음에 가입하기</a>
        </Link>
      </div>
    </div>
  );
};

export default SelectUser;
