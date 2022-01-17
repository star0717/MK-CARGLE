import { NextPage } from "next";
import { useDispatch } from "react-redux";
import {
  CommonButton,
  CommonButtonWrapper,
  Text,
  Combo,
  TextInput2,
  WholeWrapper,
  Wrapper,
  CommonSmallTitle,
} from "../../../styles/CommonComponents";
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

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
      <CommonSmallTitle>부품등록</CommonSmallTitle>
      <Wrapper dr={`row`} ju={`space-between`}>
        <Wrapper width={`100px`} al={`flex-end`}>
          <Text>분류</Text>
        </Wrapper>
        <Combo width={`600px`}>
          <option>{"분류명입니다(1)"}</option>
          <option>{"분류명입니다(2)"}</option>
          <option>{"분류명입니다(3)"}</option>
        </Combo>
      </Wrapper>
      <Wrapper dr={`row`} ju={`space-between`}>
        <Wrapper width={`100px`} al={`flex-end`}>
          <Text>부품명</Text>
        </Wrapper>
        <TextInput2 placeholder="부품명입니다~" width={`600px`}></TextInput2>
      </Wrapper>
      <Wrapper dr={`row`} ju={`space-between`}>
        <Wrapper width={`100px`} al={`flex-end`}>
          <Text>부품코드</Text>
        </Wrapper>
        <TextInput2 placeholder="부품코드" width={`600px`}></TextInput2>
      </Wrapper>
      <Wrapper dr={`row`} ju={`space-between`}>
        <Wrapper width={`100px`} al={`flex-end`}>
          <Text>국토부</Text>
        </Wrapper>
        <Wrapper dr={`row`}>
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
      </Wrapper>
      <Wrapper dr={`row`} ju={`space-between`}>
        <Wrapper width={`100px`} al={`flex-end`}>
          <Text>동의어 설정</Text>
        </Wrapper>
        <TextInput2 placeholder="동의어입니다 4" width={`600px`}></TextInput2>
      </Wrapper>
      <Wrapper
        width={`600px`}
        ju={`flex-start`}
        bgColor={`#fff`}
        overflow={`auto`}
        radius={`5px 5px 0px 0px`}
        border={`1px solid #c4c4c4`}
      >
        <Wrapper
          bgColor={`#343a40`}
          color={`#fff`}
          height={`30px`}
          radius={`5px 5px 0px 0px`}
        >
          <Text>부품분류</Text>
        </Wrapper>

        {/* default */}
        <Wrapper
          padding={`10px`}
          height={`150px`}
          overflow={`auto`}
          ju={`flex-start`}
        >
          <Wrapper
            height={`30px`}
            bgColor={`#fff`}
            border={`1px solid #c4c4c4`}
            dr={`row`}
            radius={`5px`}
            padding={`0px 20px`}
            margin={`0px 0px 5px`}
          >
            <Wrapper text-align={`left`}>
              <Text>동의어 입니다. (01)</Text>
            </Wrapper>
            <Wrapper width={`22px`} fontSize={`22px`}>
              <IoIosCloseCircle />
            </Wrapper>
          </Wrapper>

          {/* focus */}
          <Wrapper
            height={`30px`}
            bgColor={`#eee`}
            border={`1px solid #c4c4c4`}
            dr={`row`}
            radius={`5px`}
            padding={`0px 20px`}
            margin={`0px 0px 5px`}
          >
            <Wrapper>
              <Text>동의어 입니다. (02)</Text>
            </Wrapper>
            <Wrapper width={`22px`} fontSize={`22px`}>
              <IoIosCloseCircle />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      {/* <Wrapper
        width={`600px`}
        height={`200px`}
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
      </Wrapper> */}
      <CommonButtonWrapper
        ju={`space-around
      `}
      >
        <CommonButton kindOf={`circleWhite`}>닫 기</CommonButton>
        <CommonButton kindOf={`circleTheme`}>저 장</CommonButton>
      </CommonButtonWrapper>
    </WholeWrapper>
  );
};

export default PartsModal;
