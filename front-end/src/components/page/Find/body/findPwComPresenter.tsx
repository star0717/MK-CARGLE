import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import {
  CommonButton,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";

const FindPwComPresenter: NextPage<any> = (props) => {
  const router = useRouter();

  return (
    <WholeWrapper>
      <Text>입력된 이메일 주소로 임시비밀번호가 전송되었습니다.</Text>
      <Wrapper>
        <CommonButton
          onClick={() => {
            router.push("/");
          }}
        >
          로그인
        </CommonButton>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindPwComPresenter;
