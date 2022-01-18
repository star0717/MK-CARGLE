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
import PartsModal from "./parts_Modal";
import ReactModal from "react-modal";
import { PartClass, partClassList } from "../../../../constants/model.const";

const AdminManPartsPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 옵션
  const [searchText, setSearchText] = useState<string>(""); // 검색 텍스트
  const [selectClass, setSelectClass] = useState<string>("all"); // 선택한 분류
  const [partClass, setPartClass] = useState<PartClass[]>(partClassList); // 분류 리스트
  const [partList, setPartList] = useState<any>(props.data); // 부품 리스트

  const [checkedList, setCheckedList] = useState([]); // 체크한 리스트
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
                    <TableHeadLIST width={`100%`}>부품분류</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    <TableRow>
                      <TableRowLIST width={`100%`}>전체보기</TableRowLIST>
                    </TableRow>
                    {partClass.map((item: PartClass) => (
                      <TableRow
                        key={item.label}
                        color={selectClass === item.label ? `white` : `black`}
                        bgColor={selectClass === item.label ? `black` : `white`}
                        onClick={() => {
                          setSelectClass(item.label);
                        }}
                      >
                        <TableRowLIST width={`100%`}>
                          {item.description}
                        </TableRowLIST>
                      </TableRow>
                    ))}
                  </TableBody>
                </Wrapper>
              </TableWrapper>
            </Wrapper>
            {/* 상세정보 */}
            <Wrapper width={`74%`}>
              <TableWrapper overflow={`auto`}>
                <Wrapper isSticky={true}>
                  <TableHead radius={`8px 8px 0px 0px`}>
                    <TableHeadLIST
                      width={`10%`}
                      onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                        e.stopPropagation()
                      }
                    >
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
                    {/* <TableRow
                      onClick={() => {
                        setModalOption("editPart");
                        setModalOpen(true);
                      }}
                    >
                      <TableRowLIST
                        width={`10%`}
                        onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                          e.stopPropagation()
                        }
                      >
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
                    </TableRow> */}
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
              {modalOption === "addPart" ? (
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
