import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { useRouter } from "next/router";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  FocusButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import React, { useState } from "react";
import {
  approveCompany,
  rejectCompany,
} from "../../../../../store/action/user.action";
import { OptionalInfo } from "../../../../models/base.entity";
import { UseLink } from "../../../../configure/router.entity";

const PartsModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

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
  return <WholeWrapper>나는야 모달모달!</WholeWrapper>;
};

export default PartsModal;
