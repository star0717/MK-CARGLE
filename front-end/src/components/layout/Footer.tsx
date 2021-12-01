import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "../styles/CommonComponents";

const Footer: NextPage = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#292929",
        color: "#ffffff",
        padding: "20px 10px 50px 100px",
        fontSize: "12pt"
      }}
    >
      <div
        style={{
          padding: "0px 30px"
        }}
      >
        <Image
          src="/images/logoWhite.png"
          alt="Cargle Logo"
          width={110}
          height={45}
        />
      </div>
      <div>
        <p>
          MK Co.,Ltd. 대전광역시 유성구 대학로 227 3층 tel 1644-3486 Fax
          +82-42-368-0224 사업자 등록번호 338-88-00960 대표자 변무영
        </p>
        <p>&#169; COPYRIGHT 2018 MK CO.,LTD.. ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Footer;
