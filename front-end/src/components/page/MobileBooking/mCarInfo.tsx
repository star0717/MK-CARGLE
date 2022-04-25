import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  RsWrapper,
  WholeWrapper,
  MoWrapper,
  Wrapper,
  Text,
  CommonSmallTitle,
  Hr,
  MoTextInput,
  TextInput2,
  CommonButtonWrapper,
} from "src/components/styles/CommonComponents";
import router from "next/router";
import Image from "next/image";
import { MobileRoute } from "src/configure/router.entity";
import theme from "styles/theme";
import { GoPrimitiveDot } from "react-icons/go";
import { RiArrowRightSLine } from "react-icons/ri";

const MobileCarInfo: NextPage<any> = (props) => {
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
              <Text fontSize={`20px`} color={`#314FA5`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
            <Wrapper width={`auto`} padding={`0px 20px`} ju={`space-between`}>
              <Text>2</Text>
              <Text fontSize={`20px`} color={`#ccc`}>
                <GoPrimitiveDot />
              </Text>
            </Wrapper>
          </Wrapper>
          <CommonSmallTitle margin={`20px 0px 10px 0px`}>
            차량정보확인
          </CommonSmallTitle>
          <Text color={theme.basicTheme_C}>
            고객님의 차량 정보를 확인하세요.
            <br />
            차량 관리를 위해 정확한 정보가 필요합니다.
          </Text>
          <Hr />
          <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`60px`}>
              차량번호
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`60px`}>
              차량명
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`60px`}>
              모델명
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`60px`}>
              연식
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Wrapper al={`flex-start`} margin={`0px 0px 10px 0px`}>
            <Text textAlign={`left`} width={`60px`}>
              등록일자
            </Text>
            <TextInput2 width={`100%`} />
          </Wrapper>
          <Hr />
          <Wrapper padding={`20px 0px 0px`}>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                router.push(MobileRoute.m_car_select);
              }}
              width={`100%`}
              height={`50px`}
              kindOf={`white`}
            >
              이전
            </CommonButton>
            <CommonButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                router.push(MobileRoute.m_booking);
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

export default MobileCarInfo;
