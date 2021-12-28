import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import {
  _aGetAdminManCompanies,
  _aGetAdminReivewCompanies,
} from "../../../../../store/action/user.action";
import { _iFindCompanies } from "../../../../../store/interfaces";
import { StepQuery, UseLink } from "../../../../configure/router.entity";
import {
  _pAdminManCompanies,
  _pAdminReviewCompanies,
} from "../../../../configure/_pProps.entity";
import { Company, CompanyApproval } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import {
  CloseButton,
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
} from "../../../styles/CommonComponents";

const ManCompanyList: NextPage<_pAdminManCompanies> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  //modal 창 여부
  //   //직원 명단 API Result 관련
  //   const [findResult, setFindResult] = useState<FindResult<Company>>(props.data);
  //   //클릭한 업체정보
  //   const [clickDoc, setClickDoc] = useState<Company>();

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  //   /**
  //    * 작업자의 정보를 조회함
  //    * @param page 조회할 페이지
  //    */
  //   const findCompanyHandler = (page: number) => {
  //     const param: FindParameters = {
  //       page,
  //       take: 1,
  //     };
  //     dispatch(_aGetAdminManCompanies(param)).then((res: _iFindCompanies) => {
  //       setFindResult(res.payload);
  //     });
  //   };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  //   const adminManComProps: _pAdminManCompanies = {
  //     ...props,
  //     findResult,
  //     setFindResult,
  //     findDocHandler: findCompanyHandler,
  //   };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return (
    <WholeWrapper>
      <RsWrapper>
        <Wrapper width={`1200px`}>
          <Text>업체 관리</Text>
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
                    props.setClickDoc(doc);
                    router.push(
                      `${UseLink.ADMIN_MAN_COMPANIES}${StepQuery.FIRST}`
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
    </WholeWrapper>
  );
};

export default ManCompanyList;
