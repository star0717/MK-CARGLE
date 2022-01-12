import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import { useRouter } from "next/router";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  FocusButton,
  Text,
  Combo,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import React, { useState } from "react";
import {
  approveCompany,
  rejectCompany,
} from "../../../../../store/action/user.action";
import { OptionalInfo } from "../../../../models/base.entity";
import { UseLink } from "../../../../configure/router.entity";

const PartsModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

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
      <Wrapper>
        <Text>부품등록</Text>
      </Wrapper>
      <Wrapper dr={`row`}>
        <Text>분류</Text>
        <Combo width={`600px`}>
          <option>{"분류명입니다(1)"}</option>
          <option>{"분류명입니다(2)"}</option>
          <option>{"분류명입니다(3)"}</option>
        </Combo>
      </Wrapper>
      <Wrapper dr={`row`}>
        <Text>부품명</Text>
        <TextInput2 placeholder="부품명입니다~" width={`600px`}></TextInput2>
      </Wrapper>
      <Wrapper dr={`row`}>
        <Text>부품코드</Text>
        <TextInput2 placeholder="부품코드" width={`600px`}></TextInput2>
      </Wrapper>
      <Wrapper dr={`row`}>
        <Text>국토부</Text>
        <Combo width={`250px`}>
          <option>{"국토부입니다(1)"}</option>
          <option>{"국토부입니다(2)"}</option>
          <option>{"국토부입니다(3)"}</option>
        </Combo>
        <Combo width={`350px`}>
          <option>{"국토부 정비명 입니다(1)"}</option>
          <option>{"국토부 정비명 입니다(2)"}</option>
          <option>{"국토부 정비명 입니다(3)"}</option>
        </Combo>
      </Wrapper>
      <Wrapper dr={`row`}>
        <Text>동의어 설정</Text>
        <TextInput2 placeholder="동의어입니다 4" width={`600px`}></TextInput2>
      </Wrapper>
      <Wrapper
        width={`600px`}
        height={`250px`}
        border={`1px solid #c4c4c4`}
        radius={`5px 5px 0px 0px`}
        ju={`top`}
      >
        <Wrapper bgColor={`#eee`}>
          <Text>등록된 단어</Text>
        </Wrapper>
        <Wrapper padding={`10px`} overflow={`auto`}>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
          <Wrapper border={`1px solid #c4c4c4`} margin="5px 0px 0px">
            <Text>우와와오우와우와우와우와우와우와우왕</Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <CommonButtonWrapper
        dr={`row`}
        ju={`space-around
      `}
      >
        <CommonButton width={`200px`}>닫 기</CommonButton>
        <CommonButton width={`200px`}>저 장</CommonButton>
      </CommonButtonWrapper>
    </WholeWrapper>
  );
};

export default PartsModal;
