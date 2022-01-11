import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from "next";
import Head from "next/head";
import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Footer from "../../src/components/layout/Footer";
import Header from "../../src/components/layout/Header";
import {
  getPathName,
  getQuery,
  parseJwt,
} from "../../src/modules/commonModule";
import { AuthTokenInfo } from "../../src/models/auth.entity";
import { Company, CompanyApproval } from "../../src/models/company.entity";
import FileUpload from "../../src/components/page/SignUp/section/fileUpload";
import Approval from "../../src/components/page/SignUp/section/approval";
import Main from "../../src/components/page/Main";
import { Step, UseLink } from "../../src/configure/router.entity";
import { useRouter } from "next/dist/client/router";
import MyPageAccount from "../../src/components/page/MyPageAccount";
import MyPageWorker from "../../src/components/page/MyPageWorker";
import Test from "../../src/components/page/Test";
import { _MainProps } from "../../src/configure/_props.entity";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { FindParameters, FindResult } from "../../src/models/base.entity";
import { User } from "../../src/models/user.entity";
import AdminManCompaniesPage from "../../src/components/page/admin/man_companies";
import AdminReviewCompaniesPage from "../../src/components/page/admin/review_companies";

import { PageWrapper } from "../../src/components/styles/LayoutComponents";
import {
  AdminApiPath,
  AuthApiPath,
  SettingsApiPath,
} from "../../src/models/api-path";
import AdminUsersPage from "../../src/components/page/admin/users";
import AdminManPartsPage from "../../src/components/page/admin/man_parts";
import AdminMolitItemsPage from "../../src/components/page/admin/molit_items";
import { tryGetPreviewData } from "next/dist/server/api-utils";

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

  switch (pathName) {
    case UseLink.MAIN:
      return <Main {...props} />;

    case UseLink.MYPAGE_ACCOUNT:
      return <MyPageAccount {...props} />;

    case UseLink.MYPAGE_WORKER:
      return <MyPageWorker {...props} />;

    case UseLink.TEST:
      return <Test {...props} />;

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
  return (
    <>
      <Head>
        <title>MK SOLUTION</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <Header {...props} />
        <MainComponent {...props} />
        <Footer />
      </PageWrapper>
    </>
  );
};

export default MainPage;

// API 호출에 사용할 URL을 생성하기 위해 전달되는 아규먼트의 구조
class GenPathArgs {
  // 전달할 ID
  id?: string;
  // 리스트 조회에 사용할 파라미터
  findParams?: FindParameters;
}

/**
 * pre-rendering: 서버사이드 렌더링
 * @param context
 * @returns
 */
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  // 현재 URL
  const url: string = context.resolvedUrl;

  /** 요효환 pagePath들 */
  const useUrlArray: string[] = Object.values(UseLink);

  /** 호출된 페이지 URL */
  const pagePath: string = getPathName(url);

  /** API 호출용 기본 URL */
  const baseApiUrl: string =
    process.env.DESTINATION_API + process.env.DESTINATION_PORT;

  /**
   * API 호출을 위해 경로 정보 생성
   * @param path 호출할 API의 경로
   * @param args 전달할 아큐먼트
   * @returns API 호출용 최종 경로
   */
  const genPath = (path: string, args?: Partial<GenPathArgs>) => {
    let apiPath = baseApiUrl + path;
    if (args?.id) {
      apiPath += "/" + args.id;
    }
    if (args?.findParams) {
      apiPath += "/" + FindParameters.getQuery(args.findParams);
    }
    return apiPath;
  };

  /** API 호출 시 사용할 인증 토큰 값. 각 axios 호출 시 옵션으로 주입 */
  const authConfig = {
    headers: {
      Cookie: `mk_token=${context.req.cookies.mk_token}`,
    },
    withCredentials: true,
  };

  // 토큰이 없을 경우 index 페이지로 리다이렉트
  if (!context.req.cookies.mk_token) {
    return {
      redirect: {
        permanent: false,
        destination: UseLink.INDEX,
      },
    };
  }

  /** 로그인 토큰 */
  const tokenValue: AuthTokenInfo = parseJwt(context.req.cookies.mk_token);

  /** 데이터 조회용 ID */
  const routerQuery = getQuery(url);
  let id: string = routerQuery.id;

  /** 데이터 목록 조회용 파라미터 */
  let params: FindParameters = {
    take: 10,
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
      case UseLink.TEST:
        successResult.props.data = await axios
          .get(genPath(AuthApiPath.profile), authConfig)
          .then((res: AxiosResponse<unknown, any>) => res.data);
        return successResult;

      case UseLink.MYPAGE_WORKER: {
        successResult.props.data = await axios
          .get(
            genPath(SettingsApiPath.management_workers, {
              findParams: params,
            }),
            authConfig
          )
          .then((res: AxiosResponse<FindResult<User>, User>) => res.data);
        return successResult;
      }

      case UseLink.ADMIN_REVIEW_COMPANIES: {
        if (id) {
          failResult.redirect.destination = pagePath;
          successResult.props.data = await axios
            .get(genPath(AdminApiPath.signup_info, { id }), authConfig)
            .then((res: AxiosResponse<Company, Company>) => res.data);
        } else {
          successResult.props.data = await axios
            .get(
              genPath(AdminApiPath.ing_companies, { findParams: params }),
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
            .get(genPath(AdminApiPath.signup_info, { id }), authConfig)
            .then((res: AxiosResponse<Company, Company>) => res.data);
          return successResult;
        } else {
          successResult.props.data = await axios
            .get(
              genPath(AdminApiPath.done_companies, { findParams: params }),
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
            .get(genPath(AdminApiPath.users, { id }))
            .then((res: AxiosResponse<User, User>) => res.data);
          return successResult;
        } else {
          successResult.props.data = await axios
            .get(
              genPath(AdminApiPath.users, { findParams: params }),
              authConfig
            )
            .then((res: AxiosResponse<FindResult<User>, User>) => res.data);
          return successResult;
        }
      }
      default:
        return {
          props: {
            tokenValue,
          },
        };
    }
  } catch (err) {
    return failResult;
  }
};
