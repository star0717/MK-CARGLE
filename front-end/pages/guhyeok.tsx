import React, { useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableWrapper,
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { GiEgyptianWalk } from "react-icons/gi";
import { UseLink } from "src/configure/router.entity";
import { useResizeDetector } from "react-resize-detector";

const TestPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
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
          <CommonTitle>정비장부</CommonTitle>
          <CommonSubTitle>정비내역을 관리할 수 있어요.</CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`}>
          <form>
            <SearchInputWrapper
              type="text"
              placeholder="차량번호를 입력하세요."
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
                  placeholder="차량번호를 입력하세요."
                />
              </Wrapper>
              <Wrapper>
                <text>
                  <IconButton type="button">
                    <BsSearch />
                  </IconButton>
                </text>
              </Wrapper>
            </SearchInputWrapper>
          </form>
          <SmallButton
            type="button"
            kindOf={`default`}
            onClick={() => {
              setSearchMenu(!searchMenu);
            }}
          >
            상세검색
            <GiEgyptianWalk />
          </SmallButton>
          <SmallButton type="button" kindOf={`default`}>
            선택삭제
          </SmallButton>
          <SmallButton type="button" kindOf={`default`}>
            +신규정비등록
          </SmallButton>
        </Wrapper>
        {searchMenu === true && (
          <Wrapper margin={`10px 0px 10px 0px`} width={`1200px`}>
            <Wrapper dr={`row`}>
              <text>기간</text>
              <TextInput2
                type="date"
                // value={dayjs(userData.joinDate).format("YYYY-MM-DD")}
                // {...register("joinDate", {
                //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                //     onInputUserHandler(e);
                //   },
                // })}
                width={`500px`}
              />
              <text> ~ </text>
              <TextInput2
                type="date"
                // value={dayjs(userData.joinDate).format("YYYY-MM-DD")}
                // {...register("joinDate", {
                //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                //     onInputUserHandler(e);
                //   },
                // })}
                width={`500px`}
              />
            </Wrapper>
            <Wrapper dr={`row`}>
              <text>정비상태</text>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                전체
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                정비중
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                정비완료
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                출고완료
              </Checkbox>
            </Wrapper>
            <Wrapper dr={`row`}>
              <text>국토부</text>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                전체
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                해당없음
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                전송오류
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                전송완료
              </Checkbox>
            </Wrapper>
            <Wrapper dr={`row`}>
              <text>구분</text>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                전체
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                일반
              </Checkbox>
              <Checkbox>
                <CheckInput type="checkbox" />
                <CheckMark></CheckMark>
                보험
              </Checkbox>
            </Wrapper>
            <Wrapper dr={`row`}>
              <SmallButton type="button" kindOf={`default`}>
                검 색
              </SmallButton>
            </Wrapper>
          </Wrapper>
        )}
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
              <TableHeadLIST width={`15%`}>입고일자</TableHeadLIST>
              <TableHeadLIST width={`15%`}>차량번호</TableHeadLIST>
              <TableHeadLIST width={`14%`}>구분</TableHeadLIST>
              <TableHeadLIST width={`15%`}>작업내용</TableHeadLIST>
              <TableHeadLIST width={`14%`}>문서발급</TableHeadLIST>
              <TableHeadLIST width={`14%`}>국토부</TableHeadLIST>
              <TableHeadLIST width={`8%`}>정비상태</TableHeadLIST>
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
          <Wrapper dr={`row`}></Wrapper>
          {/* <PagenationSection {...props} /> */}
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );

  // /*********************************************************************
  //  * 1. Init Libs
  //  *********************************************************************/

  // /*********************************************************************
  //  * 2. State settings
  //  *********************************************************************/

  // /*********************************************************************
  //  * 3. Handlers
  //  *********************************************************************/

  // /*********************************************************************
  //  * 4. Props settings
  //  *********************************************************************/

  // /*********************************************************************
  //  * 5. Page configuration
  //  *********************************************************************/
  // return (
  //   <BodyWrapper>
  //     <WholeWrapper>
  //       <RsWrapper>
  //         <SmallButton type="button" kindOf={`default`}>
  //           상세검색
  //         </SmallButton>
  //       </RsWrapper>
  //     </WholeWrapper>
  //   </BodyWrapper>
  // );
};

export default TestPage;
