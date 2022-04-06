import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  Text,
  TextArea,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";

const MaintenanceInfo: NextPage<any> = (props) => {
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
    <WholeWrapper>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>예약설정</CommonTitle>
          <CommonSubTitle>
            얘약과 관련된 업체정보를 설정할 수 있어요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`} ju={`flex-start`}>
          <Wrapper borderBottom={`1px solid #343a40`} padding={`20px`}>
            <Text>기본정보</Text>
          </Wrapper>
          <Wrapper padding={`20px`}>
            <Text color={`#c4c4c4`}>영업시간</Text>
          </Wrapper>
          <Wrapper padding={`20px`}>
            <Text color={`#c4c4c4`}>정비정보</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <TextArea></TextArea>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};
export default MaintenanceInfo;
