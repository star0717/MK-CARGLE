import React from "react";
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

const DropZone: any = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <>
          <Text fontSize={`40px`} color={`#ccc`}>
            <BsDownload />
          </Text>
          <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
            업로드할 파일을 드래그하거나 클릭하여 선택하세요.
          </Text>
        </>
      ) : (
        <>
          <Text fontSize={`40px`} color={`#ccc`}>
            <BsUpload />
          </Text>
          <Text fontSize={`28`} fontWeight={`600`} color={`#ccc`}>
            업로드할 파일을 드래그하거나 클릭하여 선택하세요.
          </Text>
        </>
      )}
    </Wrapper>
  );
};

const TestPage: NextPage<any> = () => {
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

  const { width, height, ref } = useResizeDetector();
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <Wrapper
        width={`700px`}
        height={`150px`}
        border={`1px solid #ccc`}
        radius={`5px`}
        padding={`10px 0px`}
      >
        <DropZone />
      </Wrapper>
    </WholeWrapper>
  );
};

export default TestPage;
