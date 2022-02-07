import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  SearchInputWrapper,
  WholeWrapper,
  Wrapper,
  SearchInput,
  IconButton,
  Text,
  SmallButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  Checkbox,
  CheckInput,
  CheckMark,
  TableBody,
} from "src/components/styles/CommonComponents";
import { _MainProps } from "src/configure/_props.entity";
import { BsSearch } from "react-icons/bs";

const ManReservationPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

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
          <CommonTitle>예약관리</CommonTitle>
          <CommonSubTitle></CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`}>
          <form>
            <SearchInputWrapper
              type="text"
              placeholder="찾고싶은 예약의 차량번호 또는 휴대전화번호를 입력하세요."
              dr={`row`}
              width={`678px`}
              padding={`0px 5px`}
              margin={`10px 0px 0px`}
              borderBottom={`1px solid #000`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`632px`}
                  type="text"
                  placeholder="찾고싶은 예약의 차량번호 또는 휴대전화번호를 입력하세요."
                />
              </Wrapper>
              <Wrapper>
                <Text>
                  <IconButton>
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </SearchInputWrapper>
          </form>
          <SmallButton>캘린더</SmallButton>
          <SmallButton>선택삭제</SmallButton>
          <SmallButton>+신규예약등록</SmallButton>
        </Wrapper>
        <Wrapper margin={`10px 0px 30px`}>
          <TableWrapper>
            <TableHead>
              <TableHeadLIST
                width={`5%`}
                onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput
                    type="checkbox"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //   onCheckedAll(e.target.checked);
                    // }}
                    // checked={
                    //   checkedList.length === 0
                    //     ? false
                    //     : checkedList.length === props.findResult.docs.length
                    //     ? true
                    //     : false
                    // }
                  />
                  <CheckMark></CheckMark>
                </Checkbox>
              </TableHeadLIST>
              <TableHeadLIST width={`20%`}>예약접수일자</TableHeadLIST>
              <TableHeadLIST width={`24%`}>정비희망일자</TableHeadLIST>
              <TableHeadLIST width={`18%`}>차량번호</TableHeadLIST>
              <TableHeadLIST width={`25%`}>전화번호</TableHeadLIST>
              <TableHeadLIST width={`8%`}>예약상태</TableHeadLIST>
            </TableHead>
            <TableBody>
              {/* {props.findResult.totalDocs > 0 ? (
                  props.findResult.docs.map((list: Agency) => (
                    <TableRow
                      key={list._id}
                      onClick={() => {
                        setClickDoc(list);
                        setModalOption("edit");
                        setModalOpen(true);
                      }}
                    >
                      <TableRowLIST
                        width={`10%`}
                        onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                          e.stopPropagation()
                        }
                      >
                        <Checkbox kindOf={`TableCheckBox`}>
                          <CheckInput
                            type="checkbox"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => onCheckedElement(e.target.checked, list)}
                            checked={
                              checkedList.includes(list._id) ? true : false
                            }
                          />
                          <CheckMark></CheckMark>
                        </Checkbox>
                      </TableRowLIST>
                      <TableRowLIST width={`15%`}>{list.name}</TableRowLIST>
                      <TableRowLIST width={`15%`}>{list.hpNum}</TableRowLIST>
                      <TableRowLIST width={`22%`}>
                        <ToolTipWrapper>
                          <ToolTip>{list.address1}</ToolTip>
                        </ToolTipWrapper>
                      </TableRowLIST>
                      <TableRowLIST width={`15%`}>{list.manager}</TableRowLIST>
                      <TableRowLIST width={`23%`}>
                        <ToolTipWrapper>
                          <ToolTip>
                            {list.memo}
                            <ToolTipText>{list.memo}</ToolTipText>
                          </ToolTip>
                        </ToolTipWrapper>
                      </TableRowLIST>
                    </TableRow>
                  ))
                ) : (
                  <Wrapper minHeight={`445px`}>
                    <Text fontSize={`48px`} color={`#c4c4c4`}>
                      <BsEmojiFrownFill />
                    </Text>
                    <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
                  </Wrapper>
                )} */}
            </TableBody>
          </TableWrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default ManReservationPage;
