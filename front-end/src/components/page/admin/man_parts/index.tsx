import { NextPage } from "next";
import Modal from "react-modal";
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
  TableHead,
  TableHeadLIST,
  TableRow,
  SmallButton,
  TableRowLIST,
  CloseButton,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  CommonButton,
  TableBody,
  TableHeadRow,
  Table,
} from "../../../styles/CommonComponents";
import { BsPlusSquareFill, BsSearch } from "react-icons/bs";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import PartsModal from "./parts_Modal";

const AdminManPartsPage: NextPage<any> = (props) => {
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
        <CommonButton
          onClick={() => {
            setModalOpen(true);
          }}
          kindOf={`circleWhite`}
        >
          hyeok modal
        </CommonButton>
        <RsWrapper>
          <Wrapper dr={`row`} padding={`40px 0px 0px`} ju={`space-between`}>
            {/* 부품분류 */}
            <Wrapper
              width={`300px`}
              height={`600px`}
              ju={`flex-start`}
              bgColor={`#fff`}
              overflow={`auto`}
              radius={`5px 5px 0px 0px`}
              border={`1px solid #c4c4c4`}
            >
              <Wrapper
                bgColor={`#343a40`}
                color={`#fff`}
                height={`45px`}
                radius={`5px 5px 0px 0px`}
              >
                <Text>부품분류</Text>
              </Wrapper>

              {/* default */}
              <Wrapper padding={`10px`}>
                <Wrapper
                  height={`45px`}
                  bgColor={`#fff`}
                  border={`1px solid #c4c4c4`}
                  dr={`row`}
                  radius={`5px`}
                  padding={`0px 20px`}
                  margin={`0px 0px 10px`}
                >
                  <Wrapper width={`22px`} color={`#51b351`} fontSize={`22px`}>
                    <AiFillPlusSquare />
                  </Wrapper>
                  <Wrapper>
                    <Text>전체보기</Text>
                  </Wrapper>
                </Wrapper>

                {/* focus */}
                <Wrapper
                  height={`45px`}
                  bgColor={`#eee`}
                  border={`1px solid #c4c4c4`}
                  dr={`row`}
                  radius={`5px`}
                  padding={`0px 20px`}
                  margin={`0px 0px 10px`}
                >
                  <Wrapper width={`22px`} fontSize={`22px`} color={`#d6263b`}>
                    <AiFillMinusSquare />
                  </Wrapper>
                  <Wrapper>
                    <Text>부품명(01)</Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            {/* 상세정보 */}
            <Wrapper>
              <Wrapper
                width={`880px`}
                height={`150px`}
                ju={`flex-start`}
                bgColor={`#fff`}
                overflow={`auto`}
                radius={`5px 5px 0px 0px`}
                border={`1px solid #c4c4c4`}
              >
                <Wrapper>
                  <Wrapper
                    bgColor={`#343a40`}
                    color={`#fff`}
                    minHeight={`45px`}
                    radius={`5px 5px 0px 0px`}
                  >
                    <Text>상세정보</Text>
                  </Wrapper>
                  <Wrapper minHeight={`80px`}>
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
                </Wrapper>
              </Wrapper>
              <TableWrapper
                margin={`0px`}
                radius={`0px`}
                height={`450px`}
                width={`880px`}
              >
                <Table>
                  <TableHead width={`880px`}>
                    <TableHeadRow>
                      <TableHeadLIST width={`293px`}>부품코드</TableHeadLIST>
                      <TableHeadLIST width={`294px`}>부품명</TableHeadLIST>
                      <TableHeadLIST width={`293px`}>국토부</TableHeadLIST>
                    </TableHeadRow>
                  </TableHead>
                  <TableBody overflowY={`auto`} height={`405px`}>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>

                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                    <TableRow>
                      <TableRowLIST width={`293px`}>부품코드</TableRowLIST>
                      <TableRowLIST width={`293px`}>부품명</TableRowLIST>
                      <TableRowLIST width={`293px`}>국토부</TableRowLIST>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableWrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
        <Wrapper>
          <Modal
            isOpen={modalOpen}
            style={{
              overlay: {
                position: "fixed",
                zIndex: 1020,
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
                width: "800px",
                height: "600px",
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
              <PartsModal {...ARCModalProps} />
            </Wrapper>
          </Modal>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
