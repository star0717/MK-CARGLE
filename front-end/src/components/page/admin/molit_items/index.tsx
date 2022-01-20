import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";

import React, { useEffect, useState } from "react";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import {
  WholeWrapper,
  CommonTitleWrapper,
  CommonTitle,
  RsWrapper,
  Wrapper,
  SearchInputWrapper,
  SearchInput,
  IconButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRow,
  TableRowLIST,
  Text,
} from "../../../styles/CommonComponents";
import { MdOutlineNavigateNext } from "react-icons/md";
import {
  TsItem,
  TsClass,
  TsClassList,
  tsItemListAll,
  tsItemListB,
  tsItemListD,
  tsItemListE,
  tsItemListH,
  tsItemListS,
} from "../../../../constants/part.const";

const AdminMolitItemsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 옵션
  const [searchText, setSearchText] = useState<string>(""); // 검색 텍스트
  const [selectClass, setSelectClass] = useState<string>("all"); // 선택한 분류
  const [tsItemList, setTsItemList] = useState<TsItem[]>(tsItemListAll); // 선택한 국토부 리스트
  const [clickDoc, setClickDoc] = useState<TsItem>(); // 선택한 부품 항목 데이터
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const closeModal = () => {
    setModalOpen(false);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * 부품 분류 선택 handler -> 리스트 출력
   */
  useEffect(() => {
    if (selectClass === "all") {
      // const allTsList: TsItem[] = [];
      // allTsList.concat(
      //   tsItemListB,
      //   tsItemListD,
      //   tsItemListE,
      //   tsItemListH,
      //   tsItemListS
      // );
      setTsItemList(tsItemListAll);
    } else {
      switch (selectClass) {
        case "B":
          return setTsItemList(tsItemListB);
        case "D":
          return setTsItemList(tsItemListD);
        case "E":
          return setTsItemList(tsItemListE);
        case "H":
          return setTsItemList(tsItemListH);
        case "S":
          return setTsItemList(tsItemListS);
      }
    }
  }, [selectClass]);

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const ARCModalProps: any = {
    ...props,
    setModalOpen,
    style: { height: "500px" },
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <BodyWrapper ref={ref}>
      <WholeWrapper>
        <CommonTitleWrapper>
          <CommonTitle>국토부항목관리</CommonTitle>
        </CommonTitleWrapper>

        <RsWrapper>
          <Wrapper padding={`50px 0px 0px`}>
            <SearchInputWrapper
              type="text"
              width={`678px`}
              padding={`0px 5px`}
              dr={`row`}
              borderBottom={`1px solid #000`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`632px`}
                  padding={`0px 5px 0px 5px`}
                  placeholder="찾고싶은 부품명을 입력하세요."
                  type="text"
                />
              </Wrapper>
              <Wrapper width={`36px`} height={`46px`}>
                <Text fontSize={`24px`}>
                  <IconButton type="submit" shadow={`none`}>
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </SearchInputWrapper>
          </Wrapper>
          <Wrapper dr={`row`} padding={`40px 0px 0px`} ju={`space-between`}>
            {/* 부품분류 */}
            <Wrapper width={`24%`}>
              <TableWrapper>
                <Wrapper isSticky={true}>
                  <TableHead radius={`8px 8px 0px 0px`}>
                    <TableHeadLIST width={`100%`}>작업분류</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    <TableRow
                      kindOf={
                        selectClass === "all" ? `selectClass` : `noSelectClass`
                      }
                    >
                      <TableRowLIST
                        width={`100%`}
                        onClick={() => {
                          setSelectClass("all");
                        }}
                      >
                        전체보기
                      </TableRowLIST>
                    </TableRow>
                    {TsClassList.map((tsClass: TsClass) => (
                      <TableRow
                        key={tsClass.label}
                        kindOf={
                          selectClass === tsClass.label
                            ? `selectClass`
                            : `noSelectClass`
                        }
                        onClick={() => {
                          setSelectClass(tsClass.label);
                        }}
                      >
                        <TableRowLIST width={`100%`}>
                          {tsClass.description}
                        </TableRowLIST>
                      </TableRow>
                    ))}
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>

            <Wrapper width={`74%`}>
              <TableWrapper overflow={`auto`}>
                <Wrapper isSticky={true}>
                  <TableHead radius={`8px 8px 0px 0px`}>
                    <TableHeadLIST width={`25%`}>분류</TableHeadLIST>
                    <TableHeadLIST width={`15%`}>코드</TableHeadLIST>
                    <TableHeadLIST width={`60%`}>작업내용</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    {tsItemList.map((item: TsItem) => (
                      <TableRow>
                        <TableRowLIST width={`25%`}>dd</TableRowLIST>
                        <TableRowLIST width={`15%`}>B01</TableRowLIST>
                        <TableRowLIST width={`60%`}>
                          전조등(헤드램프)(좌)(우)
                        </TableRowLIST>
                      </TableRow>
                    ))}
                    {/* <TableRow>
                      <TableRowLIST width={`25%`}>차체(보디)(B)</TableRowLIST>
                      <TableRowLIST width={`15%`}>B01</TableRowLIST>
                      <TableRowLIST width={`60%`}>
                        전조등(헤드램프)(좌)(우)
                      </TableRowLIST>
                    </TableRow> */}
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
        <Wrapper></Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminMolitItemsPage;
