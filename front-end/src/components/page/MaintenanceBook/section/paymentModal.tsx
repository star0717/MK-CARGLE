import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonSubTitle,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
const PaymentModal: NextPage<any> = (props) => {
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
    <BodyWrapper>
      <WholeWrapper>
        <Wrapper>
          <Wrapper dr={`row`}>
            <Wrapper width={`100px`} ju={`space-between`}>
              <Text>1</Text>
              <GoPrimitiveDot />
            </Wrapper>
            <Wrapper width={`100px`} ju={`space-between`}>
              <Text>2</Text>
              <GoPrimitiveDot />
            </Wrapper>
            <Wrapper width={`100px`} ju={`space-between`}>
              <Text>3</Text>
              <GoPrimitiveDot />
            </Wrapper>
          </Wrapper>
          <Wrapper width={`300px`}>
            <CommonSubTitle>서류발급</CommonSubTitle>
          </Wrapper>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default PaymentModal;
