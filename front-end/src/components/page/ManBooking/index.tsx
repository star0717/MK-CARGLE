import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { _MainProps } from "src/configure/_props.entity";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import BookingList from "./section/bookingList";
import { FindParameters, FindResult } from "src/models/base.entity";
import { Booking, BookingFindOptions } from "src/models/booking.entity";
import { _pBookingProps } from "src/configure/_pProps.entity";
import { useDispatch } from "react-redux";
import { _aGetBooking } from "store/action/user.action";
import { _iBooking } from "store/interfaces";

const ManReservationPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();

  const searchListInit: BookingFindOptions = {
    mainHopeDate: null,
    bookingState: "",
  };

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [findResult, setFindResult] = useState<FindResult<Booking>>(props.data);
  const [searchOption, setSearchOption] = useState<string>("regNumber"); // 검색 옵션
  const [filterValue, setFilterValue] = useState<string>(""); // 검색 내용
  const [reset, setReset] = useState<number>(0);
  const [searchList, setSearchList] =
    useState<BookingFindOptions>(searchListInit);

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  /**
   * 작업자의 정보를 조회함
   * @param page 조회할 페이지
   */
  const findBookingHandler = (page: number) => {
    const param: FindParameters = {
      page,
      take: 10,
    };
    const option: any = {};

    if (filterValue === "") delete option[searchOption];
    else option[searchOption] = filterValue;
    if (!searchList.mainHopeDate) delete option.mainHopeDate;
    else option.mainHopeDate = searchList.mainHopeDate;
    if (searchList.bookingState === "") delete option.bookingState;
    else option.bookingState = searchList.bookingState;

    dispatch(_aGetBooking(param, option)).then((res: _iBooking) => {
      setFindResult(res.payload);
    });
  };

  useEffect(() => {
    findBookingHandler(1);
  }, [reset]);

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const bookingProps: _pBookingProps = {
    ...props,
    findResult,
    setFindResult,
    findDocHandler: findBookingHandler,
    searchOption,
    setSearchOption,
    filterValue,
    setFilterValue,
    searchList,
    setSearchList,
    searchListInit,
    reset,
    setReset,
  };

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <BodyWrapper>
      <BookingList {...bookingProps} />
    </BodyWrapper>
  );
};

export default ManReservationPage;
