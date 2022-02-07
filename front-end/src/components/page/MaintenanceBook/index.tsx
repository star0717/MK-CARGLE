import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  RsWrapper,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";

const MaintenanceBookPage: NextPage<_MainProps> = (props) => {
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
  return (
    <BodyWrapper>
      <WholeWrapper>
        <RsWrapper>정비장부</RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default MaintenanceBookPage;