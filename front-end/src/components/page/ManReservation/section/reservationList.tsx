import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import AddReservation from "./addReservationModal";
import {
  CommonSubTitle,
  CommonTitle,
  CommonTitleWrapper,
  RsWrapper,
  SearchInputWrapper,
  WholeWrapper,
  Wrapper,
  SearchInput,
  IconButton,
  Text,
  SmallButton,
  TableWrapper,
  TableHead,
  TableHeadLIST,
  Checkbox,
  CheckInput,
  CheckMark,
  TableBody,
  CloseButton,
  CommonButton,
} from "src/components/styles/CommonComponents";
import Modal from "react-modal";
import { _MainProps } from "src/configure/_props.entity";
import { BsSearch } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import EditReservation from "./editReservationModal";
import { PagenationSection } from "src/components/common/sections";
import { Agency } from "src/models/agency.entity";

const ManReservationPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");
  const [checkedList, setCheckedList] = useState<string>("");
  const [clickDoc, setClickDoc] = useState<string>("");
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  //   /**
  //  * 전체 선택 기능
  //  */
  //    const onCheckedAll = useCallback(
  //     (checked) => {
  //       if (checked) {
  //         const checkedListArray: string[] = [];
  //         props.findResult.docs.forEach((list: Agency) =>
  //           checkedListArray.push(list._id)
  //         );
  //         setCheckedList(checkedListArray);
  //       } else {
  //         setCheckedList([]);
  //       }
  //     },
  //     [props.findResult.docs]
  //   );

  //   /**
  //    * 개별 선택 기능
  //    */
  //   const onCheckedElement = useCallback(
  //     (checked: boolean, list: Agency) => {
  //       if (checked) {
  //         setCheckedList([...checkedList, list._id]);
  //       } else {
  //         setCheckedList(checkedList.filter((el) => el !== list._id));
  //       }
  //     },
  //     [checkedList]
  //   );

  const closeModal = () => {
    setModalOpen(false);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);
  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  const ModalProps: any = {
    ...props,
    setModalOpen,
    clickDoc,
    setClickDoc,
    style: { height: "800px", width: "500px" },
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>예약관리</CommonTitle>
          <CommonSubTitle>
            예약을 등록하고 일정을 관리할 수 있어요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`}>
          <form>
            <SearchInputWrapper
              type="text"
              placeholder="찾고싶은 예약의 차량번호 또는 휴대전화번호를 입력하세요."
              dr={`row`}
              width={`678px`}
              padding={`0px 5px`}
              margin={`10px 0px 0px`}
              borderBottom={`1px solid #000`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`632px`}
                  type="text"
                  placeholder="찾고싶은 예약의 차량번호 또는 휴대전화번호를 입력하세요."
                />
              </Wrapper>
              <Wrapper>
                <Text>
                  <IconButton>
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </SearchInputWrapper>
          </form>
          <SmallButton>캘린더</SmallButton>
          <SmallButton>선택삭제</SmallButton>
          <SmallButton>+신규예약등록</SmallButton>
        </Wrapper>
        <Wrapper margin={`10px 0px 30px`}>
          <TableWrapper>
            <TableHead>
              <TableHeadLIST
                width={`5%`}
                onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox kindOf={`TableCheckBox`}>
                  <CheckInput
                    type="checkbox"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //   onCheckedAll(e.target.checked);
                    // }}
                    // checked={
                    //   checkedList.length === 0
                    //     ? false
                    //     : checkedList.length === props.findResult.docs.length
                    //     ? true
                    //     : false
                    // }
                  />
                  <CheckMark></CheckMark>
                </Checkbox>
              </TableHeadLIST>
              <TableHeadLIST width={`20%`}>예약접수일자</TableHeadLIST>
              <TableHeadLIST width={`24%`}>정비희망일자</TableHeadLIST>
              <TableHeadLIST width={`18%`}>차량번호</TableHeadLIST>
              <TableHeadLIST width={`25%`}>전화번호</TableHeadLIST>
              <TableHeadLIST width={`8%`}>예약상태</TableHeadLIST>
            </TableHead>
            <TableBody>
              {/* {props.findResult.totalDocs > 0 ? (
                  props.findResult.docs.map((list: Agency) => (
                    <TableRow
                      key={list._id}
                      onClick={() => {
                        setClickDoc(list);
                        setModalOption("edit");
                        setModalOpen(true);
                      }}
                    >
                      <TableRowLIST
                        width={`10%`}
                        onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                          e.stopPropagation()
                        }
                      >
                        <Checkbox kindOf={`TableCheckBox`}>
                          <CheckInput
                            type="checkbox"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => onCheckedElement(e.target.checked, list)}
                            checked={
                              checkedList.includes(list._id) ? true : false
                            }
                          />
                          <CheckMark></CheckMark>
                        </Checkbox>
                      </TableRowLIST>
                      <TableRowLIST width={`15%`}>{list.name}</TableRowLIST>
                      <TableRowLIST width={`15%`}>{list.hpNum}</TableRowLIST>
                      <TableRowLIST width={`22%`}>
                        <ToolTipWrapper>
                          <ToolTip>{list.address1}</ToolTip>
                        </ToolTipWrapper>
                      </TableRowLIST>
                      <TableRowLIST width={`15%`}>{list.manager}</TableRowLIST>
                      <TableRowLIST width={`23%`}>
                        <ToolTipWrapper>
                          <ToolTip>
                            {list.memo}
                            <ToolTipText>{list.memo}</ToolTipText>
                          </ToolTip>
                        </ToolTipWrapper>
                      </TableRowLIST>
                    </TableRow>
                  ))
                ) : (
                  <Wrapper minHeight={`445px`}>
                    <Text fontSize={`48px`} color={`#c4c4c4`}>
                      <BsEmojiFrownFill />
                    </Text>
                    <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
                  </Wrapper>
                )} */}
            </TableBody>
          </TableWrapper>
          <Wrapper dr={`row`}>
            <CommonButton
              onClick={() => {
                setModalOption("add");
                setModalOpen(true);
              }}
            >
              addModal
            </CommonButton>
            <CommonButton
              onClick={() => {
                setModalOption("edit");
                setModalOpen(true);
              }}
            >
              editModal
            </CommonButton>
          </Wrapper>
          {/* <PagenationSection {...props} /> */}
        </Wrapper>
      </RsWrapper>
      <Modal
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
          {/* <DaumPostcode
              onComplete={addressHandler}
              style={{ height: "500px" }}
            /> */}
        </Wrapper>
        {modalOption === "add" ? (
          <AddReservation {...ModalProps} />
        ) : (
          <EditReservation {...ModalProps} />
        )}
      </Modal>
    </WholeWrapper>
  );
};

export default ManReservationPage;
