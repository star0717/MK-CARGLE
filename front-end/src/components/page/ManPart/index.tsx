import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
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
import { _MainProps } from "src/configure/_props.entity";
import { Part } from "src/models/part.entity";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { partClassList, PartClass, getTsParts } from "src/constants/part.const";
import { strSort } from "src/modules/commonModule";

const ManPartsPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const [searchText, setSearchText] = useState<string>("");
  const [selectClass, setSelectClass] = useState<string>("all");
  const [partList, setPartList] = useState<Part[]>(props.data.docs);
  const [reset, setReset] = useState<number>(0); // 리스트 재출력 여부

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
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
    const newList: Part[] = [];
    props.data.docs.forEach((part: Part) => {
      if (
        part.code.includes(searchText) ||
        part.name.includes(searchText) ||
        part.tsCode?.includes(searchText)
      ) {
        newList.push(part);
      }
    });
    setPartList(newList);
  };

  /**
   * 부품 분류 선택 handler -> 리스트 출력
   */
  useEffect(() => {
    // if (selectClass === "all") {
    //   setPartList(props.data.docs);
    // } else {
    //   const newList: Part[] = [];
    //   props.data.docs.forEach((part: Part) => {
    //     if (part.label === selectClass) {
    //       newList.push(part);
    //     }
    //   });
    //   setPartList(newList);
    // }
    switch (selectClass) {
      case "all":
        setPartList(props.data.docs);
        break;
      case "ETS":
        setPartList(getTsParts(props.data.docs));
        break;
      default:
        const newList: Part[] = [];
        props.data.docs.forEach((part: Part) => {
          if (part.label === selectClass) {
            newList.push(part);
          }
        });
        setPartList(newList);
        break;
    }
  }, [selectClass, reset]);

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <BodyWrapper>
      <WholeWrapper>
        <RsWrapper>
          <CommonTitleWrapper>
            <CommonTitle>부품관리</CommonTitle>
            <CommonSubTitle>
              어떤 부품을 많이 사용했는지 확인할 수 있어요
            </CommonSubTitle>
          </CommonTitleWrapper>
          <Wrapper al={`flex-start`}>
            <form onSubmit={onSearchFormHandler}>
              <SearchInputWrapper
                type="text"
                width={`578px`}
                padding={`0px 5px`}
                dr={`row`}
                borderBottom={`1px solid #000`}
              >
                <Wrapper width={`auto`}>
                  <SearchInput
                    width={`532px`}
                    padding={`0px 5px 0px 5px`}
                    placeholder="부품코드, 부품명 또는 국토부를 입력하세요."
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
                    <TableHeadLIST width={`100%`}>부품분류</TableHeadLIST>
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
                    {partClassList.map((item: PartClass) => (
                      <TableRow
                        key={item.label}
                        kindOf={
                          selectClass === item.label
                            ? `selectClass`
                            : `noSelectClass`
                        }
                        onClick={() => {
                          setSelectClass(item.label);
                        }}
                      >
                        <TableRowLIST width={`100%`}>
                          {item.description}
                        </TableRowLIST>
                      </TableRow>
                    ))}
                    <TableRow
                      kindOf={
                        selectClass === "ETS" ? `selectClass` : `noSelectClass`
                      }
                    >
                      <TableRowLIST
                        width={`100%`}
                        onClick={() => {
                          setSelectClass("ETS");
                        }}
                      >
                        국토부
                      </TableRowLIST>
                    </TableRow>
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>
            {/* 상세정보 */}
            <Wrapper width={`74%`}>
              <TableWrapper overflow={`auto`}>
                <Wrapper isSticky={true}>
                  <TableHead radius={`8px 8px 0px 0px`}>
                    <TableHeadLIST width={`33%`}>부품코드</TableHeadLIST>
                    <TableHeadLIST width={`33%`}>부품명</TableHeadLIST>
                    <TableHeadLIST width={`34%`}>국토부</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    {partList.length > 0 ? (
                      strSort(partList, 1, "name").map((list: Part) => (
                        <TableRow key={list._id} kindOf={`noHover`}>
                          <TableRowLIST width={`33%`}>{list.code}</TableRowLIST>
                          <TableRowLIST width={`33%`}>{list.name}</TableRowLIST>
                          <TableRowLIST width={`34%`}>
                            {list.tsCode}
                          </TableRowLIST>
                        </TableRow>
                      ))
                    ) : (
                      <Wrapper minHeight={`445px`}>
                        <Text fontSize={`48px`} color={`#c4c4c4`}>
                          <BsEmojiFrownFill />
                        </Text>
                        <Text color={`#c4c4c4`}>부품이 없습니다.</Text>
                      </Wrapper>
                    )}
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default ManPartsPage;
