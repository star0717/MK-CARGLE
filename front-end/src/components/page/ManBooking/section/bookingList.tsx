import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  CloseButton,
  ColorSpan,
  Combo,
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
  TextInput2,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { GoPrimitiveDot } from "react-icons/go";
import {
  BookingState,
  bookingStateColor,
  bookingStateInput,
  bookingStateList,
  bookingStateName,
} from "src/constants/booking.const";
import { Booking } from "src/models/booking.entity";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import { BsSearch } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { PagenationSection } from "src/components/common/sections";
import Modal from "react-modal";
import {
  _pBookingModalProps,
  _pBookingProps,
} from "src/configure/_pProps.entity";
import {
  _aDeleteBookingMany,
  _aDeleteBookingOne,
  _aGetTimeTableId,
} from "store/action/user.action";
import { _iDeleteByUser, _iTimeTableOne } from "store/interfaces";
import RejectBookingModal from "./rejectBookingModal";
import AddBookingModal from "./addBookingModal";
import EditBookingModal from "./editBookingModal";
import { TimeTable } from "src/models/timetable.entity";

const BookingList: NextPage<_pBookingProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const router = useRouter();
  const dispatch = useDispatch();

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>("");
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [clickDoc, setClickDoc] = useState<Booking>(null);
  const [bookingList, setBookingList] = useState<Booking[]>(
    props.findResult.docs
  );
  const [timeTable, setTimeTable] = useState<TimeTable>(null);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  useEffect(() => {
    setBookingList(props.findResult.docs);
  }, [props.findResult]);

  /**
   * 전체 선택 기능
   */
  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray: string[] = [];
        props.findResult.docs.forEach((list: Booking) =>
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
    (checked: boolean, list: Booking) => {
      if (checked) {
        setCheckedList([...checkedList, list._id]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== list._id));
      }
    },
    [checkedList]
  );

  const closeModal = () => {
    setModalOpen(false);
  };

  // modal 창 팝업 시 뒤에 배경 scroll 막기
  useEffect(() => {
    modalOpen === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [modalOpen]);

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
   * 검색 input handler
   * @param e
   */
  const onInputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterValue(e.target.value);
  };

  /**
   * 리스트 삭제 handler
   * @returns
   */
  const onDeleteList = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      if (checkedList.length === 1) {
        await dispatch(_aDeleteBookingOne(checkedList[0])).then(
          (res: _iDeleteByUser) => {
            alert("삭제되었습니다.");
            props.setReset(props.reset + 1);
          },
          (err) => {
            alert("삭제 에러");
          }
        );
      } else {
        await dispatch(_aDeleteBookingMany(checkedList)).then(
          (res: _iDeleteByUser) => {
            alert("삭제되었습니다.");
            props.setReset(props.reset + 1);
          },
          (err) => {
            alert("삭제 에러");
          }
        );
      }
      setCheckedList([]);
    } else {
      return false;
    }
  };

  /**
   * 신규 예약 등록
   */
  const onAddBooking = async () => {
    await dispatch(_aGetTimeTableId(props.tokenValue.cID)).then(
      (res: _iTimeTableOne) => {
        if (!res.payload) return alert("타임테이블 조회 에러");
        console.log(res.payload);
      },
      (err) => {
        if (err) return alert("타임테이블 조회 에러");
      }
    );
    // setModalOption("add");
    // setModalOpen(true);
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const bookingModalProps: _pBookingModalProps = {
    ...props,
    setModalOpen,
    setModalOption,
    clickDoc,
    setClickDoc,
    style: { height: "800px" },
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
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          al={`flex-end`}
          padding={`40px 0px 0px`}
        >
          <Combo
            value={props.searchOption}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchOptionHandler(e);
            }}
            height={`46px`}
            width={`150px`}
          >
            <option value="regNumber">차량번호 검색</option>
            <option value="phoneNumber">전화번호 검색</option>
          </Combo>
          <form onSubmit={onSearchHandler}>
            <SearchInputWrapper
              dr={`row`}
              width={`578px`}
              padding={`0px 5px`}
              margin={`10px 0px 0px`}
              borderBottom={`1px solid #000`}
            >
              <Wrapper width={`auto`}>
                <SearchInput
                  width={`532px`}
                  type="text"
                  placeholder={
                    props.searchOption === "regNumber"
                      ? `검색할 차량번호를 입력하세요.`
                      : `검색할 전화번호를 입력하세요.`
                  }
                  value={props.filterValue}
                  onChange={onInputSearchHandler}
                />
              </Wrapper>
              <Wrapper>
                <Text>
                  <IconButton type="submit" shadow={`none`}>
                    <BsSearch />
                  </IconButton>
                </Text>
              </Wrapper>
            </SearchInputWrapper>
          </form>

          <Wrapper dr={`row`} ju={`flex-end`} padding={`40px 0px 0px`}>
            <Wrapper width={`310px`} ju={`space-between`} dr={`row`}>
              <SmallButton
                type="button"
                width={`150px`}
                fontSize={`16px`}
                kindOf={`cancle`}
                onClick={onDeleteList}
              >
                선택삭제
              </SmallButton>
              <SmallButton
                type="button"
                width={`150px`}
                fontSize={`16px`}
                kindOf={`default`}
                onClick={onAddBooking}
              >
                +신규예약등록
              </SmallButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-between`} padding={`50px 0px 0px 10px`}>
          <Wrapper dr={`row`} ju={`space-between`} width={`718px`}>
            <Wrapper dr={`row`} width={`auto`}>
              <Wrapper al={`flex-end`} width={`120px`}>
                <Text>정비희망일시</Text>
              </Wrapper>
              <Wrapper ju={`flex-end`} dr={`row`}>
                <TextInput2
                  type="date"
                  width={`220px`}
                  value={
                    props.searchList.mainHopeDate
                      ? dayjs(props.searchList.mainHopeDate).format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.setSearchList({
                      ...props.searchList,
                      mainHopeDate: e.target.value,
                    });
                    props.findDocHandler(1);
                    props.setReset(props.reset + 1);
                  }}
                />
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} width={`auto`}>
              <Wrapper al={`flex-end`} width={`80px`}>
                <Text>예약상태</Text>
              </Wrapper>
              <Wrapper ju={`flex-end`} dr={`row`}>
                <Combo
                  width={`220px`}
                  value={props.searchList.bookingState || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.setSearchList({
                      ...props.searchList,
                      bookingState: bookingStateInput(e.target.value),
                    });
                    props.findDocHandler(1);
                    props.setReset(props.reset + 1);
                  }}
                >
                  <option value="">전체</option>
                  {bookingStateList.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {bookingStateName(item)}
                      </option>
                    );
                  })}
                </Combo>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} width={`auto`}>
            <SmallButton
              type="button"
              width={`150px`}
              fontSize={`16px`}
              kindOf={`default`}
              onClick={() => {
                props.setSearchList(props.searchListInit);
                props.setSearchOption("regNumber");
                props.setFilterValue("");
                props.setReset(props.reset + 1);
              }}
            >
              검색조건 초기화
            </SmallButton>
          </Wrapper>
        </Wrapper>

        <TableWrapper margin={`50px 0px 0px`}>
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
            <TableHeadLIST width={`20%`}>예약접수일자</TableHeadLIST>
            <TableHeadLIST width={`24%`}>정비희망일자</TableHeadLIST>
            <TableHeadLIST width={`18%`}>차량번호</TableHeadLIST>
            <TableHeadLIST width={`25%`}>전화번호</TableHeadLIST>
            <TableHeadLIST width={`8%`}>예약상태</TableHeadLIST>
          </TableHead>
          <TableBody>
            {bookingList ? (
              bookingList.map((list) => {
                return (
                  <TableRow
                    key={list._id}
                    onClick={() => {
                      setClickDoc(list);
                      setModalOption("edit");
                      setModalOpen(true);
                    }}
                  >
                    <TableRowLIST
                      width={`5%`}
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
                          checked={
                            checkedList.includes(list._id) ? true : false
                          }
                        />
                        <CheckMark></CheckMark>
                      </Checkbox>
                    </TableRowLIST>
                    <TableRowLIST width={`20%`}>
                      {dayjs(list.createdAt).format("YYYY-MM-DD")}_
                      {list.bookingNum}
                    </TableRowLIST>
                    <TableRowLIST width={`24%`}>
                      {dayjs(list.mainHopeDate).format("YYYY-MM-DD (HH:mm)")}
                    </TableRowLIST>
                    <TableRowLIST width={`18%`}>
                      {list.car.regNumber}
                    </TableRowLIST>
                    <TableRowLIST width={`25%`}>
                      {list.customer.phoneNumber}
                    </TableRowLIST>
                    <TableRowLIST width={`8%`}>
                      <Wrapper dr={`row`} width={`auto`}>
                        <ColorSpan
                          color={bookingStateColor(list.bookingState)}
                          margin={"4px 0px 0px"}
                        >
                          <GoPrimitiveDot />
                        </ColorSpan>
                        {bookingStateName(list.bookingState)}
                      </Wrapper>
                    </TableRowLIST>
                  </TableRow>
                );
              })
            ) : (
              <Wrapper>없음</Wrapper>
            )}
          </TableBody>
        </TableWrapper>
        <PagenationSection {...props} />
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
        </Wrapper>
        {modalOption === "add" && <AddBookingModal {...bookingModalProps} />}
        {modalOption === "edit" && <EditBookingModal {...bookingModalProps} />}
        {modalOption === "reject" && (
          <RejectBookingModal {...bookingModalProps} />
        )}
      </Modal>
    </WholeWrapper>
  );
};

export default BookingList;
