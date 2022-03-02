import React from "react";
import { NextPage } from "next";
import {
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
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
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { UseLink } from "src/configure/router.entity";
import { MainStatus } from "src/constants/maintenance.const";
import { BsEmojiFrownFill, BsSearch } from "react-icons/bs";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { partClassList, PartClass } from "src/constants/part.const";
import { Part } from "src/models/part.entity";

const MolitSettingModal: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
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
  console.log(props);
  return (
    <WholeWrapper>
      <CommonSmallTitle>국토부 정비 이력 설정</CommonSmallTitle>
      <Wrapper
        dr={`row`}
        padding={`20px`}
        width={`678px`}
        border={`1px solid #ccc`}
        margin={`20px 0px`}
      >
        <Wrapper
          dr={`row`}
          padding={`10px 0px 0px 0px`}
          ju={`flex-start`}
          margin={`0px 10px 0px`}
        >
          <Text width={`auto`} margin={`0px 10px 0px 0px`} textAlign={`start`}>
            선택된 정비 항목:
          </Text>
          <TextInput2 type="text" width={`164px`} />
        </Wrapper>
        <Wrapper
          dr={`row`}
          padding={`10px 0px 0px 0px`}
          ju={`flex-start`}
          margin={`0px 0px 0px 10px`}
        >
          <Text width={`auto`} margin={`0px 5px 0px 0px`} textAlign={`start`}>
            선택된 국토부 항목:
          </Text>
          <TextInput2 type="text" width={`164px`} />
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <form>
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
      <Wrapper dr={`row`} padding={`40px 40px 0px`} ju={`space-between`}>
        {/* 부품분류 */}
        <Wrapper width={`26%`}>
          <TableWrapper minHeight={`260px`} overflow={`auto`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST width={`100%`}>국토부 분류</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`260px`} ju={`flex-start`}>
              <TableBody minHeight={`260px`}>
                <TableRow>
                  <TableRowLIST width={`100%`}>국토부 분류입니다</TableRowLIST>
                </TableRow>
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
        {/* 상세정보 */}
        <Wrapper width={`72%`}>
          <TableWrapper minHeight={`260px`} overflow={`auto`}>
            <Wrapper isSticky={true}>
              <TableHead radius={`8px 8px 0px 0px`}>
                <TableHeadLIST width={`45%`}>정비명</TableHeadLIST>
                <TableHeadLIST width={`45%`}>코드</TableHeadLIST>
                <TableHeadLIST width={`10%`}>선택</TableHeadLIST>
              </TableHead>
            </Wrapper>
            <Wrapper overflow={`auto`} height={`260px`} ju={`flex-start`}>
              <TableBody minHeight={`260px`}>
                <TableRow kindOf={`noHover`}>
                  <TableRowLIST width={`45%`}>정비명</TableRowLIST>
                  <TableRowLIST width={`45%`}>코드</TableRowLIST>
                  <TableRowLIST width={`10%`}>선택</TableRowLIST>
                </TableRow>
              </TableBody>
            </Wrapper>
          </TableWrapper>
        </Wrapper>
      </Wrapper>
      <CommonButtonWrapper ju={`center`} padding={`30px 30px`}>
        <CommonButton
          type="button"
          kindOf={`white`}
          width={`260px`}
          height={`50px`}
        >
          취소
        </CommonButton>
        <CommonButton type="button" width={`260px`} height={`50px`}>
          정비항목등록
        </CommonButton>
      </CommonButtonWrapper>
    </WholeWrapper>
  );
};

export default MolitSettingModal;
