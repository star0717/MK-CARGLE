import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";

const BusinessHours: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
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
    <WholeWrapper notAnimate>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>예약설정</CommonTitle>
          <CommonSubTitle>
            얘약과 관련된 업체정보를 설정할 수 있어요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`} ju={`flex-start`}>
          <Wrapper
            color={`#c4c4c4`}
            padding={`10px`}
            width={`120px`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET}`);
            }}
          >
            <Text>기본정보</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            borderBottom={`2px solid #314fa5`}
          >
            <Text>영업시간</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET}?step=S`);
            }}
          >
            <Text color={`#c4c4c4`}>정비정보</Text>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};
export default BusinessHours;
