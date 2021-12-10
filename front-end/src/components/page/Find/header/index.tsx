import type { NextPage } from "next";
import Link from "next/link";
import { WholeWrapper, Wrapper } from "../../../styles/CommonComponents";

const FindHeader: NextPage<any> = (props) => {
  return (
    <WholeWrapper>
      <Wrapper>
        <Link href="/sign/findemail">
          <a>이메일 찾기</a>
        </Link>
        <Link href="/sign/findpassword">
          <a>비밀번호 찾기</a>
        </Link>
      </Wrapper>
    </WholeWrapper>
  );
};

export default FindHeader;
