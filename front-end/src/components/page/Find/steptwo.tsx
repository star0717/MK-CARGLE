import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { stepOption } from ".";

const StepTwo: NextPage<stepOption> = (props) => {
  const router = useRouter();
  const setHeaderName = props.setHeaderName;
  const setStepNumber = props.setStepNumber;
  const [findEmail, setFindEmail] = useState(props.findEmail);

  const FindEmailHandler = (findEmail: string) => {
    const id = findEmail.split("@")[0].split("");
    if (id.length > 2) {
      for (let i = 2; i < id.length; i++) {
        id[i] = "*";
      }
    }
    return id.join("") + "@" + findEmail.split("@")[1];
  };

  return (
    <div>
      <div>회원님의 이메일은 다음과 같습니다.</div>
      <div>{FindEmailHandler(findEmail)}</div>
      <div>
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          로그인
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            setHeaderName("PW");
            setStepNumber(3);
          }}
        >
          비밀번호찾기
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
