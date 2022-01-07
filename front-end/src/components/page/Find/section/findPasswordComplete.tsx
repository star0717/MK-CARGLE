import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import {
  CommonButton,
  CommonButtonWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import { FaPaperPlane } from "react-icons/fa";
import { UseLink } from "../../../../configure/router.entity";
import { _pFindPassword } from "../../../../configure/_pProps.entity";

/**
 * 계정찾기: 비밀번호 찾기 완료(화면)
 * @param props
 * @returns
 */
const FindPasswordComplete: NextPage = () => {
  const router = useRouter();

  return (
    <WholeWrapper>
      <Wrapper
        width={`60px`}
        height={`60px`}
        bgColor={`#314FA5`}
        radius={`60px`}
        margin={`0px 0px 36px 0px`}
      >
        <Text color={`#fff`} fontSize={`26px`} margin={`10px 3px 0px 0px`}>
          <FaPaperPlane />
        </Text>
      </Wrapper>
      <Text padding={`0px 0px 50px`} fontSize={`22px`}>
        입력된 이메일 주소로 <br />
        임시 비밀번호가 발송되었습니다.
      </Text>
      <Wrapper>
        <CommonButtonWrapper>
          <CommonButton
            onClick={() => {
              router.push(UseLink.INDEX);
            }}
          >
            로그인
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindPasswordComplete;
