import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  RsWrapper,
  SmallButton,
  WholeWrapper,
} from "src/components/styles/CommonComponents";

const TestPage: NextPage<any> = (props) => {
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
        <RsWrapper>
          <SmallButton type="button" kindOf={`default`}>
            상세검색
          </SmallButton>
        </RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default TestPage;
