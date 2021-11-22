import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch } from "react-redux";

const Approval: NextPage<any> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return <div></div>;
};

export default Approval;
