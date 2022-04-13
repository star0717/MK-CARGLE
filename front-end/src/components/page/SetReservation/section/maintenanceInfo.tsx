import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CloseButton,
  Combo,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  SmallButton,
  Text,
  TextArea,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import theme from "styles/theme";
import { IoIosCloseCircle } from "react-icons/io";

const MaintenanceInfo: NextPage<_pSetBookingDataProps> = (props) => {
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
            padding={`10px`}
            width={`120px`}
            color={`#c4c4c4`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET_BOOKING}`);
            }}
            cursor={`pointer`}
          >
            <Text>기본정보</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET_BOOKING}?step=F`);
            }}
            cursor={`pointer`}
          >
            <Text color={`#c4c4c4`}>영업시간</Text>
          </Wrapper>
          <Wrapper
            padding={`10px`}
            width={`120px`}
            borderBottom={`2px solid #314fa5`}
            cursor={`pointer`}
          >
            <Text>정비정보</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper
          al={`flex-start`}
          padding={`20px 0px 10px`}
          color={theme.basicTheme_C}
          fontWeight={`800`}
        >
          <Text>정비 가능 리프트 수량을 알려주세요.</Text>
          <Wrapper
            borderBottom={`1px solid #ccc`}
            padding={`20px 0px`}
            al={`flex-start`}
          >
            <Combo width={`191px`}>
              <option>해당없음</option>
            </Combo>
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} padding={`20px 0px 10px`} fontWeight={`800`}>
          <Text color={theme.basicTheme_C}>주요 정비 가격을 알려주세요.</Text>
          <Wrapper
            borderBottom={`1px solid #ccc`}
            padding={`20px 0px`}
            al={`flex-start`}
          >
            <Wrapper width={`auto`} margin={`0px 10px`} dr={`row`}>
              <Wrapper al={`flex-start`} margin={`0px 10px 0px 0px`}>
                <Text>정비항목</Text>
                <TextInput2 />
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Text>가격</Text>
                <TextInput2 />
              </Wrapper>
              <Wrapper margin={`26px 0px 0px`}>
                <CloseButton>
                  <IoIosCloseCircle />
                </CloseButton>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`10px`}>
              <SmallButton width={`392px`} kindOf={`default`}>
                정비항목 추가하기
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};
export default MaintenanceInfo;
