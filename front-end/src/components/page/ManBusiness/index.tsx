import React from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { PagenationSection } from "../../common/sections";
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
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { _MainProps } from "src/configure/_props.entity";

const ManPartsPage: NextPage<_MainProps> = (props) => {
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
    <BodyWrapper>
      <WholeWrapper>
        <RsWrapper>
          <CommonTitleWrapper>
            <CommonTitle>거래처관리</CommonTitle>
            <CommonSubTitle>
              거래처 정보를 저장하고 관리할 수 있어요.
            </CommonSubTitle>
          </CommonTitleWrapper>
          <Wrapper>
            <form>
              <SearchInputWrapper
                type="text"
                placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
                width={`678px`}
                padding={`0px 5px`}
                dr={`row`}
                margin={`10px 0px 0px`}
                borderBottom={`1px solid #000`}
              >
                <Wrapper width={`auto`}>
                  <SearchInput
                    width={`632px`}
                    padding={`0px 5px 0px 5px`}
                    placeholder="검색할 업체의 상호명 또는, 사업자등록번호를 입력하세요"
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
            </form>
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-end`} padding={`40px 0px 0px`}>
            <Wrapper width={`310px`} ju={`space-between`} dr={`row`}>
              <SmallButton width={`150px`} fontSize={`16px`} kindOf={`default`}>
                신규등록
              </SmallButton>
              <SmallButton width={`150px`} fontSize={`16px`} kindOf={`cancle`}>
                삭제하기
              </SmallButton>
            </Wrapper>
          </Wrapper>
          <TableWrapper margin={`50px 0px 0px`}>
            <TableHead>
              <TableHeadLIST width={`10%`}>
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput type="checkbox" />
                  <CheckMark></CheckMark>
                </Checkbox>
              </TableHeadLIST>
              <TableHeadLIST width={`15%`}>상호명</TableHeadLIST>
              <TableHeadLIST width={`15%`}>전화번호</TableHeadLIST>
              <TableHeadLIST width={`22%`}>주소</TableHeadLIST>
              <TableHeadLIST width={`15%`}>담당자명</TableHeadLIST>
              <TableHeadLIST width={`23%`}>메모</TableHeadLIST>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableRowLIST width={`10%`}>
                  <Checkbox kindOf={`TableCheckBox`}>
                    <CheckInput type="checkbox" />
                    <CheckMark></CheckMark>
                  </Checkbox>
                </TableRowLIST>
                <TableRowLIST width={`15%`}>상호명</TableRowLIST>
                <TableRowLIST width={`15%`}>전화번호</TableRowLIST>
                <TableRowLIST width={`22%`}>주소</TableRowLIST>
                <TableRowLIST width={`15%`}>담당자명</TableRowLIST>
                <TableRowLIST width={`23%`}>메모</TableRowLIST>
              </TableRow>
              <Wrapper minHeight={`445px`}>
                <Text fontSize={`48px`} color={`#c4c4c4`}>
                  <BsEmojiFrownFill />
                </Text>
                <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
              </Wrapper>
            </TableBody>
          </TableWrapper>
          {/* <PagenationSection {...props} /> */}
        </RsWrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default ManPartsPage;
