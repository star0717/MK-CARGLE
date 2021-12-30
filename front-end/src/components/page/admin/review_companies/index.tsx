import { Modal } from "@material-ui/core";
import dayjs from "dayjs";
import type { NextPage } from "next";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { _aGetAdminReivewCompanies } from "../../../../../store/action/user.action";
import { _iFindCompanies } from "../../../../../store/interfaces";
import { _pAdminReviewCompanies } from "../../../../configure/_pProps.entity";
import { FindParameters, FindResult } from "../../../../models/base.entity";
import { Company, CompanyApproval } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import {
  TextInput,
  IconButton,
  RsWrapper,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Combo,
} from "../../../styles/CommonComponents";
import AdminReviewCompaniesinfo from "./review_companies_info";
import { BsSearch } from "react-icons/bs";
import { _MainProps } from "../../../../configure/_props.entity";

const AdminReviewCompaniesPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //직원 명단 API Result 관련
  const [findResult, setFindResult] = useState<FindResult<Company>>(props.data);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<Company>();
  const [searchOption, setSearchOption] = useState<String>("name");

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findCompanyHandler = (page: number) => {
    const param: FindParameters = {
      page,
      take: 1,
    };
    dispatch(_aGetAdminReivewCompanies(param)).then((res: _iFindCompanies) => {
      setFindResult(res.payload);
      console.log("마! 디스패치 아이가!");
    });
  };

  const onSearchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const fprops: _pAdminReviewCompanies = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findCompanyHandler,
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  console.log("이게 프롭스다마! => ", findResult);
  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper width={`1200px`}>
          <Wrapper dr={`row`}>
            <Combo
              value={searchOption}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onSearchOptionHandler(e);
              }}
            >
              <option value="name">상호명 검색</option>
              <option value="comRegNum">사업자등록번호 검색</option>
            </Combo>
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
              {findResult.docs.map((doc: Company) => (
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
        <PagenationSection {...fprops} />
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

export default AdminReviewCompaniesPage;
