import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";

import React from "react";
import { BodyWrapper } from "../../../styles/LayoutComponents";

const AdminMolitItemsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return <BodyWrapper ref={ref}>국토부항목관리</BodyWrapper>;
};

export default AdminMolitItemsPage;
