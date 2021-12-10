import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { Text, WholeWrapper, Wrapper } from "../../../styles/CommonComponents";

const FindEmailComplete: NextPage<any> = (props) => {
  const router = useRouter();

  // 필요한 props 재정의
  const findEmail = props.findEmail;

  return (
    <WholeWrapper>
      <Text>회원님의 이메일은 다음과 같습니다.</Text>
      <Text>{findEmail}</Text>
      <Wrapper>
        <button
          type="button"
          onClick={() => {
            router.push("/");
          }}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/sign/findpassword");
          }}
        >
          비밀번호찾기
        </button>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindEmailComplete;
