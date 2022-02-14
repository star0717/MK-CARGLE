import React from "react";
import { NextPage } from "next";
import {
  RsWrapper,
  SmallButton,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";

const ReleaseComplete: NextPage<any> = (props) => {
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
      <RsWrapper>
        출고 완료
        <SmallButton
          type="button"
          kindOf={`default`}
          onClick={() => {
            alert("어림도 없지 아암");
          }}
        >
          수정
        </SmallButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ReleaseComplete;
