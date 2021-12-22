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
        backgroundColor: `blue`,
      }}
    >
      <div style={{ minHeight: `100%` }}>
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
      <div
        style={{
          width: `100%`,
          height: `150px`,
          position: `absolute`,
          bottom: `0`,
          left: `0`,
          backgroundColor: `green`,
        }}
      >
        푸터랍니다.
      </div>
    </div>
  );
};

export default ByeolTest;
