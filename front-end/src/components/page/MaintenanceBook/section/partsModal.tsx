import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  IconButton,
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
  CommonSmallTitle,
} from "src/components/styles/CommonComponents";
import { Part } from "src/models/part.entity";
import { _pPartsSetProps } from "src/configure/_pProps.entity";
import { getTsParts, PartClass, partClassList } from "src/constants/part.const";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { MainWork } from "src/models/maintenance.entity";
import { MainPartsType } from "src/constants/maintenance.const";

const MtPartsModal: NextPage<_pPartsSetProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const [searchText, setSearchText] = useState<string>("");
  const [selectClass, setSelectClass] = useState<string>("all");
  const [partList, setPartList] = useState<Part[]>(props.data.allParts.docs);
  const [selectPart, setSelectPart] = useState<Part[]>([]);
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
    props.data.allParts.docs.forEach((part: Part) => {
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
    switch (selectClass) {
      case "all":
        setPartList(props.data.allParts.docs);
        break;
      case "ETS":
        setPartList(getTsParts(props.data.allParts.docs));
        break;
      default:
        const newList: Part[] = [];
        props.data.allParts.docs.forEach((part: Part) => {
          if (part.label === selectClass) {
            newList.push(part);
          }
        });
        setPartList(newList);
        break;
    }
  }, [selectClass, reset]);

  /**
   * 세트에 부품 추가
   * @returns
   */
  const addPartToSet = () => {
    if (selectPart.length === 0) {
      return alert("부품을 추가해주세요.");
    }
    const newList: MainWork[] = [];
    for (let i = 0; i < selectPart.length; i++) {
      for (let j = 0; j < props.workList?.length; j++) {
        if (selectPart[i].code === props.workList[j]?.code)
          return alert(`${selectPart[i].name}은 이미 추가된 부품입니다.`);
      }
      newList.push({
        name: selectPart[i].name,
        code: selectPart[i].code,
        tsCode: selectPart[i].tsCode,
        type: MainPartsType.A,
        price: 0,
        quantity: 0,
        wage: 0,
      });
    }
    props.setWorkList(props.workList.concat(newList));
    props.setModalOpen(false);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <CommonSmallTitle>부품조회</CommonSmallTitle>
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
        <Wrapper width={`20%`}>
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
        <Wrapper width={`53%`}>
          <TableWrapper overflow={`auto`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST width={`45%`}>부품명</TableHeadLIST>
                <TableHeadLIST width={`45%`}>국토부</TableHeadLIST>
                <TableHeadLIST width={`10%`}>추가</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
              <TableBody>
                {partList?.map((list: Part) => (
                  <TableRow key={list._id} kindOf={`noHover`}>
                    <TableRowLIST width={`45%`}>{list.name}</TableRowLIST>
                    <TableRowLIST width={`45%`}>{list.tsCode}</TableRowLIST>
                    <TableRowLIST width={`10%`}>
                      <IconButton
                        type="button"
                        color={`#51b351`}
                        bgColor={`inherit`}
                        shadow={`none`}
                        padding={`0px`}
                        ju={`flex-start`}
                        al={`center`}
                        onClick={() => {
                          if (selectPart.includes(list)) return false;
                          setSelectPart(selectPart.concat(list));
                        }}
                      >
                        <AiFillPlusSquare />
                      </IconButton>
                    </TableRowLIST>
                  </TableRow>
                ))}
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
        {/* 추가 리스트 */}
        <Wrapper width={`23%`}>
          <TableWrapper overflow={`auto`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST width={`20%`}></TableHeadLIST>
                <TableHeadLIST width={`80%`}>부품명</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
              <TableBody>
                {selectPart.length !== 0 ? (
                  selectPart?.map((part: Part) => (
                    <TableRow key={part._id} kindOf={`noHover`}>
                      <TableRowLIST width={`20%`}>
                        <IconButton
                          type="button"
                          color={`#d6263b`}
                          bgColor={`inherit`}
                          shadow={`none`}
                          padding={`0px`}
                          ju={`flex-start`}
                          al={`center`}
                          onClick={() => {
                            setSelectPart(
                              selectPart.filter(
                                (select) => select._id !== part._id
                              )
                            );
                          }}
                        >
                          <AiFillMinusSquare />
                        </IconButton>
                      </TableRowLIST>
                      <TableRowLIST width={`80%`}>{part.name}</TableRowLIST>
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
      <Wrapper>
        <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
          <CommonButton
            type="button"
            kindOf={`white`}
            width={`300px`}
            height={`50px`}
            onClick={() => {
              props.setModalOpen(false);
            }}
          >
            취소
          </CommonButton>
          <CommonButton
            type="button"
            width={`300px`}
            height={`50px`}
            onClick={addPartToSet}
          >
            저장
          </CommonButton>
        </CommonButtonWrapper>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MtPartsModal;
