import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  RsWrapper,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import router from "next/router";
import { MobileRoute } from "src/configure/router.entity";

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
      <RsWrapper>
        접수 완료
        <CommonButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            router.push(MobileRoute.m_booking);
          }}
        >
          이전
        </CommonButton>
        <CommonButton
          onClick={() =>
            alert(
              "접수되어야 하는데 안될거에요. 제가 할 수 있는 능력은 여기까지인걸요"
            )
          }
        >
          확인
        </CommonButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MobileComplete;
