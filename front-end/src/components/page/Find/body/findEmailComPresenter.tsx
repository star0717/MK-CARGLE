import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import {
  CommonButton,
  CommonButtonWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";

const FindEmailComplete: NextPage<any> = (props) => {
  const router = useRouter();

  // 필요한 props 재정의
  const findEmail = props.findEmail;

  return (
    <WholeWrapper>
      <Text padding={`0px 0px 30px`} fontSize={`22px`}>
        회원님의 이메일은 다음과 같습니다.
      </Text>
      <Wrapper
        width={`500px`}
        height={`100px`}
        border={`1px solid #ccc`}
        radius={`5px`}
        margin={`0px 0px 30px`}
      >
        <Text fontSize={`22px`} fontWeight={`600`} color={`#0066ff`}>
          {findEmail}
        </Text>
      </Wrapper>
      <Wrapper>
        <CommonButtonWrapper>
          <CommonButton
            type="button"
            onClick={() => {
              router.push("/");
            }}
            kindOf={`white`}
            margin={`0px 0px 20px`}
          >
            로그인
          </CommonButton>
          <CommonButton
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              router.push("/sign/findpassword");
            }}
          >
            비밀번호 찾기
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindEmailComplete;
