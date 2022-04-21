import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  MoTextInput,
  MoWrapper,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { MobileRoute } from "src/configure/router.entity";
import { useRouter } from "next/router";
import theme from "styles/theme";
import Image from "next/image";

const MobileCarSelect: NextPage<any> = (props) => {
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
    <WholeWrapper>
      <MoWrapper bgColor={theme.subWhite_C} ju={`flex-start`}>
        <Wrapper al={`flex-start`} margin={`80px 0px 20px 0px`}>
          <Image
            src="/images/mainLogo.png"
            alt="Cargle Logo"
            width={120}
            height={36}
            priority
          />
          <Text
            textAlign={`left`}
            fontSize={`24px`}
            color={theme.black_C}
            margin={`20px 0px 0px`}
          >
            안녕하세요
            <br />
            000카센터입니다.
            <br />
            차량번호를 입력해주세요.
          </Text>
        </Wrapper>
        <MoTextInput
          bgColor={theme.subWhite_C}
          margin={`30px 0px 20px 0px`}
          placeholder="123가1234"
          fontSize={`20px`}
        ></MoTextInput>
        <CommonButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            router.push(MobileRoute.m_car_info);
          }}
          width={`100%`}
        >
          확인
        </CommonButton>
      </MoWrapper>
    </WholeWrapper>
  );
};

export default MobileCarSelect;
