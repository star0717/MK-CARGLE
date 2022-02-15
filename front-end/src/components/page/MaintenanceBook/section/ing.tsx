import React from "react";
import { NextPage } from "next";
import {
  RsWrapper,
  SmallButton,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { MainStatus } from "src/constants/maintenance.const";

const MaintenanceIng: NextPage<any> = (props) => {
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
        결제완료
        <SmallButton
          type="button"
          kindOf={`default`}
          onClick={() => {
            router.push(`${UseLink.MAINTENANCE_BOOK}?step=${MainStatus.DONE}`);
          }}
        >
          정비 진행
        </SmallButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MaintenanceIng;