import React, { useState } from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  TextArea,
  TextInput2,
  WholeWrapper,
  Wrapper,
  Text,
} from "src/components/styles/CommonComponents";
import { useDispatch } from "react-redux";
import { Agency } from "src/models/agency.entity";

const AddBusinessModal: NextPage<any> = () => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [addAgency, setAddAgency] = useState<Partial<Agency>>({
    name: "",
    manager: "",
    phoneNum: "",
    hpNum: "",
    address1: "",
    address2: "",
    memo: "",
  });
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddAgency({ ...addAgency, [e.target.name]: [e.target.value] });
  };
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
            <TextInput2 width={`400px`} type="text" name="name" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>담당자명</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" name="manager" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>사업자등록번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" name="" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>전화번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" name="phoneNum" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>휴대전화번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" name="hpNum" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>팩스번호</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" name="" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>이메일</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2 width={`400px`} type="text" name="" />
          </Wrapper>
        </Wrapper>

        <Wrapper al={`flex-start`} margin={`0px 0px 10px`} width={`400px`}>
          <Text>주소</Text>
          <Wrapper width={`400px`} ju={`flex-start`}>
            <TextInput2
              width={`400px`}
              margin={`0px 0px 10px 0px`}
              type="text"
              name="address1"
            />

            <TextInput2 width={`400px`} type="text" name="address2" />
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
              name="memo"
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
