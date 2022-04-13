import React, { useState } from "react";
import { NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import {
  RsWrapper,
  WholeWrapper,
} from "src/components/styles/CommonComponents";
import BasicInfo from "./section/basicInfo";
import { useRouter } from "next/router";
import BusinessHours from "./section/businessHours";
import MaintenanceInfo from "./section/maintenanceInfo";
import { _MainProps } from "src/configure/_props.entity";
import { _pSetBookingDataProps } from "src/configure/_pProps.entity";
import { SetBooking } from "src/models/setbooking.entity";

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
  console.log(props);
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/
  const [booking, setBooking] = useState<SetBooking>(props.data);
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
  };

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
