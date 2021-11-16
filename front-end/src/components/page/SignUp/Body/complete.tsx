import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const SignupComplete: NextPage<any> = (props) => {
  const router = useRouter();
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
      <input
        value="확인"
        type="button"
        onClick={() => {
          router.push("/");
        }}
      />
    </div>
  );
};

export default SignupComplete;
