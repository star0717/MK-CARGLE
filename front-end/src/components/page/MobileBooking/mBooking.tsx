import React from "react";
import { NextPage } from "next";
import {
  ColorSpan,
  CommonButton,
  CommonSmallTitle,
  Hr,
  MoWrapper,
  RsWrapper,
  Text,
  TextArea,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import router from "next/router";
import { MobileRoute } from "src/configure/router.entity";
import { GoPrimitiveDot } from "react-icons/go";
import { RiArrowRightSLine } from "react-icons/ri";
import theme from "styles/theme";
import Image from "next/image";

const MobileBooking: NextPage<any> = (props) => {
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
      <MoWrapper bgColor={theme.subWhite_C} ju={`space-between`}>
        <Wrapper>
          <Wrapper margin={`0px 0px 20px 0px`}>
            <Image
              src="/images/mainLogo.png"
              alt="Cargle Logo"
              width={120}
              height={36}
              priority
            />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Wrapper width={`auto`} padding={`0px 10px`} ju={`space-between`}>
              <Text>1</Text>
              <Text fontSize={`20px`} color={`#ccc`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
            <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
              <Text>2</Text>
              <Text fontSize={`20px`} color={`#314FA5`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
          </Wrapper>
          <CommonSmallTitle margin={`20px 0px 10px 0px`}>
            요청정보입력
          </CommonSmallTitle>
          <Text color={theme.basicTheme_C}>
            고객님의 정비요청정보를 입력해주세요.
            <br />
            작성된 내용을 통해 정확한 정비를 진행합니다.
          </Text>
          <Hr />
          <Wrapper margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`100%`}>
              <ColorSpan color={theme.red_C}>*</ColorSpan>
              전회번호
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Wrapper margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`100%`}>
              <ColorSpan color={theme.red_C}>*</ColorSpan>
              예약일자
            </Text>
            <TextInput2 type="date" width={`100%`} />
          </Wrapper>
          <Wrapper margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`100%`}>
              주행거리
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Wrapper margin={`0px 0px 10px 0px`} al={`flex-start`}>
            <Text textAlign={`left`} width={`100%`}>
              요청사항
            </Text>
            <TextArea height={`100px`} width={`100%`} />
          </Wrapper>
          <Wrapper margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`100%`}>
              고객명
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Hr />
          <Wrapper padding={`20px 0px 0px`}>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                router.push(MobileRoute.m_car_info);
              }}
              width={`100%`}
              height={`50px`}
              kindOf={`white`}
            >
              이전
            </CommonButton>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                router.push(MobileRoute.m_complete);
              }}
              width={`100%`}
              height={`50px`}
            >
              다음
            </CommonButton>
          </Wrapper>
          <Wrapper
            dr={`row`}
            color={theme.darkGrey_C}
            cursor={`pointer`}
            margin={`10px 0px 0px`}
          >
            <Text margin={`5px 0px 0px`}>
              <RiArrowRightSLine />
            </Text>
            <Text>다음에 이용할게요.</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <Text color={theme.darkGrey_C}>
            Copyright Date Name. All rights reserved
          </Text>
        </Wrapper>
      </MoWrapper>
    </WholeWrapper>
  );
};

export default MobileBooking;
