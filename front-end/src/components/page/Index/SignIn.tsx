import type { NextPage } from "next";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../../../store/interfaces";
import { RootStateInterface } from "../../../../store/interfaces/RootState";
import { initialState } from "../../../../store/reducer/user.reducer";
import { signInUserAction } from "../../../../store/action/user.action";
import styled from "styled-components";
import { UserInfo } from "../../../models/auth.entity";
import { formRegEx } from "../../../validation/regEx";

//SCSS
const ComponentMainBody = styled.div`
    width: 100%;
    height: 600px;
    background-image: url("../../images/background2.png");
    display: flex;
    justify-content: center;
    align-items: center;

  .CSI {
    width: 900px;
    height: 400px;
    display: flex;
    background-color: #E2E2E2;
  }
  .CSIdiv1 {
    width: 50%;
    padding: 20px;
    backgroundImage: url("../../images/background1.png");

    .h3 {}

    .p {}

    .div {}

    .button {}
  }


  .CSIdiv2 {
    width: 50%;
    padding: 40px;
    text-align: center;

    .h3 {}

    .div1 {

      .div1 {
        text-align: left;

        .p {}

        .input { width : 100%; }
      }

    .div2 {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      align-items: center;

      .div1 {
        .span {}

        .input {}
      }
    }

    .button {}

  }
`;

const SignIn: NextPage<any> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // react-hook-form 사용을 위한 선언
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

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
  const onSignInHandler: SubmitHandler<UserInfo> = (data) => {
    if (inputSignIn.id === "" || !formRegEx.EMAIL.test(inputSignIn.id)) {
      setError("id", {
        type: "idError",
        message: "이메일을 입력해주세요.",
      });
    } else if (inputSignIn.pwd === "") {
      setError("id", {
        type: "pwdError",
        message: "비밀번호를 입력해주세요.",
      });
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
    <ComponentMainBody>
      {/* 중앙 화면 */}
      <div className="CSI">
        {/* 중앙 화면 좌측 */}
        <div className="CSIdiv1">
          <h3 className="h3">엠케이솔루션에 오신 것을 환영합니다.</h3>
          <p className="p">등록된 회원정보가 기억나지 않으십니까?</p>
          <div className="div">
            <Link href="/view/find">
              <a style={{ fontWeight: "bold" }}>
                이메일 및 패스워드 찾기 &#62;
              </a>
            </Link>
          </div>
          <button
            className="button"
            onClick={() => {
              router.push("/view/signup");
            }}
          >
            회원가입
          </button>
        </div>

        {/* 중앙 화면 우측  */}
        <div className="CSIdiv2">
          <h3 className="h3">로그인</h3>
          <div className="div1">
            {/* 로그인 입력 form */}
            <form onSubmit={handleSubmit(onSignInHandler)}>
              {/* 이메일 input */}
              <div className="div1">
                <p className="p">이메일</p>
                <input
                  className="input"
                  type="text"
                  value={inputSignIn.id}
                  {...register("id", {
                    onChange: (e) => {
                      onInputHandler(e);
                    },
                  })}
                />
              </div>
              {/* 비밀번호 input */}
              <div className="div1">
                <p className="p">비밀번호</p>
                <input
                  className="input"
                  type="password"
                  value={inputSignIn.pwd}
                  {...register("pwd", {
                    onChange: (e) => {
                      onInputHandler(e);
                    },
                  })}
                />
              </div>
              {/* 체크박스 div */}
              <div className="div2">
                {/* 아이디 저장 체크박스 */}
                <div className="div1">
                  <span className="span">아이디 저장</span>
                  <input
                    className="input"
                    type="checkbox"
                    onChange={(e) => {
                      setSaveId(e.target.checked);
                    }}
                    checked={saveId}
                  ></input>
                </div>
              </div>
              {(errors.id?.type === "idError" ||
                errors.id?.type === "pwdError") && (
                <p
                  style={{
                    margin: "0",
                    fontSize: "8px",
                    color: "red",
                  }}
                >
                  {errors.id.message}
                </p>
              )}
              {/* 로그인 버튼 */}
              <button className="button" type="submit">
                로그인
              </button>
            </form>
          </div>
        </div>
      </div>
    </ComponentMainBody>
  );
};

export default SignIn;
