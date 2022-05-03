import React, { useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";

import BasicInfo from "./section/basicInfo";
import { useRouter } from "next/router";
import BusinessHours from "./section/businessHours";
import MaintenanceInfo from "./section/maintenanceInfo";
import { _MainProps } from "src/configure/_props.entity";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import { SetBooking } from "src/models/setbooking.entity";
import { SetBookingTime } from "src/constants/booking.const";

const StepReservation: NextPage<_pSetBookingDataProps> = (props) => {
  const router = useRouter();

  switch (router.query.step) {
    case "F":
      return <BusinessHours {...props} />;
    case "S":
      return <MaintenanceInfo {...props} />;
    default:
      return <BasicInfo {...props} />;
  }
};

const SetReservation: NextPage<_MainProps> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  const bookingInit: Partial<SetBooking> = {
    intro: "",
    dayOff: [],
    setBookingTime: SetBookingTime.ALL,
    officeHour: "",
    lift: 0,
    mPrice: [],
  };

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<Partial<SetBooking>>({
    intro: props.data.setBooking.intro ? props.data.setBooking.intro : "",
    dayOff: props.data.setBooking.dayOff ? props.data.setBooking.dayOff : [],
    setBookingTime: props.data.setBooking.setBookingTime
      ? props.data.setBooking.setBookingTime
      : SetBookingTime.ALL,
    officeHour: props.data.setBooking.officeHour
      ? props.data.setBooking.officeHour
      : "",
    lift: props.data.setBooking.lift ? props.data.setBooking.lift : 0,
    mPrice: props.data.setBooking.mPrice ? props.data.setBooking.mPrice : [],
  });

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/
  const reservationProps: _pSetBookingDataProps = {
    ...props,
    booking,
    setBooking,
    bookingInit,
  };
  console.log(booking);

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return (
    <BodyWrapper>
      <StepReservation {...reservationProps} />
    </BodyWrapper>
  );
};
export default SetReservation;
