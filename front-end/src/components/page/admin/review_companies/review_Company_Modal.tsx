import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useResizeDetector } from "react-resize-detector";
import {
  CloseButton,
  RsWrapper,
  SmallButton,
  Text,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import Modal from "react-modal";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const AdminReviewCompaniesModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  console.log("props=>", props);

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
        <WholeWrapper ref={ref}>
          <RsWrapper>
            <Wrapper>
              <Text>승인처리</Text>
            </Wrapper>
            <Wrapper>
              <Wrapper dr={`row`}>
                <Text>승인여부</Text>
                <SmallButton
                type="button"
                kindOf={`default`}
                margin={`0px 0px 0px 20px`}
                onClick={() => {}}
              >
                승인
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  onClick={() => {}}
                >
                  반려
                </SmallButton>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Text width={`130px`}>반려사유</Text>
                <TextInput2 placeholder="반려 사유를 입력하세요." type="text" />
              </Wrapper>
              <Wrapper dr={`row`}>
                <Text width={`130px`}>E-Mail</Text>
                <TextInput2 value={props.data.user.email} type="text" readOnly />
                </Wrapper>
              <Wrapper dr={`row`}>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  onClick={() => {}}
                >
                  저장
                </SmallButton>
                <SmallButton
                  type="button"
                  kindOf={`default`}
                  margin={`0px 0px 0px 20px`}
                  onClick={() => {props.setModalOpen(false)}}
                >
                취소
                </SmallButton>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </WholeWrapper>
  );
};

export default AdminReviewCompaniesModal;
