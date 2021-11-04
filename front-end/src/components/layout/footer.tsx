import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Footer: NextPage = () => {
  return (
    <div
      style={{
        marginTop: "auto",
        width: "100%",
        height: "100px",
        backgroundColor: "skyblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
