import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { _pPartsSetProps } from "src/configure/_pProps.entity";

const CustomerPage: NextPage<_pPartsSetProps> = (props) => {
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
      <Wrapper padding={`10px 0px 0px`}>
        <CommonSmallTitle margin={`0px 0px 30px 0px`}>
          국토부 전송 여부 확인
        </CommonSmallTitle>
      </Wrapper>
      <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
        <CommonButton
          type="button"
          kindOf={`white`}
          width={`300px`}
          height={`50px`}
          onClick={() => {
            props.setModalOpen(false);
          }}
        >
          취소
        </CommonButton>
        <CommonButton
          type="button"
          width={`300px`}
          height={`50px`}
          onClick={() => {
            props.setModalOption("payment");
          }}
        >
          다음
        </CommonButton>
      </CommonButtonWrapper>
    </WholeWrapper>
  );
};

export default CustomerPage;
