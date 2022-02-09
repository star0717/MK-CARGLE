import React from "react";
import { NextPage } from "next";
import { Wrapper } from "src/components/styles/CommonComponents";
import { useResizeDetector } from "react-resize-detector";

const BlackWrapper: NextPage = () => {
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
  const { width, height, ref } = useResizeDetector();

  return (
    <Wrapper width={`100%`} height={`100vh`} background={`rgba(0,0,0,0.8)`}>
      안보이지롱
    </Wrapper>
  );
};

export default BlackWrapper;
