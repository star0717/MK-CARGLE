import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  TextArea,
  WholeWrapper,
  Wrapper,
  Text,
  CommonSmallTitle,
  CommonButtonWrapper,
  CommonButton,
} from "src/components/styles/CommonComponents";
import theme from "styles/theme";
import { BsDownload } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";

const BasicInfo: NextPage<_pSetBookingDataProps> = (props) => {
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
            borderBottom={`2px solid #314fa5`}
            padding={`10px`}
            width={`120px`}
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
            onClick={() => {
              router.push(`${UseLink.MYPAGE_SET_BOOKING}?step=S`);
            }}
            cursor={`pointer`}
          >
            <Text color={`#c4c4c4`}>정비정보</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper
          al={`flex-start`}
          padding={`20px 0px 10px`}
          color={theme.basicTheme_C}
          fontWeight={`800`}
        >
          <Text>소개글을 작성해주세요</Text>
        </Wrapper>
        <Wrapper borderBottom={`1px solid #ccc`} padding={`0px 0px 40px`}>
          <TextArea
            padding={`10px`}
            height={`140px`}
            placeholder="고객님께 노출되는 소개글입니다."
            width={`1200px`}
            value={props.booking.intro}
            // onChange={() => {}}
            shadow={theme.boxShadow}
          ></TextArea>
        </Wrapper>
        <Wrapper al={`flex-start`} padding={`20px 0px 10px`} fontWeight={`800`}>
          <Text color={theme.basicTheme_C}>사진을 올려주세요</Text>
          <Text>
            업로드할 파일을 드래그하거나 클릭하여 선택하세요. (jpg, jpeg, png
            확장자의 파일만 업로드 가능합니다.)
          </Text>
          <Wrapper dr={`row`} ju={`space-between`} padding={`10px 0px 20px`}>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진1
              </Text>
            </Wrapper>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진2
              </Text>
            </Wrapper>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진3
              </Text>
            </Wrapper>
            <Wrapper
              width={`285px`}
              height={`214px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <BsDownload />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                사진4
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper borderBottom={`1px solid #ccc`} padding={`0px 0px 40px`}>
            <Wrapper
              height={`900px`}
              padding={`10px`}
              border={`1px solid #c4c4c4`}
              radius={`5px`}
              bgColor={`#f5f5f5`}
            >
              <Text fontSize={`40px`} color={`#ccc`}>
                <AiFillPicture />
              </Text>
              <Text fontSize={`24px`} fontWeight={`700`}>
                대표사진
              </Text>
            </Wrapper>
          </Wrapper>
          <CommonButtonWrapper ju={`space-around`}>
            <CommonButton kindOf={`white`}>취소</CommonButton>
            <CommonButton>저장</CommonButton>
          </CommonButtonWrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};
export default BasicInfo;
