import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { Wrapper } from "src/components/styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";
import { useRouter } from "next/router";

const EditMaintenance: NextPage<_MainProps> = (props) => {
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
    <Wrapper
      onClick={() => {
        router.back();
      }}
    >
      수정수정
    </Wrapper>
  );
};

export default EditMaintenance;
