import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import {
  CloseButton,
  RsWrapper,
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
import { mbTypeToString } from "../../../../modules/commonModule";

const ManCompanyInfo: NextPage<_pAdminManCompanies> = (props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <Wrapper>이미지</Wrapper>
        <Wrapper>
          <Text>계정정보</Text>
        </Wrapper>
        <Wrapper>
          <Text>사업자정보</Text>
          <Wrapper dr={`row`} margin={`0px 0px 10px`}>
            <Text
              width={`130px`}
              textAlign={`end`}
              padding={`0px 10px 0px 0px`}
            >
              상호명
            </Text>
            <TextInput2
              value={props.clickDoc.name}
              type="text"
              readOnly
              width={`800px`}
            />
          </Wrapper>
          <Wrapper dr={`row`} margin={`0px 0px 10px`}>
            <Text
              width={`130px`}
              textAlign={`end`}
              padding={`0px 10px 0px 0px`}
            >
              사업자등록번호
            </Text>
            <TextInput2
              value={props.clickDoc.comRegNum}
              type="text"
              readOnly
              width={`800px`}
            />
          </Wrapper>
          <Wrapper dr={`row`} margin={`0px 0px 10px`}>
            <Text
              width={`130px`}
              textAlign={`end`}
              padding={`0px 10px 0px 0px`}
            >
              정비업등록번호
            </Text>
            <TextInput2
              value={props.clickDoc.mbRegNum}
              type="text"
              readOnly
              width={`800px`}
            />
          </Wrapper>
          <Wrapper dr={`row`} margin={`0px 0px 10px`}>
            <Text
              width={`130px`}
              textAlign={`end`}
              padding={`0px 10px 0px 0px`}
            >
              대표자명
            </Text>
            <TextInput2
              value={props.clickDoc.ownerName}
              type="text"
              readOnly
              width={`800px`}
            />
          </Wrapper>
          <Wrapper dr={`row`} margin={`0px 0px 10px`}>
            <Text
              width={`130px`}
              textAlign={`end`}
              padding={`0px 10px 0px 0px`}
            >
              정비업종
            </Text>
            <TextInput2
              value={mbTypeToString(props.clickDoc)}
              type="text"
              readOnly
              width={`800px`}
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
