import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  Switch,
  SwitchInput,
  SwitchSlider,
  TextArea,
  TextInput2,
  WholeWrapper,
  Wrapper,
  Text,
} from "src/components/styles/CommonComponents";
import router from "next/router";
import { UseLink } from "src/configure/router.entity";
import { approveCompany, rejectCompany } from "store/action/user.action copy";
import approval from "../SignUp/section/approval";

const AddBusinessModal: NextPage<any> = () => {
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
      <CommonSmallTitle>거래처추가</CommonSmallTitle>
      <Wrapper>
        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>*상호명</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>담당자명</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>사업자등록번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>전화번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>휴대전화번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>팩스번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>이메일</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>주소</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2
              width={`400px`}
              margin={`0px 0px 10px 0px`}
              type="text"
            />

            <TextInput2 width={`400px`} type="text" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>메모</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextArea
              padding={`10px`}
              width={`400px`}
              height={`150px`}
              placeholder="메모를 입력하세요."
              al={`flex-start`}
              type="text"
            />
          </Wrapper>
        </Wrapper>
        <CommonButtonWrapper kindOf={`column`}>
          <CommonButton kindOf={`circleWhite`} type="button">
            취소
          </CommonButton>
          <CommonButton kindOf={`circleTheme`} type="button">
            저장
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default AddBusinessModal;
