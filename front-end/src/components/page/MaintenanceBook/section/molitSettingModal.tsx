import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  IconButton,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { BsSearch } from "react-icons/bs";
import { AiFillMinusSquare } from "react-icons/ai";
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
import { useResizeDetector } from "react-resize-detector";

const MolitSettingModal: NextPage<any> = (props) => {
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
        // tsItem.class.description.includes(searchText) ||
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
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  console.log(props);

  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper>
      <CommonSmallTitle>국토부 정비 이력 설정</CommonSmallTitle>
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
                placeholder="찾고싶은 정비 항목을 입력하세요."
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
      <Wrapper dr={`row`} padding={`40px 120px 0px`} ju={`space-between`}>
        {/* 부품분류 */}
        <Wrapper width={`32%`}>
          <TableWrapper minHeight={`260px`} overflow={`auto`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST width={`100%`}>작업 분류</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`260px`} ju={`flex-start`}>
              <TableBody minHeight={`260px`}>
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
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
        {/* 상세정보 */}
        <Wrapper width={`67%`}>
          <TableWrapper minHeight={`260px`} overflow={`auto`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST width={`70%`}>작업내용</TableHeadLIST>
                <TableHeadLIST width={`20%`}>코드</TableHeadLIST>
                <TableHeadLIST width={`10%`}>선택</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`260px`} ju={`flex-start`}>
              <TableBody minHeight={`260px`}>
                {tsItemList.map((item: TsItem, idx: number) => (
                  <TableRow key={idx} kindOf={`noHover`}>
                    <TableRowLIST width={`70%`}>
                      {genTsContent(item.name, {
                        nickName: item.nickName,
                        options: item.options,
                      })}
                    </TableRowLIST>
                    <TableRowLIST width={`20%`}>
                      {item.class.label}
                      {item.index}
                    </TableRowLIST>
                    <TableRowLIST width={`10%`}>
                      <SmallButton kindOf="default" height={`34px`}>
                        선택
                      </SmallButton>
                    </TableRowLIST>
                  </TableRow>
                ))}
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper padding={`0px 120px`}>
        <Wrapper
          dr={`row`}
          padding={`20px`}
          border={`1px solid #8DAFCE`}
          margin={`20px 0px 30px`}
          radius={`4px`}
          shadow={`0px 5px 15px rgba(223,223,223,1)`}
        >
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 10px 0px`}>
            <Text
              width={`auto`}
              margin={`0px 10px 0px 0px`}
              textAlign={`start`}
            >
              선택된 정비 항목:
            </Text>
            <Wrapper
              width={`280px`}
              height={`40px`}
              border={`1px solid #c4c4c4`}
              radius={`4px`}
              al={`flex-start`}
              padding={`0px 10px`}
            >
              <Text
                width={`240px`}
                textAlign={`left`}
                textOverflow={`ellipsis`}
                overflow={`hidden`}
                whiteSpace={`nowrap`}
              >
                정비항목입니다.
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-start`} margin={`0px 0px 0px 10px`}>
            <Text width={`auto`} margin={`0px 5px 0px 0px`} textAlign={`start`}>
              선택된 국토부 항목:
            </Text>
            <Wrapper
              width={`280px`}
              height={`40px`}
              border={`1px solid #c4c4c4`}
              radius={`4px`}
              dr={`row`}
              ju={`space-between`}
              padding={`0px 10px`}
            >
              <Text
                width={`240px`}
                textAlign={`left`}
                textOverflow={`ellipsis`}
                overflow={`hidden`}
                whiteSpace={`nowrap`}
              >
                국토부항목입니다.
              </Text>
              <Text color={`#d6263b`}>
                <AiFillMinusSquare />
              </Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
        <CommonButton
          type="button"
          kindOf={`white`}
          width={`260px`}
          height={`50px`}
          onClick={props.setModalOpen(!props.modalOpen)}
        >
          취소
        </CommonButton>
        <CommonButton
          type="button"
          width={`260px`}
          height={`50px`}
          onClick={console.log("save!")}
        >
          정비항목등록
        </CommonButton>
      </CommonButtonWrapper>
    </WholeWrapper>
  );
};

export default MolitSettingModal;
