import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  RsWrapper,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import router from "next/router";
import { MobileRoute } from "src/configure/router.entity";

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
      <RsWrapper>
        요청정보입력
        <CommonButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            router.push(MobileRoute.m_car_info);
          }}
        >
          이전
        </CommonButton>
        <CommonButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            router.push(MobileRoute.m_complete);
          }}
        >
          다음
        </CommonButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MobileBooking;
