import { NextPage } from "next";
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
import React, { useState } from "react";
import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import ManComApprovalModal from "./approvalModal";
import { _pAdminManCompanies } from "../../../../configure/_pProps.entity";
import {
  makeFullAddress,
  mbTypeToString,
} from "../../../../modules/commonModule";
import { Company } from "../../../../models/company.entity";
import { RootStateInterface } from "../../../../../store/interfaces/RootState";
import { UserState } from "../../../../../store/interfaces";
import { useSelector } from "react-redux";

const ManCompanyInfo: NextPage<_pAdminManCompanies> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  // redux store에서 user, company 정보 가져옴
  const { company } = useSelector(
    (state: RootStateInterface): UserState => state.userAll
  );

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [comData, setComData] = useState<Company>(company); // 클릭한 업체 정보
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 모달 창 여부
  // const [busType, setBusType] = useState<string>(props.clickDoc.busType); // 업태
  // const [busItem, setBusItem] = useState<string>(props.clickDoc.busItem); // 업종

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  // 모달 창 닫기
  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper>
          <SmallButton
            type="button"
            kindOf={`default`}
            margin={`0px 0px 0px 20px`}
            onClick={() => {
              console.log("ㅎㅎ");
            }}
          >
            승인처리
          </SmallButton>
        </Wrapper>
        <Wrapper>이미지</Wrapper>
        <Wrapper>
          <Text>계정정보</Text>
        </Wrapper>
        <Wrapper>
          <Text>사업자정보</Text>
          <Wrapper dr={`row`}>
            <Text>상호명</Text>
            <TextInput2 value={comData.name} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text width={`130px`}>사업자등록번호</Text>
            <TextInput2 value={comData.comRegNum} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text width={`130px`}>정비업등록번호</Text>
            <TextInput2 value={comData.mbRegNum} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>대표자명</Text>
            <TextInput2 value={comData.ownerName} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>정비업종</Text>
            <TextInput2 value={mbTypeToString(comData)} type="text" readOnly />
          </Wrapper>
          {/* <Wrapper dr={`row`}>
            <Text>업태</Text>
            <TextInput2 value={busType} type="text" />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>업종</Text>
            <TextInput2 value={busItem} type="text" />
          </Wrapper> */}
          <Wrapper dr={`row`}>
            <Text>업체 전화번호</Text>
            <TextInput2 value={comData.phoneNum} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>업체 팩스번호</Text>
            <TextInput2 value={comData.faxNum} type="text" readOnly />
          </Wrapper>
          <Wrapper dr={`row`}>
            <Text>사업자 주소</Text>
            <TextInput2
              value={makeFullAddress(
                comData.address1,
                comData.address2,
                comData.postcode
              )}
              type="text"
              readOnly
            />
          </Wrapper>
        </Wrapper>
      </RsWrapper>
      <Wrapper>
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: "fixed",
              zIndex: 1020,
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(255, 255, 255, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              background: "white",
              width: "45rem",
              height: "575px",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "0.3rem",
              boxShadow: "0px 10px 15px rgba(220,220,220,1)",
              inset: 0,
            },
          }}
        >
          <Wrapper fontSize={`28px`} al={`flex-end`}>
            <CloseButton onClick={closeModal}>
              <IoIosCloseCircle />
            </CloseButton>
            <ManComApprovalModal />
          </Wrapper>
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ManCompanyInfo;
