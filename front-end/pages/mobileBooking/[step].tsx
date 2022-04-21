import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { BodyWrapper } from "src/components/styles/LayoutComponents";
import { NextRouter, useRouter } from "next/router";
import { MobileRoute } from "src/configure/router.entity";
import { getPathName } from "src/modules/commonModule";
import { ParsedUrlQuery } from "querystring";
import MobileCarSelect from "src/components/page/MobileBooking";
import MobileCarInfo from "src/components/page/MobileBooking/mCarInfo";
import MobileBooking from "src/components/page/MobileBooking/mBooking";
import MobileComplete from "src/components/page/MobileBooking/mComplete";

const MobileBookingPage: NextPage<any> = (props) => {
  /*********************************************************************
   * 1. Init Libs
   *********************************************************************/

  /*********************************************************************
   * 2. State settings
   *********************************************************************/

  /*********************************************************************
   * 3. Handlers
   *********************************************************************/
  const MobileBookingComponent: NextPage = () => {
    const router: NextRouter = useRouter();
    const pathName: string = getPathName(router.asPath);

    switch (pathName) {
      case MobileRoute.m_car_select:
        return <MobileCarSelect />;

      case MobileRoute.m_car_info:
        return <MobileCarInfo />;

      case MobileRoute.m_booking:
        return <MobileBooking />;

      case MobileRoute.m_complete:
        return <MobileComplete />;

      default:
        return null;
    }
  };

  /*********************************************************************
   * 4. Props settings
   *********************************************************************/

  /*********************************************************************
   * 5. Page configuration
   *********************************************************************/
  return <MobileBookingComponent />;
};

export default MobileBookingPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const url: string = context.resolvedUrl; // 현재 url (query 제외)
  const useUrlArray: string[] = Object.values(MobileRoute); // 사용가능한 url 배열
  const pathName: string = getPathName(url); // pathName 가져오기

  // if (pathName !== MobileRoute.m_car_select && !context.req.cookies.test)
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: MobileRoute.m_car_select,
  //     },
  //   };

  if (useUrlArray.indexOf(pathName) === -1)
    return {
      notFound: true,
    };

  return {
    props: {},
  };
};
