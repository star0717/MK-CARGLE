import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React, { useState } from "react";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import {
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../styles/CommonComponents";
import { BsSearch } from "react-icons/bs";

const AdminManPartsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [partClass, setPartClass] = useState<any>();
  const [allPart, setAllPart] = useState<any>();
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

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
            <Wrapper>ddd</Wrapper>
            <Wrapper>
              <SearchInputWrapper
                width={`678px`}
                padding={`0px 5px`}
                dr={`row`}
                margin={`10px 0px 0px`}
                borderBottom={`1px solid #000`}
              >
                <form>
                <Wrapper width={`auto`}>
                  <SearchInput
                    type="text"
                    width={`632px`}
                    padding={`0px 5px 0px 5px`}
                    placeholder="찾고 싶은 부품을 입력하세요."
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //   onInputSearchHandler(e);
                    // }}
                    // onKeyUp={handleKeyUp}
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
                </form>
              </SearchInputWrapper>
              <TableWrapper margin={`10px 0px 30px`}>
                <TableHead>
                  <TableHeadLIST width={`200px`}>부품코드</TableHeadLIST>
                  <TableHeadLIST width={`200px`}>부품명</TableHeadLIST>
                  <TableHeadLIST width={`200px`}>국토부</TableHeadLIST>
                </TableHead>
                <TableRow>
                  <TableRowLIST width={`200px`}>부품코드</TableRowLIST>
                  <TableRowLIST width={`200px`}>부품명</TableRowLIST>
                  <TableRowLIST width={`200px`}>국토부</TableRowLIST>
                </TableRow>
              </TableWrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
