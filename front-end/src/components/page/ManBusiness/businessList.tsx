import React, { useEffect, useState, useCallback } from "react";
import { NextPage } from "next";
import Modal from "react-modal";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
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
  WholeWrapper,
  Wrapper,
  Text,
  ToolTipWrapper,
  ToolTip,
  ToolTipText,
  CloseButton,
  Combo,
} from "src/components/styles/CommonComponents";
import { BsSearch, BsEmojiFrownFill } from "react-icons/bs";
import { Agency } from "src/models/agency.entity";
import { PagenationSection } from "src/components/common/sections";
import { IoIosCloseCircle } from "react-icons/io";
import EditBusinessModal from "./editBusinessModal";
import AddBusinessModal from "./addBusinessModal";
import { useResizeDetector } from "react-resize-detector";
import { useDispatch } from "react-redux";
import {
  _aDeleteAgency,
  _aGetAgencies,
  _aPostAgenciesDeleteMany,
} from "store/action/user.action";
import { _iAgency, _iDeleteByUser } from "store/interfaces";
import { FindParameters } from "src/models/base.entity";

const ManBusinessList: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false); // modal 창 여부
  const [modalOption, setModalOption] = useState<string>(""); // modal 내용
  const [reset, setReset] = useState<number>(0); // 리스트 재출력 여부
  const [checkedList, setCheckedList] = useState<string[]>([]); // 체크한 리스트
  const [clickDoc, setClickDoc] = useState<Agency>(); // 선택한 부품 항목 데이터
  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 검색 input handler
   * @param e
   */
  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterValue(e.target.value);
  };

  /**
   * 검색 기능 handler
   * @param e
   */
  const onSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.findDocHandler(1);
  };

  /**
   * 검색 옵션 handler
   * @param e
   */
  const onSearchOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchOption(e.target.value);
  };

  /**
   * 부품 분류 선택 handler -> 리스트 출력
   */
  useEffect(() => {
    setCheckedList([]);
    const param: FindParameters = {
      take: 10,
      filterKey: props.searchOption,
      filterValue: props.filterValue,
      useRegSearch: true,
    };

    dispatch(_aGetAgencies(param)).then((res: any) => {
      props.setFindResult(res.payload);
    });
  }, [reset, modalOpen]);

  /**
   * 전체 선택 기능
   */
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray: string[] = [];
        props.findResult.docs.forEach((list: Agency) =>
          checkedListArray.push(list._id)
        );
        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [props.findResult.docs]
  );

  /**
   * 개별 선택 기능
   */
  const onCheckedElement = useCallback(
    (checked: boolean, list: Agency) => {
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
  const BusinessModalProps: any = {
    ...props,
    setModalOpen,
    clickDoc,
    setClickDoc,
    style: { height: "800px", width: "500px" },
  };
  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

  /**
   * modal 창 닫기 기능
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  // resize 변수 선언
  const { width, height, ref } = useResizeDetector();

  return (
    <WholeWrapper ref={ref}>
      <RsWrapper>
        <CommonTitleWrapper>
          <CommonTitle>거래처관리</CommonTitle>
          <CommonSubTitle>
            거래처 정보를 저장하고 관리할 수 있어요.
          </CommonSubTitle>
        </CommonTitleWrapper>
        <Wrapper dr={`row`} al={`flex-end`}>
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            height={`46px`}
            width={`150px`}
          >
            <option value="name">상호명 검색</option>
            <option value="manager">담당자명 검색</option>
          </Combo>
          <form onSubmit={onSearchHandler}>
            <SearchInputWrapper
              type="text"
              width={`578px`}
              padding={`0px 5px`}
              dr={`row`}
              margin={`10px 0px 0px`}
              borderBottom={`1px solid #000`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`532px`}
                  padding={`0px 5px 0px 5px`}
                  placeholder="검색할 업체의 상호명 또는, 담당자명을 입력하세요"
                  type="text"
                  value={props.filterValue}
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
          <Wrapper dr={`row`} ju={`flex-end`}>
            <Wrapper width={`310px`} ju={`space-between`} dr={`row`}>
              <SmallButton
                width={`150px`}
                fontSize={`16px`}
                kindOf={`default`}
                type="button"
                onClick={() => {
                  setModalOption("add");
                  setModalOpen(true);
                }}
              >
                신규등록
              </SmallButton>
              <SmallButton
                width={`150px`}
                fontSize={`16px`}
                kindOf={`cancle`}
                onClick={() => {
                  if (checkedList.length === 0) {
                    return alert("항목을 선택해주세요.");
                  }
                  if (window.confirm("삭제하시겠습니까?")) {
                    if (checkedList.length === 1) {
                      dispatch(_aDeleteAgency(checkedList[0])).then(
                        (res: _iDeleteByUser) => {
                          alert("삭제되었습니다.");
                          setReset(reset + 1);
                        },
                        (err) => {
                          alert("삭제에 실패했습니다.");
                        }
                      );
                    } else {
                      dispatch(_aPostAgenciesDeleteMany(checkedList)).then(
                        (res: _iDeleteByUser) => {
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
                삭제하기
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <TableWrapper margin={`50px 0px 0px`}>
          <TableHead>
            <TableHeadLIST
              width={`10%`}
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                e.stopPropagation();
              }}
            >
              <Checkbox kindOf={`TableCheckBox`}>
                <CheckInput
                  type="checkbox"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onCheckedAll(e.target.checked);
                  }}
                  checked={
                    checkedList.length === 0
                      ? false
                      : checkedList.length === props.findResult.docs.length
                      ? true
                      : false
                  }
                />
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
            {props.findResult.totalDocs > 0 ? (
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onCheckedElement(e.target.checked, list)
                        }
                        checked={checkedList.includes(list._id) ? true : false}
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
            )}
          </TableBody>
        </TableWrapper>
        <PagenationSection {...props} />
      </RsWrapper>
      <Wrapper>
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
          </Wrapper>
          {modalOption === "edit" ? (
            <EditBusinessModal {...BusinessModalProps} />
          ) : (
            <AddBusinessModal {...BusinessModalProps} />
          )}
        </Modal>
      </Wrapper>
    </WholeWrapper>
  );
};

export default ManBusinessList;
