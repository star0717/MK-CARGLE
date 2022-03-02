import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  Text,
  TextArea,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { _pPartsSetProps } from "src/configure/_pProps.entity";

const EditMolitModal: NextPage<_pPartsSetProps> = (props) => {
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
      <Wrapper>
        <Wrapper margin={`50px 0px 0px`}>
          {props.modalOption.indexOf("delete") !== -1 && (
            <Text fontSize={`20px`}>"국토부 삭제 사유를 입력하세요"</Text>
          )}
          {props.modalOption.indexOf("edit") !== -1 && (
            <Text fontSize={`20px`}>"국토부 수정 사유를 입력하세요"</Text>
          )}
          <TextArea
            fontSize={`24px`}
            width={`600px`}
            height={`250px`}
            margin={`30px 0px 0px`}
            border={`5px solid #314FA5`}
          />
        </Wrapper>
      </Wrapper>
      <CommonButtonWrapper
        ju={`center`}
        margin={`50px 0px 0px`}
        padding={`30px 30px`}
      >
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
        {props.modalOption.indexOf("delete") !== -1 && (
          <CommonButton
            type="button"
            width={`300px`}
            height={`50px`}
            onClick={() => {
              if (window.confirm("삭제하시겠습니까?")) {
                props.setModalOpen(false);
              } else {
                return false;
              }
            }}
          >
            확인
          </CommonButton>
        )}
        {props.modalOption.indexOf("edit") !== -1 && (
          <CommonButton
            type="button"
            width={`300px`}
            height={`50px`}
            onClick={() => {
              props.setModalOption("molit");
            }}
          >
            다음
          </CommonButton>
        )}
      </CommonButtonWrapper>
    </WholeWrapper>
  );
};

export default EditMolitModal;
