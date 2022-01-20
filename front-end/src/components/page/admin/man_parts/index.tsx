import { NextPage } from "next";
import { useResizeDetector } from "react-resize-detector";
import React, { useCallback, useEffect, useState } from "react";
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
  Checkbox,
  CheckInput,
  CheckMark,
  CommonSubTitle,
} from "../../../styles/CommonComponents";
import { BsSearch } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import PartsModal from "./partsModal";
import ReactModal from "react-modal";
import { PartClass, partClassList } from "../../../../constants/part.const";

import { _MainProps } from "../../../../configure/_props.entity";
import { useDispatch } from "react-redux";
import {
  _aDeleteAdminPartsMany,
  _aDeleteAdminPartsOne,
  _aGetAdminParts,
  _aGetAdminPartsClass,
} from "../../../../../store/action/user.action";
import {
  _iDeleteAdminPartsMany,
  _iDeleteAdminPartsOne,
  _iGetAdminParts,
  _iGetAdminPartsClass,
} from "../../../../../store/interfaces";
import { Part } from "../../../../models/part.entity";
import { _pAdminManParts } from "../../../../configure/_pProps.entity";
import PartsInfoModal from "./partsInfoModal";

const AdminManPartsPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 옵션
  const [searchText, setSearchText] = useState<string>(""); // 검색 텍스트
  const [selectClass, setSelectClass] = useState<string>("all"); // 선택한 분류
  const [partList, setPartList] = useState<Part[]>(props.data.docs); // 부품 선택 리스트
  const [reset, setReset] = useState<number>(0); // 리스트 재출력 여부
  const [checkedList, setCheckedList] = useState([]); // 체크한 리스트
  const [clickDoc, setClickDoc] = useState<Part>(); // 선택한 부품 항목 데이터

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
    const newList: Part[] = [];
    if (!searchText) {
      setReset(reset + 1);
    }
    partList.forEach((part: Part) => {
      if (
        part.code.includes(searchText) ||
        part.name.includes(searchText) ||
        part.tsCode?.includes(searchText)
      ) {
        newList.push(part);
      }
      return setPartList(newList);
    });
  };

  /**
   * 부품 분류 선택 handler -> 리스트 출력
   */
  useEffect(() => {
    setCheckedList([]);
    if (selectClass === "all") {
      dispatch(_aGetAdminParts()).then((res: _iGetAdminParts) => {
        setPartList(res.payload.docs);
      });
    } else {
      dispatch(_aGetAdminPartsClass(selectClass)).then(
        (res: _iGetAdminPartsClass) => {
          setPartList(res.payload.docs);
        }
      );
    }
  }, [selectClass, reset, modalOpen]);

  /**
   * 전체 선택 기능
   */
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray: string[] = [];
        partList.forEach((list: Part) => checkedListArray.push(list._id));
        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [partList]
  );

  /**
   * 개별 선택 기능
   */
  const onCheckedElement = useCallback(
    (checked: boolean, list: Part) => {
      if (checked) {
        setCheckedList([...checkedList, list._id]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== list._id));
      }
    },
    [checkedList]
  );
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

  const ARCModalProps: _pAdminManParts = {
    ...props,
    setModalOpen,
    clickDoc,
    setClickDoc,
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
        <RsWrapper>
          <CommonTitleWrapper>
            <CommonTitle>부품관리</CommonTitle>
            <CommonSubTitle></CommonSubTitle>
          </CommonTitleWrapper>
          <Wrapper padding={`50px 0px 0px`}>
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
                    placeholder="찾고싶은 부품명을 입력하세요."
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
                부품추가
              </SmallButton>
              <SmallButton
                kindOf={`cancle`}
                width={`150px`}
                fontSize={`16px`}
                onClick={() => {
                  if (checkedList.length === 0) {
                    return alert("항목을 선택해주세요.");
                  }
                  if (window.confirm("삭제하시겠습니까?")) {
                    if (checkedList.length === 1) {
                      dispatch(_aDeleteAdminPartsOne(checkedList[0])).then(
                        (res: _iDeleteAdminPartsOne) => {
                          alert("삭제되었습니다.");
                          setReset(reset + 1);
                        },
                        (err) => {
                          alert("삭제에 실패했습니다.");
                        }
                      );
                    } else {
                      dispatch(_aDeleteAdminPartsMany(checkedList)).then(
                        (res: _iDeleteAdminPartsMany) => {
                          alert("삭제되었습니다.");
                          setReset(reset + 1);
                        },
                        (err) => {
                          alert("삭제에 실패했습니다.");
                        }
                      );
                    }
                  } else {
                    return false;
                  }
                }}
              >
                선택삭제
              </SmallButton>
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} padding={`40px 0px 50px`} ju={`space-between`}>
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
                      <Checkbox kindOf={`TableCheckBox`}>
                        <CheckInput
                          type="checkbox"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onCheckedAll(e.target.checked)
                          }
                          checked={
                            checkedList.length === 0
                              ? false
                              : checkedList.length === partList.length
                              ? true
                              : false
                          }
                        />
                        <CheckMark></CheckMark>
                      </Checkbox>
                    </TableHeadLIST>
                    <TableHeadLIST width={`20%`}>부품코드</TableHeadLIST>
                    <TableHeadLIST width={`35%`}>부품명</TableHeadLIST>
                    <TableHeadLIST width={`35%`}>국토부</TableHeadLIST>
                  </TableHead>
                </Wrapper>
                <Wrapper overflow={`auto`} height={`450px`} ju={`flex-start`}>
                  <TableBody>
                    {partList.map((list: Part) => (
                      <TableRow
                        key={list._id}
                        onClick={() => {
                          setClickDoc(list);
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
                        <TableRowLIST width={`20%`}>{list.code}</TableRowLIST>
                        <TableRowLIST width={`35%`}>{list.name}</TableRowLIST>
                        <TableRowLIST width={`35%`}>{list.tsCode}</TableRowLIST>
                      </TableRow>
                    ))}
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
                <PartsInfoModal {...ARCModalProps} />
              )}
            </Wrapper>
          </ReactModal>
        </Wrapper>
      </WholeWrapper>
    </BodyWrapper>
  );
};

export default AdminManPartsPage;
