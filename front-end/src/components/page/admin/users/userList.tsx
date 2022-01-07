import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  _aGetAdminManCompanies,
  _aGetAdminUsers,
} from "../../../../../store/action/user.action";
import {
  _iFindCompanies,
  _iGetAdminUsers,
} from "../../../../../store/interfaces";
import { UseLink } from "../../../../configure/router.entity";
import { _pAdminUsers } from "../../../../configure/_pProps.entity";
import { FindParameters } from "../../../../models/base.entity";
import { User } from "../../../../models/user.entity";
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
} from "../../../styles/CommonComponents";

const UsersList: NextPage<_pAdminUsers> = (props) => {
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
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findUserHandler = (page?: number) => {
    const param: FindParameters = {
      page,
      take: 10,
      filterKey: props.searchOption,
      filterValue: props.filterValue,
      useRegSearch: true,
    };
    dispatch(_aGetAdminUsers(param)).then((res: _iGetAdminUsers) => {
      props.setFindResult(res.payload);
    });
  };

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
      props.findDocHandler;
      findUserHandler();
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
        <Wrapper width={`1200px`}>
          <Wrapper dr={`row`}>
            <Combo
              value={props.searchOption}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onSearchOptionHandler(e);
              }}
            >
              <option value="name">이름 검색</option>
              <option value="hpNumber">전화번호 검색</option>
              <option value="approval">승인여부 검색</option>
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
                findUserHandler();
              }}
            >
              <BsSearch />
            </IconButton>

            <Text>직원 수 : {props.findResult.totalDocs}</Text>
          </Wrapper>
          <TableWrapper>
            <TableHead>
              <TableHeadLIST width={`300px`}>직원명</TableHeadLIST>
              <TableHeadLIST width={`300px`}>전화번호</TableHeadLIST>
              <TableHeadLIST width={`300px`}>입사일자</TableHeadLIST>
              <TableHeadLIST width={`300px`}>승인여부</TableHeadLIST>
            </TableHead>
            <TableBody>
              {props.findResult.docs.map((doc: User) => (
                <TableRow
                  key={doc._id}
                  onClick={() => {
                    console.log("구혁씨 ㅎㅇ");
                  }}
                >
                  <TableRowLIST width={`300px`}>{doc.name}</TableRowLIST>
                  <TableRowLIST width={`300px`}>{doc.hpNumber}</TableRowLIST>
                  <TableRowLIST width={`300px`}>
                    {dayjs(doc.joinDate).format("YYYY-MM-DD")}
                  </TableRowLIST>
                  <TableRowLIST width={`300px`}>
                    {doc.approval ? "승인" : "미승인"}
                  </TableRowLIST>
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

export default UsersList;
