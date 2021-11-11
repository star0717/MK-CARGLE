import type { NextPage } from "next";
import React from "react";
import DaumPostcode from "react-daum-postcode";

const Post: NextPage = (props: any) => {
  const addressMain = props.addressMain;
  const setAddressMain = props.setAddressMain;
  // 주소 검색 api handler
  const addressHandler = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddressMain(fullAddress);
    //   setAddressApi(false);
  };

  return (
    <>
      <DaumPostcode autoClose onComplete={addressHandler} />
    </>
  );
};

export default Post;
