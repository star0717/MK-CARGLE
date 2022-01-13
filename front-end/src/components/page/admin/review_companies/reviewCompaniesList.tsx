import dayjs from "dayjs";
import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { _ingCompany } from "../../../../../store/interfaces";
import { _pAdminReviewCompanies } from "../../../../configure/_pProps.entity";
import { Company, CompanyApproval } from "../../../../models/company.entity";
import { PagenationSection } from "../../../common/sections";
import {
  IconButton,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Combo,
  CommonTitleWrapper,
  CommonTitle,
  SearchInputWrapper,
  SearchInput,
} from "../../../styles/CommonComponents";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { _MainProps } from "../../../../configure/_props.entity";
import { UseLink } from "../../../../configure/router.entity";

const AdminReviewCompaniesList: NextPage<_pAdminReviewCompanies> = (props) => {
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

  const onSearchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchOption(e.target.value);
  };

  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterValue(e.target.value);
  };

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
      <CommonTitleWrapper>
        <CommonTitle>승인관리</CommonTitle>
      </CommonTitleWrapper>
      <RsWrapper>
        <Wrapper dr={`row`} al={`flex-end`} padding={`50px 0px 0px`}>
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            height={`46px`}
            width={`150px`}
          >
            <option value="name">이름 검색</option>
            <option value="phoneNum">전화번호 검색</option>
          </Combo>
          <SearchInputWrapper
            type="text"
            placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
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
            승인대기 업체 수 :
            <span style={{ color: "#314FA5" }}>
              {props.findResult.totalDocs}
            </span>
          </Text>
        </Wrapper>
        <Wrapper margin={`10px 0px 30px`}>
          <table>
            <thead>
              <tr>
                <th>가입일</th>
                <th>상호명</th>
                <th>사업자등록증</th>
                <th>정비업등록증</th>
                <th>대표자명</th>
                <th>승인여부</th>
              </tr>
            </thead>
            <tbody>
              {props.findResult.totalDocs > 0 ? (
                props.findResult.docs.map((doc: Company) => (
                  <tr
                    key={doc._id}
                    onClick={() => {
                      router.push(
                        `${UseLink.ADMIN_REVIEW_COMPANIES}?id=${doc._id}`
                      );
                    }}
                  >
                    <td width={`200px`}>
                      {dayjs(doc.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td width={`200px`}>{doc.name}</td>
                    <td width={`200px`}>{doc.comRegNum}</td>
                    <td width={`200px`}>{doc.mbRegNum}</td>
                    <td width={`200px`}>{doc.ownerName}</td>
                    {doc.approval == CompanyApproval.BEFORE ? (
                      <td width={`200px`}>요청 전</td>
                    ) : doc.approval == CompanyApproval.ING ? (
                      <td width={`200px`}>요청 중</td>
                    ) : doc.approval == CompanyApproval.DONE ? (
                      <td width={`200px`}>승인완료</td>
                    ) : (
                      <td width={`200px`}>이상업체</td>
                    )}
                  </tr>
                ))
              ) : (
                <Wrapper minHeight={`445px`}>
                  <Text fontSize={`48px`} color={`#c4c4c4`}>
                    <BsEmojiFrownFill />
                  </Text>
                  <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
                </Wrapper>
              )}
            </tbody>
          </table>
        </Wrapper>
        <PagenationSection {...props} />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AdminReviewCompaniesList;
