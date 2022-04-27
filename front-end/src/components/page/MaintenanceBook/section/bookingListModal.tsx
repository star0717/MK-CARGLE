import React from "react";
import { NextPage } from "next";
import {
  Checkbox,
  CheckInput,
  CheckMark,
  ColorSpan,
  CommonButton,
  CommonButtonWrapper,
  CommonSmallTitle,
  TableBody,
  TableHead,
  TableHeadLIST,
  TableRow,
  TableRowLIST,
  TableWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "src/components/styles/CommonComponents";
import dayjs from "dayjs";
import { GoPrimitiveDot } from "react-icons/go";
import {
  bookingStateColor,
  bookingStateName,
} from "src/constants/booking.const";
import bookingList from "../../ManBooking/section/bookingList";
import { _pMainBookingModalProps } from "src/configure/_pProps.entity";
import { BsEmojiFrownFill } from "react-icons/bs";

const BookingListModal: NextPage<_pMainBookingModalProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <WholeWrapper>
      <CommonSmallTitle>당일 예약목록</CommonSmallTitle>
      <TableWrapper margin={`50px 0px 0px`}>
        <TableHead>
          <TableHeadLIST width={`24%`}>정비희망일자</TableHeadLIST>
          <TableHeadLIST width={`18%`}>차량번호</TableHeadLIST>
          <TableHeadLIST width={`25%`}>전화번호</TableHeadLIST>
        </TableHead>
        <TableBody>
          {props.bookingList.length !== 0 ? (
            props.bookingList.map((list) => {
              return (
                <TableRow
                  key={list._id}
                  onClick={() => {
                    props.onSearchCarHandler({
                      regNumQuery: list.car.regNumber,
                    });
                    props.setSearchCarText(list.car.regNumber);
                    props.setModalOpen(false);
                  }}
                >
                  <TableRowLIST width={`24%`}>
                    {dayjs(list.mainHopeDate).format("YYYY-MM-DD (HH:mm)")}
                  </TableRowLIST>
                  <TableRowLIST width={`18%`}>
                    {list.car.regNumber}
                  </TableRowLIST>
                  <TableRowLIST width={`25%`}>
                    {list.customer.phoneNumber}
                  </TableRowLIST>
                </TableRow>
              );
            })
          ) : (
            <Wrapper minHeight={`400px`}>
              <Text fontSize={`48px`} color={`#c4c4c4`}>
                <BsEmojiFrownFill />
              </Text>
              <Text color={`#c4c4c4`}>검색 결과가 없습니다.</Text>
            </Wrapper>
          )}
        </TableBody>
      </TableWrapper>
      <CommonButtonWrapper kindOf={`column`}>
        <CommonButton
          kindOf={`circleWhite`}
          type="button"
          onClick={() => {
            props.setModalOpen(false);
          }}
        >
          취소
        </CommonButton>
      </CommonButtonWrapper>
    </WholeWrapper>
  );
};

export default BookingListModal;
