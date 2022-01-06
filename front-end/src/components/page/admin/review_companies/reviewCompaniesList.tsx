import dayjs from "dayjs";
import type { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { _aGetAdminReivewCompanies } from "../../../../../store/action/user.action";
import {
  actionTypesUser,
  _iFindCompanies,
} from "../../../../../store/interfaces";
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
import { BsSearch } from "react-icons/bs";
import { _MainProps } from "../../../../configure/_props.entity";
import { StepQuery, UseLink } from "../../../../configure/router.entity";

const AdminReviewCompaniesList: NextPage<_pAdminReviewCompanies> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("List로 들어왔습니다.");
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //직원 명단 API Result 관련
  //   const [findResult, setFindResult] = useState<FindResult<Company>>(props.data);
  //   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //   const [selectedDoc, setSelectedDoc] = useState<Company>();
  const [searchOption, setSearchOption] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<string>("");
  //   const [modalOpen, setModalOpen] = useState<boolean>(false);
  //   const [clickDoc, setClickDoc] = useState<Company>();
  //   console.log("props =>", props);
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findCompanyHandler = (page?: number) => {
    console.log("새로 렌더링 했습니다.1");
    const param: FindParameters = {
      page,
      take: 5,
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
    };
    dispatch(_aGetAdminReivewCompanies(param)).then((res: _iFindCompanies) => {
      props.setFindResult(res.payload);
    });
  };

  const onSearchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      findCompanyHandler();
    }
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  //   const fprops: _pAdminReviewCompanies = {
  //     ...props,
  //     findResult,
  //     setFindResult,
  //     findDocHandler: findCompanyHandler,
  //     clickDoc,
  //     setClickDoc,
  //   };

  //   const ARCModalProps: any = {
  //     ...props,
  //     setModalOpen,
  //     clickDoc,
  //     style: { height: "500px" },
  //   };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputSearchHandler(e);
              }}
              onKeyUp={handleKeyUp}
            />
            <IconButton
              type="submit"
              onClick={() => {
                findCompanyHandler();
              }}
            >
              <BsSearch></BsSearch>
            </IconButton>

            <Text>승인대기업체수 : {props.findResult.totalDocs}</Text>
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
                  onClick={() => {
                    router.push(
                      `${UseLink.ADMIN_REVIEW_COMPANIES}${StepQuery.FIRST}&id=${doc._id}`
                    );
                  }}
                >
                  <TableRowLIST width={`200px`}>
                    {dayjs(doc.createdAt).format("YYYY-MM-DD")}
                  </TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.comRegNum}</TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.mbRegNum}</TableRowLIST>
                  <TableRowLIST width={`200px`}>{doc.ownerName}</TableRowLIST>
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
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesList;