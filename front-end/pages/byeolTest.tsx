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
  FooterWholeWrapper,
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
    // <WholeWrapper minHeight={`100vh`}>
    //   <FooterWrapper height={`150px`} bgColor={`#ccc`}>
    //     HI, I'm Footerr
    //   </FooterWrapper>
    // </WholeWrapper>

    <FooterWholeWrapper>
      <FooterWrapper>나 푸터</FooterWrapper>
    </FooterWholeWrapper>
  );
};

export default ByeolTest;
