import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React, { useState } from "react";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import {
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import { BsSearch } from "react-icons/bs";

const AdminManPartsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [partClass, setPartClass] = useState<any>();
  const [allPart, setAllPart] = useState<any>();
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

  return (
    <BodyWrapper ref={ref}>
      <WholeWrapper>
        <RsWrapper></RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
