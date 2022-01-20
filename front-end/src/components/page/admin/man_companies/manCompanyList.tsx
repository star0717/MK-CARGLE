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
import { genApiPath } from "../../../../modules/commonModule";
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
        <CommonTitleWrapper>
          <CommonTitle>업체관리</CommonTitle>
          <CommonSubTitle></CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`} al={`flex-end`} padding={`50px 0px 0px`}>
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            height={`46px`}
          >
            <option value="name">이름 검색</option>
            <option value="phoneNum">전화번호 검색</option>
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
        {/* <Wrapper margin={`10px 0px 30px`}>
          <table>
            <thead>
              <TableRow>
                <th>가입일</th>
                <th>상호명</th>
                <th>사업자등록증</th>
                <th>정비업등록증</th>
                <th>대표자명</th>
                <th>승인여부</th>
                <th>직원관리</th>
              </tr>
            </thead>
            <tbody>
              {props.findResult.totalDocs > 0 ? (
                props.findResult.docs.map((doc: Company) => (
                  <tr
                    key={doc._id}
                    onClick={() => {
                      router.push(
                        `${UseLink.ADMIN_MAN_COMPANIES}?id=${doc._id}`
                      );
                    }}
                  >
                    <td width={`200px`}>
                      {dayjs(doc.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td width={`250px`}>{doc.name}</td>
                    <td width={`200px`}>{doc.comRegNum}</td>
                    <td width={`200px`}>{doc.mbRegNum}</td>
                    <td width={`200px`}>{doc.ownerName}</td>
                    {doc.approval == CompanyApproval.BEFORE ? (
                      <td width={`150px`}>요청 전</td>
                    ) : doc.approval == CompanyApproval.ING ? (
                      <td width={`150px`}>요청 중</td>
                    ) : doc.approval == CompanyApproval.DONE ? (
                      <td width={`150px`}>승인완료</td>
                    ) : (
                      <td width={`150px`}>이상업체</td>
                    )}
                    <td
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
                    </td>
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
        </Wrapper> */}
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
            {
              props.findResult.totalDocs > 0 ? (
                props.findResult.docs.map((doc: Company) => (
                  <TableRow
                    key={doc._id}
                    onClick={() => {
                      router.push(
                        `${UseLink.ADMIN_MAN_COMPANIES}?id=${doc._id}`
                      );
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
              )

              /* {props.findResult.totalDocs > 0 ? (
                props.findResult.docs.map((doc: Company) => (
            <TableRow  key={doc._id}
            onClick={() => {
              router.push(
                `${UseLink.ADMIN_MAN_COMPANIES}?id=${doc._id}`
              );
            }}>
              <TableRowLIST>{dayjs(doc.createdAt).format("YYYY-MM-DD")} </TableRowLIST>
              <TableRowLIST> {doc.name}</TableRowLIST>
              <TableRowLIST> {doc.comRegNum}</TableRowLIST>
              <TableRowLIST> {doc.ownerName}</TableRowLIST>
              {doc.approval == CompanyApproval.BEFORE ? (
              <TableRowLIST> 요청 전</TableRowLIST>
              ) : doc.approval == CompanyApproval.ING ? (
              <TableRowLIST> 요청 중</TableRowLIST>
              ) : doc.approval == CompanyApproval.DONE ? (
              <TableRowLIST> 승인완료</TableRowLIST>
              ) : (
                }}
                <TableRowLIST                       onClick={(e: React.MouseEvent<HTMLTableCellElement>) => {
                  e.stopPropagation();
                }}> 승인완료</TableRowLIST>
                <SmallButton
                type="button"
                kindOf={`default`}
                onClick={() => {
                  router.push(`${UseLink.ADMIN_USERS}?id=${doc._id}`);
                }}
              >
                직원관리
              </SmallButton>
            </TableRow>
            ))
            ) : (
              <Wrapper minHeight={`445px`}>
              <Text fontSize={`48px`} color={`#c4c4c4`}>
                <BsEmojiFrownFill />
              </Text>
              <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
            </Wrapper>
          )} */
            }
          </TableBody>
        </TableWrapper>

        <PagenationSection {...props} />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ManCompanyList;
