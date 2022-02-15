import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { UseLink } from "../../../../configure/router.entity";
import {
  _pAdminManCompanies,
  _pAdminReviewCompanies,
} from "../../../../configure/_pProps.entity";
import { CompanyApproval } from "../../../../constants/model.const";
import { Company } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import {
  Combo,
  IconButton,
  RsWrapper,
  SmallButton,
  Text,
  WholeWrapper,
  Wrapper,
  SearchInputWrapper,
  SearchInput,
  CommonTitleWrapper,
  CommonTitle,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRowLIST,
  TableRow,
  CommonSubTitle,
} from "../../../styles/CommonComponents";

const ManCompanyList: NextPage<_pAdminManCompanies> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /**
   * 검색 옵션 handler
   * @param e
   */
  const onSearchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchOption(e.target.value);
  };

  /**
   *
   * @param e 검색 내용 handler
   */
  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterValue(e.target.value);
  };

  /**
   * 검색 기능 handler
   * @param e
   */
  const onSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.findDocHandler(1);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  return (
    <WholeWrapper>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>업체관리</CommonTitle>
          <CommonSubTitle></CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper
          dr={`row`}
          al={`flex-end`}
          padding={`50px 0px 0px`}
          ju={`flex-start`}
        >
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            height={`46px`}
            width={`150px`}
          >
            <option value="name">상호명 검색</option>
            <option value="comRegNum">사업자번호 검색</option>
          </Combo>
          <form onSubmit={onSearchHandler}>
            <SearchInputWrapper
              type="text"
              value={props.filterValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputSearchHandler(e);
              }}
              width={`578px`}
              padding={`0px 5px`}
              dr={`row`}
              margin={`10px 0px 0px`}
              borderBottom={`1px solid #000`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`532px`}
                  padding={`0px 5px 0px 5px`}
                  placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
                  type="text"
                />
              </Wrapper>
              <Wrapper width={`36px`} height={`46px`}>
                <Text fontSize={`24px`}>
                  <IconButton
                    type="submit"
                    onClick={() => {
                      props.findDocHandler(1);
                    }}
                    shadow={`none`}
                  >
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </SearchInputWrapper>
          </form>
        </Wrapper>
        <Wrapper al={`flex-end`} margin={`50px 0px 0px`}>
          <Text>
            가입완료 업체 수 :{" "}
            <span style={{ color: "#314FA5" }}>
              {props.findResult.totalDocs}
            </span>
          </Text>
        </Wrapper>
        <TableWrapper>
          <TableHead>
            <TableHeadLIST width={`15%`}>가입일</TableHeadLIST>
            <TableHeadLIST width={`15%`}>상호명</TableHeadLIST>
            <TableHeadLIST width={`14%`}>사업자등록증</TableHeadLIST>
            <TableHeadLIST width={`14%`}>정비업등록증</TableHeadLIST>
            <TableHeadLIST width={`14%`}>대표자명</TableHeadLIST>
            <TableHeadLIST width={`14%`}>승인여부</TableHeadLIST>
            <TableHeadLIST width={`14%`}>직원관리</TableHeadLIST>
          </TableHead>
          <TableBody>
            {props.findResult.totalDocs > 0 ? (
              props.findResult.docs.map((doc: Company) => (
                <TableRow
                  key={doc._id}
                  onClick={() => {
                    router.push(`${UseLink.ADMIN_MAN_COMPANIES}?id=${doc._id}`);
                  }}
                >
                  <TableRowLIST width={`15%`}>
                    {dayjs(doc.createdAt).format("YYYY-MM-DD")}
                  </TableRowLIST>
                  <TableRowLIST width={`15%`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`14%`}>{doc.comRegNum}</TableRowLIST>
                  <TableRowLIST width={`14%`}>{doc.mbRegNum}</TableRowLIST>
                  <TableRowLIST width={`14%`}>{doc.ownerName}</TableRowLIST>
                  {doc.approval == CompanyApproval.BEFORE ? (
                    <TableRowLIST width={`14%`}>요청 전</TableRowLIST>
                  ) : doc.approval == CompanyApproval.ING ? (
                    <TableRowLIST width={`14%`}>요청 중</TableRowLIST>
                  ) : doc.approval == CompanyApproval.DONE ? (
                    <TableRowLIST width={`14%`}>승인완료</TableRowLIST>
                  ) : (
                    <TableRowLIST width={`14%`}>이상업체</TableRowLIST>
                  )}
                  <TableRowLIST
                    width={`14%`}
                    onClick={(e: React.MouseEvent<HTMLTableCellElement>) => {
                      e.stopPropagation();
                    }}
                  >
                    <SmallButton
                      type="button"
                      kindOf={`default`}
                      onClick={() => {
                        router.push(`${UseLink.ADMIN_USERS}?id=${doc._id}`);
                      }}
                    >
                      직원관리
                    </SmallButton>
                  </TableRowLIST>
                </TableRow>
              ))
            ) : (
              <Wrapper minHeight={`500px`}>
                <Text fontSize={`48px`} color={`#c4c4c4`}>
                  <BsEmojiFrownFill />
                </Text>
                <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
              </Wrapper>
            )}
          </TableBody>
        </TableWrapper>

        <PagenationSection {...props} />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ManCompanyList;
