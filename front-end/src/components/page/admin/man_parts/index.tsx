import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React, { useEffect, useState } from "react";
import { BodyWrapper } from "../../../styles/LayoutComponents";
import {
  CommonTitle,
  CommonTitleWrapper,
  IconButton,
  RsWrapper,
  SearchInput,
  SearchInputWrapper,
  CloseButton,
  Text,
  WholeWrapper,
  Wrapper,
  CommonButton,
  SmallButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  TableBody,
  TableRow,
  TableRowLIST,
  CheckboxContainer,
  CheckBoxIcon,
  CheckBoxLine,
  HiddenCheckbox,
} from "../../../styles/CommonComponents";
import { BsCheckLg, BsSearch } from "react-icons/bs";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { RiCheckboxBlankLine } from "react-icons/ri";
import PartsModal from "./parts_Modal";
import { actionTypesUser } from "../../../../../store/interfaces";
import ReactModal from "react-modal";

const AdminManPartsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");
  const [partClass, setPartClass] = useState<any>();
  const [allPart, setAllPart] = useState<any>();
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
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
          <CommonTitle>부품관리</CommonTitle>
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
              <SmallButton
                kindOf={`default`}
                width={`150px`}
                fontSize={`16px`}
                onClick={() => {
                  setModalOption("addPart");
                  setModalOpen(true);
                }}
              >
                부품 추가하기
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
                      <IconButton
                        onClick={() => {
                          setModalOption("addClass");
                          setModalOpen(true);
                        }}
                      >
                        <AiFillPlusSquare />
                      </IconButton>
                      {/* 플러스 버튼은 여기까지랍니당 \^0^/ */}
                    </TableHeadLIST>
                    <TableHeadLIST width={`70%`}>부품분류</TableHeadLIST>
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
                      <TableRowLIST width={`70%`}>전체보기</TableRowLIST>
                    </TableRow>
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>
            {/* 상세정보 */}
            <Wrapper width={`74%`}>
              {/* <table>
                  <thead>
                    <tr>
                      <td width={`40px`}>
                        <Wrapper>
                          <Text fontSize={`24px`} margin={`4px 0px 0px`}>
                            <RiCheckboxBlankLine />
                          </Text>
                        </Wrapper>
                      </td>
                      <td width={`200px`}>부품코드</td>
                      <td width={`320px`}>부품명</td>
                      <td width={`320px`}>국토부</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width={` 40px`}>
                        <Wrapper color={`#314fa5`}>
                          <Text fontSize={`24px`} margin={`4px 0px 0px`}>
                            <RiCheckboxBlankLine />
                          </Text>
                        </Wrapper>
                      </td>
                      <td width={` 200px`}>부품코드</td>
                      <td width={` 320px`}>부품명</td>
                      <td width={` 320px`}>국토부</td>
                    </tr>
                    <tr>
                      <td width={` 40px`}>
                        <Wrapper color={`#314fa5`}>
                          <Text fontSize={`24px`} margin={`4px 0px 0px`}>
                            <RiCheckboxFill />
                          </Text>
                        </Wrapper>
                      </td>
                      <td width={` 200px`}>부품코드</td>
                      <td width={` 320px`}>부품명</td>
                      <td width={` 320px`}>국토부</td>
                    </tr>
                  </tbody>
                </table> */}
              <TableWrapper overflow={`auto`}>
                <Wrapper isSticky={true}>
                  <TableHead radius={`8px 8px 0px 0px`}>
                    <TableHeadLIST width={`10%`}>
                      {/* 체크박스 */}
                      <CheckboxContainer>
                        <CheckBoxLine>
                          <HiddenCheckbox type="checkbox" />
                          <CheckBoxIcon>
                            <BsCheckLg />
                          </CheckBoxIcon>
                        </CheckBoxLine>
                      </CheckboxContainer>
                      {/*  */}
                    </TableHeadLIST>
                    <TableHeadLIST width={`20%`}>부품코드</TableHeadLIST>
                    <TableHeadLIST width={`35%`}>부품명</TableHeadLIST>
                    <TableHeadLIST width={`35%`}>국토부</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    <TableRow
                      onClick={() => {
                        setModalOption("editPart");
                        setModalOpen(true);
                      }}
                    >
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
                      <TableRowLIST width={`20%`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`35%`}>부품명</TableRowLIST>
                      <TableRowLIST width={`35%`}>국토부</TableRowLIST>
                    </TableRow>
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
        <Wrapper>
          <ReactModal
            isOpen={modalOpen}
            style={{
              overlay: {
                position: "fixed",
                zIndex: 9999,
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(71, 71, 71, 0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              content: {
                background: "white",
                width: "500px",
                height: "800px",
                maxWidth: "calc(100vw - 2rem)",
                maxHeight: "calc(100vh - 2rem)",
                overflowY: "auto",
                position: "relative",
                border: "1px solid #ccc",
                borderRadius: "0.3rem",
                boxShadow: "0px 10px 15px rgba(61,61,61,1)",
                inset: 0,
              },
            }}
          >
            <Wrapper fontSize={`28px`} al={`flex-end`}>
              <CloseButton onClick={closeModal}>
                <IoIosCloseCircle />
              </CloseButton>
              {modalOption === "addClass" ? (
                "클래스"
              ) : modalOption === "addPart" ? (
                <PartsModal {...ARCModalProps} />
              ) : (
                "수정"
              )}
            </Wrapper>
          </ReactModal>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
