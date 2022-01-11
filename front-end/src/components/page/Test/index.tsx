import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React, { useState } from "react";
import { BodyWrapper } from "../../styles/LayoutComponents";
import {
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  SmallButton,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../styles/CommonComponents";
import { BsSearch } from "react-icons/bs";
import { Checkbox } from "@mui/material";

const AdminManPartsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [searchText, setSearchText] = useState<string>("");
  const [selectClass, setSelectClass] = useState<string>("all");
  const [partClass, setPartClass] = useState<any>(props.data.class);
  const [partList, setPartList] = useState<any>(props.data.part);

  console.log(selectClass);
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const selectPart = () => {
    const newList: any[] = [];
    props.data.part.forEach((item: any) => {
      if (item.class === selectClass) {
        newList.push(item);
      }
    });
    // setPartList(newList);
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
          <Wrapper dr={`row`}>
            <Wrapper>
              <Wrapper
                dr={`row`}
                ju={`space-around`}
                bgColor={`gray`}
                onClick={() => {
                  setSelectClass("all");
                  setPartList(props.data.part);
                }}
              >
                <button>+</button>
                <Text>전체보기</Text>
              </Wrapper>
              {partClass.map((item: any, idx: number) => (
                <Wrapper
                  key={idx}
                  dr={`row`}
                  ju={`space-around`}
                  bgColor={`gray`}
                  onClick={() => {
                    setSelectClass(item.name);
                    selectPart();
                  }}
                >
                  <button>-</button>
                  {item.name}
                </Wrapper>
              ))}
            </Wrapper>
            <Wrapper>
              <Wrapper dr={`row`}>
                <form>
                  <SearchInputWrapper
                    width={`478px`}
                    padding={`0px 5px`}
                    dr={`row`}
                    margin={`10px 0px 0px`}
                    borderBottom={`1px solid #000`}
                  >
                    <Wrapper width={`auto`}>
                      <SearchInput
                        type="text"
                        width={`432px`}
                        padding={`0px 5px 0px 5px`}
                        placeholder="찾고 싶은 부품을 입력하세요."
                        value={searchText}
                        onChange={onInputSearchHandler}
                      />
                    </Wrapper>
                    <Wrapper width={`36px`} height={`46px`}>
                      <Text fontSize={`24px`}>
                        <IconButton
                          type="submit"
                          onClick={() => {
                            console.log("검색");
                          }}
                          shadow={`none`}
                        >
                          <BsSearch />
                        </IconButton>
                      </Text>
                    </Wrapper>
                  </SearchInputWrapper>
                </form>
                <Wrapper width={`200px`} dr={`row`}>
                  <SmallButton type="button" kindOf={`default`}>
                    추가
                  </SmallButton>
                  <SmallButton type="button" kindOf={`default`}>
                    삭제
                  </SmallButton>
                </Wrapper>
              </Wrapper>
              <TableWrapper margin={`10px 0px 30px`}>
                <TableHead>
                  <TableHeadLIST width={`20px`}>
                    <Checkbox />
                  </TableHeadLIST>
                  <TableHeadLIST width={`200px`}>부품코드</TableHeadLIST>
                  <TableHeadLIST width={`200px`}>부품명</TableHeadLIST>
                  <TableHeadLIST width={`200px`}>국토부</TableHeadLIST>
                </TableHead>
                {partList.map((item: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableHeadLIST width={`20px`}>
                      {/* <Checkbox /> */}
                    </TableHeadLIST>
                    <TableHeadLIST width={`200px`}>{item.code}</TableHeadLIST>
                    <TableHeadLIST width={`200px`}>{item.name}</TableHeadLIST>
                    <TableHeadLIST width={`200px`}>{item.molit}</TableHeadLIST>
                  </TableRow>
                ))}
              </TableWrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
