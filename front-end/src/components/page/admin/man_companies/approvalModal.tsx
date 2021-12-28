import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import { WholeWrapper } from "../../../styles/CommonComponents";
import React from "react";

const ManComApprovalModal: NextPage<any> = (props) => {
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return <WholeWrapper ref={ref}></WholeWrapper>;
};

export default ManComApprovalModal;
