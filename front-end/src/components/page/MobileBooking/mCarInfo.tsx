import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  RsWrapper,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import router from "next/router";
import { MobileRoute } from "src/configure/router.entity";

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
      <RsWrapper>
        차량정보입력
        <CommonButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            router.push(MobileRoute.m_car_select);
          }}
        >
          이전
        </CommonButton>
        <CommonButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            router.push(MobileRoute.m_booking);
          }}
        >
          다음
        </CommonButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MobileCarInfo;
