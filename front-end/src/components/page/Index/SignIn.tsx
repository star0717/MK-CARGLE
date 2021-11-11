import type { NextPage } from "next";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../../../store/interfaces";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { initialState } from "../../../../store/reducer/user.reducer";
import { signInUserAction } from "../../../../store/action/user.action";

const SignIn: NextPage<any> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // redux store에서 signIn 정보만 가져옴
  const { signInInfo } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  // input 값을 위한 state
  // 가져온 signIn 값과 props의 id 값을 input state의 초기값으로 세팅
  const [inputSignIn, setInputSignIn] = useState({
    ...signInInfo,
    id: props.saveId,
  });

  // 아이디 저장 체크 여부를 위한 state
  const [saveId, setSaveId] = useState(props.saveCheck);
  // const [keepSignIn, setKeepSignIn] = useState(false);

  // input 값 입력 시 텍스트 변환을 위한 handler
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSignIn({ ...inputSignIn, [e.target.name]: e.target.value });
  };

  // 로그인 시 handler
  const onSignInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSignIn.id === "") {
      // 아이디 미입력 시
      alert("아이디를 입력해주세요.");
    } else if (inputSignIn.pwd === "") {
      // 비밀번호 미입력 시
      alert("비밀번호를 입력해주세요.");
    } else {
      // 아이디, 비밀번호 정상 입력 시
      dispatch(signInUserAction(inputSignIn)).then(
        (res: any) => {
          // 아이디 저장할 경우 쿠키로 저장
          if (saveId) {
            // const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
            Cookies.set("saveId", inputSignIn.id, { expires: 1 });
            // 아이디 저장안할 경우 쿠키 삭제(이미 생성 후 안할 경우 쿠키는 남아있기 때문에 삭제 진행)
          } else {
            Cookies.remove("saveId");
          }
          router.push("/view/main");
        },
        (err) => {
          // 입력 값이 계정과 다를 경우 에러
          // Nest에서 전송해주는 status code에 맞게 핸들링
          if (err.response.status === 401) {
            alert("아이디 / 비밀번호를 확인해주세요.");
          }
        }
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        backgroundImage: `url("../../images/background2.png")`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 중앙 화면 */}
      <div
        style={{
          width: "900px",
          height: "400px",
          display: "flex",
          backgroundColor: "#E2E2E2",
        }}
      >
        {/* 중앙 화면 좌측 */}
        <div
          style={{
            width: "50%",
            padding: "20px",
            backgroundImage: `url("../../images/background1.png")`,
          }}
        >
          <h3 style={{ marginTop: "0" }}>
            엠케이솔루션에 오신 것을 환영합니다.
          </h3>
          <p>등록된 회원정보가 기억나지 않으십니까?</p>
          <div>
            <Link href="/view/find">
              <a style={{ fontWeight: "bold" }}>
                이메일 및 패스워드 찾기 &#62;
              </a>
            </Link>
          </div>
          <button
            onClick={() => {
              router.push("/view/signup");
            }}
          >
            회원가입
          </button>
        </div>

        {/* 중앙 화면 우측  */}
        <div style={{ width: "50%", padding: "40px", textAlign: "center" }}>
          <h3>로그인</h3>
          <div>
            {/* 로그인 입력 form */}
            <form onSubmit={onSignInHandler}>
              {/* 이메일 input */}
              <div style={{ textAlign: "left" }}>
                <p>이메일</p>
                <input
                  type="email"
                  name="id"
                  value={inputSignIn.id}
                  onChange={onInputHandler}
                  style={{ width: "100%" }}
                />
              </div>
              {/* 비밀번호 input */}
              <div style={{ textAlign: "left" }}>
                <p>비밀번호</p>
                <input
                  type="password"
                  name="pwd"
                  value={inputSignIn.pwd || ""}
                  onChange={onInputHandler}
                  style={{ width: "100%" }}
                />
              </div>
              {/* 체크박스 div */}
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* 아이디 저장 체크박스 */}
                <div>
                  <span>아이디 저장</span>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setSaveId(e.target.checked);
                    }}
                    checked={saveId}
                  ></input>
                </div>
              </div>
              {/* 로그인 버튼 */}
              <button type="submit">로그인</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
