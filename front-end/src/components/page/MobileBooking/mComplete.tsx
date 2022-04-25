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
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";

const MobileComplete: NextPage<any> = (props) => {
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
        <Wrapper height={`90%`} al={`center`}>
          <Wrapper margin={`0px 0px 20px 0px`}>
            <Image
              src="/images/mainLogo.png"
              alt="Cargle Logo"
              width={120}
              height={36}
              priority
            />
          </Wrapper>
          <CommonSmallTitle margin={`20px 0px 10px 0px`} textAlign={`center`}>
            접수완료
          </CommonSmallTitle>
          <Text
            color={theme.basicTheme_C}
            fontSize={`48px`}
            margin={`30px 0px`}
          >
            <BsCheckCircleFill />
          </Text>
          <Text color={theme.basicTheme_C}>
            고객님의 요청사항을 확인하고 있습니다.
            <br />
            잠시만 기다려주세요.
          </Text>
          <Wrapper padding={`20px 0px 0px`}>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                router.push(MobileRoute.m_car_select);
              }}
              width={`100%`}
              height={`50px`}
            >
              확인
            </CommonButton>
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

export default MobileComplete;
