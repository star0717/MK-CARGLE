import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";

import React, { useEffect, useState } from "react";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { BsSearch, BsCheckLg } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import {
  WholeWrapper,
  CommonTitleWrapper,
  CommonTitle,
  RsWrapper,
  Wrapper,
  SearchInputWrapper,
  SearchInput,
  IconButton,
  SmallButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRow,
  TableRowLIST,
  CheckboxContainer,
  CheckBoxLine,
  HiddenCheckbox,
  CheckBoxIcon,
  CommonButton,
  Text,
  CloseButton,
} from "../../../styles/CommonComponents";

const AdminMolitItemsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [partClass, setPartClass] = useState<any>();
  const [allPart, setAllPart] = useState<any>();
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  // useEffect(() => {
  //   modalOpen === true
  //     ? (document.body.style.overflow = "hidden")
  //     : (document.body.style.overflow = "unset");
  // }, [modalOpen]);

  // const ARCModalProps: any = {
  //   ...props,
  //   setModalOpen,
  //   style: { height: "500px" },
  // };
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
          <Wrapper dr={`row`} ju={`flex-end`} padding={`40px 0px 0px`}>
            <Wrapper width={`310px`} ju={`space-between`} dr={`row`}>
              <SmallButton kindOf={`default`} width={`150px`} fontSize={`16px`}>
                항목 추가하기
              </SmallButton>
              <SmallButton kindOf={`cancle`} width={`150px`} fontSize={`16px`}>
                선택삭제
              </SmallButton>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} padding={`40px 0px 0px`} ju={`space-between`}>
            {/* 부품분류 */}
            <Wrapper width={`24%`}>
              <TableWrapper>
                <Wrapper isSticky={true}>
                  <TableHead radius={`8px 8px 0px 0px`}>
                    <TableHeadLIST
                      width={`30%`}
                      color={`#51b351`}
                      fontSize={`24px`}
                    >
                      {/* 제 이름은 플러스 버튼이에요!! */}
                      <AiFillPlusSquare />
                      {/* 플러스 버튼은 여기까지랍니당 \^0^/ */}
                    </TableHeadLIST>
                    <TableHeadLIST width={`70%`}>작업분류</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    <TableRow>
                      <TableRowLIST
                        width={` 30%`}
                        color={`#d6263b`}
                        fontSize={`24px`}
                      >
                        <AiFillMinusSquare />
                      </TableRowLIST>
                      <TableRowLIST width={`70%`}>분류명입니다.</TableRowLIST>
                    </TableRow>
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>

            <Wrapper width={`74%`}>
              <TableWrapper overflow={`auto`}>
                <Wrapper isSticky={true}>
                  <TableHead radius={`8px 8px 0px 0px`}>
                    <TableHeadLIST width={`10%`}>
                      <CheckboxContainer>
                        <CheckBoxLine>
                          <HiddenCheckbox type="checkbox" />
                          <CheckBoxIcon>
                            <BsCheckLg />
                          </CheckBoxIcon>
                        </CheckBoxLine>
                      </CheckboxContainer>
                    </TableHeadLIST>
                    <TableHeadLIST width={`20%`}>분류</TableHeadLIST>
                    <TableHeadLIST width={`15%`}>코드</TableHeadLIST>
                    <TableHeadLIST width={`55%`}>작업내용</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    <TableRow>
                      <TableRowLIST width={`10%`}>
                        <CheckboxContainer>
                          <CheckBoxLine>
                            <HiddenCheckbox type="checkbox" />
                            <CheckBoxIcon>
                              <BsCheckLg />
                            </CheckBoxIcon>
                          </CheckBoxLine>
                        </CheckboxContainer>
                      </TableRowLIST>
                      <TableRowLIST width={`20%`}>차체(보디)(B)</TableRowLIST>
                      <TableRowLIST width={`15%`}>B01</TableRowLIST>
                      <TableRowLIST width={`55%`}>
                        전조등(헤드램프)(좌)(우)
                      </TableRowLIST>
                    </TableRow>
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
