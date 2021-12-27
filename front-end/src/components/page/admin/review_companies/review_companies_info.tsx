import dayjs from "dayjs";
import Modal from "react-modal";
import { NextPage } from "next";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { _pAdminReviewCompanies } from "../../../../configure/_pProps.entity";
import { Company, CompanyApproval } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import AdminReviewCompaniesModal from "./modal";
import {
  CloseButton,
  IconButton,
  RsWrapper,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import { BsSearch } from "react-icons/bs";

const AdminReviewCompaniesinfo: NextPage<_pAdminReviewCompanies> = (props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clickDoc, setClickDoc] = useState<Company>();

  const closeModal = () => {
    setModalOpen(false);
    props.findDocHandler(props.findResult.currentPage);
  };

  const ARCModalProps: any = {
    ...props,
    setModalOpen,
    clickDoc,
    style: { height: "500px" },
  };

  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper width={`1200px`}>
          <Wrapper dr={`row`}>
            <TextInput
              type="text"
              placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
            />
            <IconButton>
              <BsSearch></BsSearch>
            </IconButton>
          </Wrapper>
          <Text>승인 관리</Text>
          <TableWrapper>
            <TableHead>
              <TableHeadLIST width={`200px`}>가입일</TableHeadLIST>
              <TableHeadLIST width={`200px`}>상호명</TableHeadLIST>
              <TableHeadLIST width={`200px`}>사업자등록증</TableHeadLIST>
              <TableHeadLIST width={`200px`}>정비업등록증</TableHeadLIST>
              <TableHeadLIST width={`200px`}>대표자명</TableHeadLIST>
              <TableHeadLIST width={`200px`}>승인여부</TableHeadLIST>
            </TableHead>
            <TableBody>
              {props.findResult.docs.map((doc: Company) => (
                <TableRow
                  key={doc._id}
                  // onClick={() => {
                  //   setModalOpen(!modalOpen);
                  //   setClickDoc(doc);
                  // }}
                >
                  <TableRowLIST width={`200px`}>
                    {dayjs(doc.createdAt).format("YYYY-MM-DD")}
                  </TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.comRegNum}</TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.mbRegNum}</TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.ownerName}</TableRowLIST>
                  {/* <TableRowLIST width={`200px`}>{doc.approval}</TableRowLIST> */}
                  {doc.approval == CompanyApproval.BEFORE ? (
                    <TableRowLIST width={`200px`}>요청 전</TableRowLIST>
                  ) : doc.approval == CompanyApproval.ING ? (
                    <TableRowLIST width={`200px`}>요청 중</TableRowLIST>
                  ) : doc.approval == CompanyApproval.DONE ? (
                    <TableRowLIST width={`200px`}>승인완료</TableRowLIST>
                  ) : (
                    <TableRowLIST width={`200px`}>이상업체</TableRowLIST>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        </Wrapper>
        <PagenationSection {...props} />
      </RsWrapper>
      {/* <Wrapper>
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
            <AdminReviewCompaniesModal {...ARCModalProps} />
          </Wrapper>
        </Modal>
      </Wrapper> */}
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesinfo;
