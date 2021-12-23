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
} from "../../../n2server/front-end/src/components/styles/CommonComponents";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

/**
 * 404 에러 페이지
 * @returns
 */
const ByeolTest: NextPage = () => {
  return (
    <div
      style={{
        height: `100%`,
        // position: `relative`,
        backgroundColor: `#000`,
      }}
    >
      <div style={{ minHeight: `100%`, backgroundColor: `#000` }}>
        <div
          style={{
            width: `100%`,
            paddingBottom: `150px`,
            backgroundColor: `red`,
          }}
        >
          컨텐츠
        </div>
      </div>
      <FooterWrapper bgColor={`#ddd`}>I'm Footer</FooterWrapper>
    </div>
  );
};

export default ByeolTest;
