import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { UseLink } from "../../../../configure/router.entity";
import {
  _pAdminManCompanies,
  _pAdminReviewCompanies,
} from "../../../../configure/_pProps.entity";
import { FindParameters } from "../../../../models/base.entity";
import { Company, CompanyApproval } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import {
  CloseButton,
  Combo,
  IconButton,
  RsWrapper,
  SmallButton,
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
  SearchInputWrapper,
  SearchInput,
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
   * 키보드 이벤트 발생
   * @param e
   */
  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      props.findDocHandler(1);
    }
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
        {/* <Wrapper dr={`row`}>
            <Combo
              value={props.searchOption}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onSearchOptionHandler(e);
              }}
            >
              <option value="name">상호명 검색</option>
              <option value="comRegNum">사업자등록번호 검색</option>
            </Combo>
            <TextInput
              type="text"
              value={props.filterValue}
              placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onInputSearchHandler(e);
              }}
              onKeyUp={handleKeyUp}
            />
            <IconButton
              type="submit"
              onClick={() => {
                props.findDocHandler(1);
              }}
            >
              <BsSearch />
            </IconButton>


          </Wrapper> */}
        <Wrapper dr={`row`} al={`flex-end`}>
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            height={`46px`}
          >
            <option value="name">이름 검색</option>
            <option value="hpNumber">전화번호 검색</option>
            <option value="approval">승인여부 검색</option>
          </Combo>
          <SearchInputWrapper
            type="text"
            value={props.filterValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onInputSearchHandler(e);
            }}
            onKeyUp={handleKeyUp}
            width={`678px`}
            padding={`0px 5px`}
            dr={`row`}
            margin={`10px 0px 0px`}
            borderBottom={`1px solid #000`}
          >
            <Wrapper width={`auto`}>
              <SearchInput
                width={`632px`}
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
        </Wrapper>
        <Wrapper al={`flex-end`} margin={`50px 0px 0px`}>
          <Text>
            가입완료 업체 수 :{" "}
            <span style={{ color: "#314FA5" }}>
              {props.findResult.totalDocs}
            </span>
          </Text>
        </Wrapper>
        <TableWrapper margin={`10px 0px 30px`}>
          <TableHead>
            <TableHeadLIST width={`200px`}>가입일</TableHeadLIST>
            <TableHeadLIST width={`250px`}>상호명</TableHeadLIST>
            <TableHeadLIST width={`200px`}>사업자등록증</TableHeadLIST>
            <TableHeadLIST width={`200px`}>정비업등록증</TableHeadLIST>
            <TableHeadLIST width={`200px`}>대표자명</TableHeadLIST>
            <TableHeadLIST width={`150px`}>승인여부</TableHeadLIST>
            <TableHeadLIST width={`200px`}>직원관리</TableHeadLIST>
          </TableHead>
          <TableBody>
            {props.findResult.docs.map((doc: Company) => (
              <TableRow
                key={doc._id}
                onClick={() => {
                  router.push(`${UseLink.ADMIN_MAN_COMPANIES}?id=${doc._id}`);
                }}
              >
                <TableRowLIST width={`200px`}>
                  {dayjs(doc.createdAt).format("YYYY-MM-DD")}
                </TableRowLIST>
                <TableRowLIST width={`250px`}>{doc.name}</TableRowLIST>
                <TableRowLIST width={`200px`}>{doc.comRegNum}</TableRowLIST>
                <TableRowLIST width={`200px`}>{doc.mbRegNum}</TableRowLIST>
                <TableRowLIST width={`200px`}>{doc.ownerName}</TableRowLIST>
                {doc.approval == CompanyApproval.BEFORE ? (
                  <TableRowLIST width={`150px`}>요청 전</TableRowLIST>
                ) : doc.approval == CompanyApproval.ING ? (
                  <TableRowLIST width={`150px`}>요청 중</TableRowLIST>
                ) : doc.approval == CompanyApproval.DONE ? (
                  <TableRowLIST width={`150px`}>승인완료</TableRowLIST>
                ) : (
                  <TableRowLIST width={`150px`}>이상업체</TableRowLIST>
                )}
                <TableRowLIST
                  width={`200px`}
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
            ))}
          </TableBody>
        </TableWrapper>
        <PagenationSection {...props} />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ManCompanyList;
