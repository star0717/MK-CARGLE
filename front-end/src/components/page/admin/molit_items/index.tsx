import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React, { useEffect, useState } from "react";
import { BodyWrapper } from "../../../styles/LayoutComponents";
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
  CommonSubTitle,
} from "../../../styles/CommonComponents";
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
  class GenTsArgs {
    nickName?: string;
    options?: string[];
  }
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchText, setSearchText] = useState<string>(""); // 검색 텍스트
  const [selectClass, setSelectClass] = useState<string>("all"); // 선택한 분류
  const [tsItemList, setTsItemList] = useState<TsItem[]>(tsItemListAll); // 선택한 국토부 리스트
  const [reset, setReset] = useState<number>(0); // 리스트 재출력 여부

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 부품 분류 선택 handler -> 리스트 출력
   */
  useEffect(() => {
    if (selectClass === "all") {
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
  }, [selectClass, reset]);

  /**
   * 검색 input handler
   * @param e
   */
  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  /**
   * 검색 handler
   * @param e
   */
  const onSearchFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText) {
      setReset(reset + 1);
    }
    const newList: TsItem[] = [];
    tsItemList.forEach((tsItem: TsItem) => {
      if (
        tsItem.class.description.includes(searchText) ||
        tsItem.class.label.includes(searchText) ||
        tsItem.index.includes(searchText) ||
        tsItem.name.includes(searchText) ||
        tsItem.nickName?.includes(searchText) ||
        tsItem.options?.toString().includes(searchText)
      ) {
        newList.push(tsItem);
      }
    });
    setTsItemList(newList);
  };

  /**
   * 국토부 작업내용 표출을 위한 생성 함수
   * @param name
   * @param nickName
   * @returns
   */
  const genTsContent = (name: string, args?: GenTsArgs) => {
    let tsContent = name;
    if (args?.nickName) tsContent += `(${args.nickName})`;
    if (args?.options)
      for (let i = 0; i < args.options.length; i++) {
        tsContent += `(${args.options[i]})`;
      }
    return tsContent;
  };

  /**
   * 국토부 옵션 표출을 위한 생성 함수
   * @param options
   * @returns
   */
  const genTsOption = (options: any) => {
    let tsOption = "";
    if (options) {
      for (let i = 0; i < options.length; i++) {
        if (i === options.length - 1) {
          tsOption += options[i];
        } else {
          tsOption += `${options[i]}, `;
        }
      }
    } else {
      tsOption += "-";
    }
    return tsOption;
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <BodyWrapper ref={ref}>
      <WholeWrapper>
        <RsWrapper>
          <CommonTitleWrapper>
            <CommonTitle>국토부항목관리</CommonTitle>
            <CommonSubTitle></CommonSubTitle>
          </CommonTitleWrapper>
          <Wrapper>
            <form onSubmit={onSearchFormHandler}>
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
                    value={searchText}
                    onChange={onInputSearchHandler}
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
            </form>
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
                    <TableHeadLIST width={`20%`}>분류</TableHeadLIST>
                    <TableHeadLIST width={`20%`}>코드</TableHeadLIST>
                    <TableHeadLIST width={`60%`}>작업내용</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    {tsItemList.map((item: TsItem, idx: number) => (
                      // <TableRow key={`${item.class.label}${item.index}`}>
                      <TableRow key={idx} kindOf={`noHover`}>
                        <TableRowLIST width={`20%`}>
                          {item.class.description}
                        </TableRowLIST>
                        <TableRowLIST width={`20%`}>
                          {item.class.label}
                          {item.index}
                        </TableRowLIST>
                        <TableRowLIST width={`40%`}>
                          {genTsContent(item.name, {
                            nickName: item.nickName,
                            options: item.options,
                          })}
                        </TableRowLIST>
                      </TableRow>
                    ))}
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
