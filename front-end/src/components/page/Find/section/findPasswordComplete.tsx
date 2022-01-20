import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import {
  CommonButton,
  CommonButtonWrapper,
  JoinStepBar,
  RsWrapper,
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
      <RsWrapper kindOf={`short`}>
        <Wrapper padding={`0px 0px 20px`}>
          <JoinStepBar kindOf={`progress`}>
            <FaPaperPlane />
          </JoinStepBar>
        </Wrapper>
        <Text padding={`0px 0px 50px`} fontSize={`22px`}>
          입력된 이메일 주소로 <br />
          임시 비밀번호가 발송되었습니다.
        </Text>
        <Wrapper>
          <CommonButtonWrapper kindOf={`column`}>
            <CommonButton
              onClick={() => {
                router.push(UseLink.INDEX);
              }}
            >
              로그인
            </CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default FindPasswordComplete;
