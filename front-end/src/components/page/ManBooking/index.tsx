import React, { useState } from "react";
import { NextPage } from "next";
import { _MainProps } from "src/configure/_props.entity";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import BookingList from "./section/bookingList";
import { FindParameters, FindResult } from "src/models/base.entity";
import { Booking } from "src/models/booking.entity";
import { _pBookingProps } from "src/configure/_pProps.entity";
import { useDispatch } from "react-redux";

const ManReservationPage: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/
  const dispatch = useDispatch();
  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [findResult, setFindResult] = useState<FindResult<Booking>>(props.data);
  const [searchOption, setSearchOption] = useState<string>("car.regNumber"); // 검색 옵션
  const [filterValue, setFilterValue] = useState<string>(""); // 검색 내용

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
      filterKey: searchOption,
      filterValue: filterValue,
      useRegSearch: true,
    };

    // dispatch(_aGetAgencies(param)).then((res: any) => {
    //   setFindResult(res.payload);
    // });
  };

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
