import { NextPage } from "next";
import React from "react";
import {
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  CommonButton,
  RsWrapper,
  Test,
  FooterWrapper,
  TextInput2,
  CommonTitle,
  CommonSubTitle,
  CommonTitleWrapper,
} from "../../../n2server/front-end/src/components/styles/CommonComponents";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

/**
 * 404 에러 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  return (
    <WholeWrapper>
      {/* <div style={{ minHeight: `100%`, backgroundColor: `#000` }}>
        <div
          style={{
            width: `100%`,
            paddingBottom: `150px`,
            backgroundColor: `red`,
          }}
        >
          컨텐츠
        </div>
      </div> */}
      <CommonTitleWrapper>
        <CommonTitle>계정관리</CommonTitle>
        <CommonSubTitle>
          계정관리를 위해 비밀번호를 입력해주세요.
        </CommonSubTitle>
      </CommonTitleWrapper>
      <RsWrapper>
        <Wrapper width={`500px`}>
          <form>
            <TextInput2
              placeholder="비밀번호를 입력하세요."
              width={`500px`}
              height={`60px`}
              margin={`0px 0px 10px 0px`}
            />

            <CommonButton type="submit">확인</CommonButton>
          </form>
        </Wrapper>
      </RsWrapper>
      <FooterWrapper bgColor={`#ddd`}>I'm Footer</FooterWrapper>
    </WholeWrapper>
  );
};

export default ByeolTest;
