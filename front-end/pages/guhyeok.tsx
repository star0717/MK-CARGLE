import React, { useState } from "react";
import { NextPage } from "next";
import {
  Wrapper,
  WholeWrapper,
  Text,
} from "src/components/styles/CommonComponents";
import { useResizeDetector } from "react-resize-detector";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsDownload, BsUpload } from "react-icons/bs";

const TestPage: NextPage<any> = () => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [time, setTime] = useState({
    MON: {
      openingHours: "hi",
      closingHours: "hi",
      breakTime: "hi",
      breakEndTime: "hi",
    },
    TUE: {
      openingHours: "hi",
      closingHours: "hi",
      breakTime: "hi",
      breakEndTime: "hi",
    },
    WED: {
      openingHours: "hi",
      closingHours: "hi",
      breakTime: "hi",
      breakEndTime: "hi",
    },
    THU: {
      openingHours: "hi",
      closingHours: "hi",
      breakTime: "hi",
      breakEndTime: "hi",
    },
    FRI: {
      openingHours: "hi",
      closingHours: "hi",
      breakTime: "hi",
      breakEndTime: "hi",
    },
    SAT: {
      openingHours: "hi",
      closingHours: "hi",
      breakTime: "hi",
      breakEndTime: "hi",
    },
    SUN: {
      openingHours: "hi",
      closingHours: "hi",
      breakTime: "hi",
      breakEndTime: "hi",
    },
  });
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  const { width, height, ref } = useResizeDetector();
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return <WholeWrapper></WholeWrapper>;
};

export default TestPage;
