import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonSubTitle,
  TextInput2,
  Checkbox,
  CheckInput,
  CheckMark,
  CommonButton,
} from "src/components/styles/CommonComponents";
import { GoPrimitiveDot } from "react-icons/go";
const DocumentsModal: NextPage<any> = (props) => {
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
            <CommonSubTitle>결제 정보 입력</CommonSubTitle>
          </Wrapper>

          <Wrapper dr={`row`} ju={`space-between`}>
            <Wrapper width={`45%`}>
              <Text>정비 금액</Text>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text>부품계</Text>
                <Text>120,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text>기술료계</Text>
                <Text>70,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text>할인</Text>
                <Wrapper dr={`row`}>
                  <TextInput2 placeholder={"금액을 입력하세요."}></TextInput2>
                  <Text>원</Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text>합계</Text>
                <Text>190,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text>부가세</Text>
                <Text>19,000원</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text>총계</Text>
                <Text>209,000원</Text>
              </Wrapper>
            </Wrapper>

            <Wrapper width={`45%`}>
              <Text>결제 금액</Text>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput type="checkbox" />
                  <CheckMark></CheckMark>
                </Checkbox>
                <Text>현금</Text>
                <Wrapper dr={`row`}>
                  <TextInput2 placeholder={"금액을 입력하세요."} />
                  <Text>원</Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput type="checkbox" />
                  <CheckMark></CheckMark>
                </Checkbox>
                <Text>카드</Text>
                <Wrapper dr={`row`}>
                  <TextInput2 placeholder={"금액을 입력하세요."} />
                  <Text>원</Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput type="checkbox" />
                  <CheckMark></CheckMark>
                </Checkbox>
                <Text>보험</Text>
                <Wrapper dr={`row`}>
                  <TextInput2 placeholder={"금액을 입력하세요."} />
                  <Text>원</Text>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <Text>잔액(외상)</Text>
                <Text>9,000원</Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`}>
            <CommonButton>취 소</CommonButton>
            <CommonButton>이전으로</CommonButton>
            <CommonButton>다 음</CommonButton>
          </Wrapper>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default DocumentsModal;
