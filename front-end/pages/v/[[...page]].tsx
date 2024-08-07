import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Footer from "src/components/layout/Footer";
import Header from "src/components/layout/Header";
import {
  genApiPath,
  getPathName,
  getQuery,
  parseJwt,
  s3GetFileData,
  s3GetFileUrl,
  s3ToUrl,
} from "src/modules/commonModule";
import { AuthTokenInfo } from "src/models/auth.entity";
import { Company } from "src/models/company.entity";
import FileUpload from "src/components/page/SignUp/section/fileUpload";
import Approval from "src/components/page/SignUp/section/approval";
import Main from "src/components/page/Main";
import { UseLink } from "src/configure/router.entity";
import { useRouter } from "next/dist/client/router";
import MyPageAccount from "src/components/page/MyPageAccount";
import MyPageWorker from "src/components/page/MyPageWorker";
import Test from "src/components/page/Test";
import { _MainProps } from "src/configure/_props.entity";
import axios, { AxiosResponse } from "axios";
import { FindParameters, FindResult } from "src/models/base.entity";
import { User } from "src/models/user.entity";
import AdminManCompaniesPage from "src/components/page/admin/man_companies";
import AdminReviewCompaniesPage from "src/components/page/admin/review_companies";
import { PageWrapper } from "src/components/styles/LayoutComponents";
import {
  AdminApiPath,
  AgenciesApiPath,
  AuthApiPath,
  BookingApiPath,
  MaintenancesApiPath,
  PartsApiPath,
  PartsSetsApiPath,
  SetBookingApiPath,
  SettingsApiPath,
  TimeTableApiPath,
} from "src/constants/api-path.const";
import AdminUsersPage from "src/components/page/admin/users";
import AdminManPartsPage from "src/components/page/admin/man_parts";
import AdminMolitItemsPage from "src/components/page/admin/molit_items";
import { CompanyApproval } from "src/constants/model.const";
import ManPartsPage from "src/components/page/ManPart";
import ManSetPage from "src/components/page/ManSet";
import ManBusinessPage from "src/components/page/ManBusiness";
import { Part } from "src/models/part.entity";
import { Agency } from "src/models/agency.entity";
import { PartsSet } from "src/models/partsset.entity";
import MaintenanceBookPage from "src/components/page/MaintenanceBook";
import ManCustomerPage from "src/components/page/ManCustomer";
import ManReservationPage from "src/components/page/ManBooking";
import React, { useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import NavbarMenu from "src/components/layout/NavbarMenu";
import BlackWrapper from "src/components/layout/BlackWrapper";
import { Maintenance } from "src/models/maintenance.entity";
import dayjs from "dayjs";
import SetReservation from "src/components/page/SetBooking";
import { s3Folder } from "src/configure/s3.entity";
import { S3 } from "aws-sdk";
import { SetBooking } from "src/models/setbooking.entity";
import { Booking } from "src/models/booking.entity";
import { TimeTable } from "src/models/timetable.entity";

/**
 * 메인: cApproval에 따른 메인 컴포넌트
 * @param props
 * @returns
 */
const MainComponent: NextPage<_MainProps> = (props) => {
  switch (props.tokenValue.cApproval) {
    case CompanyApproval.BEFORE:
      return <FileUpload />;

    case CompanyApproval.ING:
      return <Approval />;

    default:
      return <SubComponent {...props} />;
  }
};

/**
 * 메인: url query에 따른 서브 컴포넌트
 * @param props
 * @returns
 */
const SubComponent: NextPage<_MainProps> = (props) => {
  const router: NextRouter = useRouter();
  const pathName: string = getPathName(router.asPath);

  if (!props.tokenValue.uApproval) return <Approval />;

  switch (pathName) {
    // 일반 메뉴
    case UseLink.MAIN:
      return <Main {...props} />;

    case UseLink.MAN_PARTS:
      return <ManPartsPage {...props} />;

    case UseLink.MAN_SET:
      return <ManSetPage {...props} />;

    case UseLink.MAN_BUSINESS:
      return <ManBusinessPage {...props} />;

    case UseLink.MYPAGE_ACCOUNT:
      return <MyPageAccount {...props} />;

    case UseLink.MYPAGE_WORKER:
      return <MyPageWorker {...props} />;

    case UseLink.MYPAGE_SET_BOOKING:
      return <SetReservation {...props} />;

    case UseLink.MAINTENANCE_BOOK:
      return <MaintenanceBookPage {...props} />;

    case UseLink.MAN_CUSTOMER:
      return <ManCustomerPage {...props} />;

    case UseLink.MAN_BOOKING:
      return <ManReservationPage {...props} />;

    case UseLink.TEST:
      return <Test {...props} />;

    // 관리자(Admin) 메뉴
    case UseLink.ADMIN_REVIEW_COMPANIES:
      return <AdminReviewCompaniesPage {...props} />;

    case UseLink.ADMIN_MAN_COMPANIES:
      return <AdminManCompaniesPage {...props} />;

    case UseLink.ADMIN_USERS:
      return <AdminUsersPage {...props} />;

    case UseLink.ADMIN_MAN_PARTS:
      return <AdminManPartsPage {...props} />;

    case UseLink.ADMIN_MOLIT_ITEMS:
      return <AdminMolitItemsPage {...props} />;
  }
};

/**
 * 메인: 페이지
 * @param props
 * @returns
 */
const MainPage: NextPage<_MainProps> = (props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const mainProps: _MainProps = {
    ...props,
    openMenu,
    setOpenMenu,
  };

  const { width, height, ref } = useResizeDetector();

  return (
    <PageWrapper ref={ref}>
      {width < 1200 ? (
        <BlackWrapper />
      ) : (
        <>
          {" "}
          <Header {...mainProps} />
          {openMenu && width < 1440 && <NavbarMenu {...mainProps} />}
          <MainComponent {...mainProps} />
          <Footer />
        </>
      )}
    </PageWrapper>
  );
};

export default MainPage;

/**
 * pre-rendering: 서버사이드 렌더링
 * @param context
 * @returns
 */
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  // 현재 URL
  const url: string = context.resolvedUrl;

  /** 유효한 pagePath들 */
  const useUrlArray: string[] = Object.values(UseLink);

  /** 호출된 페이지 URL */
  const pagePath: string = getPathName(url);

  /** 인증토큰관련 */
  const tokenKey: string = process.env.TK_KEY;
  const tokenName: string = process.env.TK_NAME;

  /** API 호출 시 사용할 인증 토큰 값. 각 axios 호출 시 옵션으로 주입 */
  const authConfig = {
    headers: {
      Cookie: `${tokenName}=${context.req.cookies[tokenName]}`,
    },
    withCredentials: true,
  };

  // 토큰이 없을 경우 index 페이지로 리다이렉트
  if (!context.req.cookies[tokenName]) {
    return {
      redirect: {
        permanent: false,
        destination: UseLink.INDEX,
      },
    };
  }

  /** 로그인 토큰 */
  let tokenValue: AuthTokenInfo;
  try {
    tokenValue = parseJwt(
      context.req.cookies[tokenName],
      tokenKey
    ) as AuthTokenInfo;
  } catch (err) {
    console.error("토큰에러 : ", err);
    context.res.setHeader("Set-Cookie", `${tokenName}=; path=/; Max-Age=0`);
    return {
      redirect: {
        permanent: false,
        destination: UseLink.INDEX,
      },
    };
  }

  /** 데이터 조회용 ID */
  const routerQuery = getQuery(url);
  let id: string = routerQuery.id;

  /** 데이터 목록 조회용 파라미터 */
  let params: FindParameters = {
    take: 10,
  };

  let params7: FindParameters = {
    take: 7,
  };

  /** axios로 수신된 데이터 */
  let data: any;

  /** API 요청 성공 결과 */
  let successResult = {
    props: {
      tokenValue,
      data,
    },
  };

  /** API 요청 실패 결과. MAIN 화면으로 이동함 */
  let failResult = {
    // notFound: true,
    redirect: {
      permanent: false,
      destination: UseLink.MAIN,
    },
  };

  if (useUrlArray.indexOf(pagePath) === -1) {
    return failResult;
  }

  // 렌더링 시 데이터가 필요한 페이지만 URL 및 API 추가
  try {
    switch (pagePath) {
      case UseLink.MAIN:
        if (
          tokenValue.cApproval === CompanyApproval.DONE &&
          tokenValue.uApproval
        ) {
          let Today = dayjs().toDate();
          let LastMonth = dayjs().subtract(1, "month").toDate();

          successResult.props.data = await axios
            .get(
              genApiPath(MaintenancesApiPath.maintenances, {
                findParams: {
                  sFrom: LastMonth,
                  sTo: Today,
                },
                isServerSide: true,
              }),
              authConfig
            )
            .then(
              (res: AxiosResponse<FindResult<Maintenance>, Maintenance>) =>
                res.data
            );
        } else {
          delete successResult.props.data;
        }
        return successResult;

      // 부품 관리
      case UseLink.MAN_PARTS: {
        successResult.props.data = await axios
          .get(
            genApiPath(PartsApiPath.parts, {
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<FindResult<Part>, Part>) => res.data);
        return successResult;
      }

      // 세트 관리
      case UseLink.MAN_SET: {
        const setList: FindResult<PartsSet> = await axios
          .get(
            genApiPath(PartsSetsApiPath.partsSets, {
              isServerSide: true,
            }),
            authConfig
          )
          .then(
            (res: AxiosResponse<FindResult<PartsSet>, PartsSet>) => res.data
          );
        const allParts: FindResult<Part> = await axios
          .get(
            genApiPath(PartsApiPath.parts, {
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<FindResult<Part>, Part>) => res.data);
        successResult.props.data = {
          setList: setList,
          allParts: allParts,
        };
        return successResult;
      }

      // 거래처 관리
      case UseLink.MAN_BUSINESS: {
        successResult.props.data = await axios
          .get(
            genApiPath(AgenciesApiPath.agencies, {
              findParams: params,
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<FindResult<Agency>, Agency>) => res.data);
        return successResult;
      }

      // 예약 관리
      case UseLink.MAN_BOOKING: {
        const timeTableInit: number[][] = await axios
          .get(
            genApiPath(SetBookingApiPath.BASE, {
              id: tokenValue.cID,
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<SetBooking, string>) => res.data.weekTime);
        if (timeTableInit.length === 0) {
          console.log("타임테이블 초기값 없음");
          return failResult;
        }
        const timeTable: TimeTable = await axios
          .patch(
            genApiPath(TimeTableApiPath.timetable_init, {
              id: tokenValue.cID,
              isServerSide: true,
            }),
            timeTableInit,
            authConfig
          )
          .then((res: AxiosResponse<TimeTable, string>) => res.data);
        if (!timeTable) {
          console.log("타임테이블 업데이트 에러");
          return failResult;
        }
        successResult.props.data = await axios
          .get(
            genApiPath(BookingApiPath.BASE, {
              findParams: params,
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<FindResult<Booking>, Booking>) => res.data);
        return successResult;
      }

      // 계정 관리
      case UseLink.MYPAGE_ACCOUNT: {
        const company: Company = await axios
          .get(
            genApiPath(AuthApiPath.companyId, {
              id: tokenValue.cID,
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<Company, string>) => res.data);

        const fileData: S3.Types.GetObjectOutput = await s3GetFileData(
          company.comRegNum,
          s3Folder.stamp
        );

        successResult.props.data = s3ToUrl(fileData);

        return successResult;
      }

      // 직원 관리
      case UseLink.MYPAGE_WORKER: {
        successResult.props.data = await axios
          .get(
            genApiPath(SettingsApiPath.management_workers, {
              findParams: params,
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<FindResult<User>, User>) => res.data);
        return successResult;
      }

      case UseLink.MYPAGE_SET_BOOKING: {
        let imgJson: string[] = [];
        const companyone: Company = await axios
          .get(
            genApiPath(AuthApiPath.companyId, {
              id: tokenValue.cID,
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<Company, string>) => res.data);
        for (let i = 0; i < 4; i++) {
          const s3Data: S3.Types.GetObjectOutput = await s3GetFileData(
            `${companyone.comRegNum}_${i + 1}`,
            s3Folder.company
          );
          const s3Url: string = s3ToUrl(s3Data);
          imgJson.push(s3Url);
        }

        const setBooking: SetBooking = await axios
          .get(
            genApiPath(SetBookingApiPath.set_booking, {
              id: tokenValue.cID,
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<SetBooking>) => res.data);

        successResult.props.data = {
          imgJson: imgJson,
          setBooking: setBooking,
        };
        return successResult;
      }

      // 정비내역
      case UseLink.MAINTENANCE_BOOK: {
        if (id) {
          const setList: FindResult<PartsSet> = await axios
            .get(
              genApiPath(PartsSetsApiPath.partsSets, {
                isServerSide: true,
              }),
              authConfig
            )
            .then(
              (res: AxiosResponse<FindResult<PartsSet>, PartsSet>) => res.data
            );
          const mtData: FindResult<Maintenance> = await axios
            .get(
              genApiPath(MaintenancesApiPath.maintenances, {
                id: id,
                isServerSide: true,
              }),
              authConfig
            )
            .then(
              (res: AxiosResponse<FindResult<Maintenance>, Maintenance>) =>
                res.data
            );
          const allParts: FindResult<Part> = await axios
            .get(
              genApiPath(PartsApiPath.parts, {
                isServerSide: true,
              }),
              authConfig
            )
            .then((res: AxiosResponse<FindResult<Part>, Part>) => res.data);
          successResult.props.data = {
            setList: setList,
            mtData: mtData,
            allParts: allParts,
          };
          return successResult;
        } else {
          let Today = dayjs().toDate();
          let LastMonth = dayjs().subtract(1, "month").toDate();

          successResult.props.data = await axios
            .get(
              genApiPath(MaintenancesApiPath.maintenances, {
                findParams: {
                  ...params,
                  sFrom: LastMonth,
                  sTo: Today,
                },
                isServerSide: true,
              }),
              authConfig
            )
            .then(
              (res: AxiosResponse<FindResult<Maintenance>, Maintenance>) =>
                res.data
            );
          return successResult;
        }
      }

      case UseLink.ADMIN_REVIEW_COMPANIES: {
        if (id) {
          failResult.redirect.destination = pagePath;
          successResult.props.data = await axios
            .get(
              genApiPath(AdminApiPath.signup_info, { id, isServerSide: true }),
              authConfig
            )
            .then((res: AxiosResponse<Company, Company>) => res.data);
        } else {
          successResult.props.data = await axios
            .get(
              genApiPath(AdminApiPath.ing_companies, {
                findParams: params,
                isServerSide: true,
              }),
              authConfig
            )
            .then(
              (res: AxiosResponse<FindResult<Company>, Company>) => res.data
            );
        }
        return successResult;
      }
      case UseLink.ADMIN_MAN_COMPANIES: {
        if (id) {
          failResult.redirect.destination = pagePath;
          successResult.props.data = await axios
            .get(
              genApiPath(AdminApiPath.signup_info, { id, isServerSide: true }),
              authConfig
            )
            .then((res: AxiosResponse<Company, Company>) => res.data);
          return successResult;
        } else {
          successResult.props.data = await axios
            .get(
              genApiPath(AdminApiPath.done_companies, {
                findParams: params,
                isServerSide: true,
              }),
              authConfig
            )
            .then(
              (res: AxiosResponse<FindResult<Company>, Company>) => res.data
            );
          return successResult;
        }
      }
      case UseLink.ADMIN_USERS: {
        if (id) {
          failResult.redirect.destination = pagePath;
          successResult.props.data = await axios
            .get(
              genApiPath(AdminApiPath.users, {
                id: id,
                findParams: params,
                isServerSide: true,
              }),
              authConfig
            )
            .then((res: AxiosResponse<User, User>) => res.data);
          return successResult;
        } else {
          successResult.props.data = await axios
            .get(
              genApiPath(AdminApiPath.users, {
                findParams: params,
                isServerSide: true,
              }),
              authConfig
            )
            .then((res: AxiosResponse<FindResult<User>, User>) => res.data);
          return successResult;
        }
      }
      case UseLink.ADMIN_MAN_PARTS: {
        failResult.redirect.destination = pagePath;
        successResult.props.data = await axios
          .get(
            genApiPath(AdminApiPath.parts, {
              isServerSide: true,
            }),
            authConfig
          )
          .then((res: AxiosResponse<User, User>) => res.data);
        return successResult;
      }
      default:
        return {
          props: {
            tokenValue,
          },
        };
    }
  } catch (err) {
    console.log("에러발생", failResult);
    return failResult;
  }
};
