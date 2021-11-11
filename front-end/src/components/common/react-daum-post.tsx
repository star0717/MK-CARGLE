import type { NextPage } from "next";
import React from "react";
import DaumPostcode from "react-daum-postcode";

const Post: NextPage<any> = (props) => {
  const setAddressMain = props.setAddressMain;
  const setModalOpen = props.setModalOpen;

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50px",
    zIndex: "100",
    padding: "7px",
  };

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
    setModalOpen(false);
  };

  return (
    <>
      <DaumPostcode
        autoClose
        onComplete={addressHandler}
        style={{ height: "500px" }}
      />
    </>
  );
};

export default Post;
