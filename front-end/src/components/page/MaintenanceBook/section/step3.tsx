import React from "react";
import { NextPage } from "next";
import {
  RsWrapper,
  SmallButton,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { StepQuery, UseLink } from "src/configure/router.entity";

const MaintenanceComplete: NextPage<any> = (props) => {
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
        정비 완료
        <SmallButton
          type="button"
          kindOf={`default`}
          onClick={() => {
            router.push(`${UseLink.MAINTENANCE_BOOK}/${StepQuery.FOURTH}`);
          }}
        >
          출고완료
        </SmallButton>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default MaintenanceComplete;
