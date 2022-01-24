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
  genApiPath,
  getPathName,
  getQuery,
  parseJwt,
} from "../../src/modules/commonModule";
import { AuthTokenInfo } from "../../src/models/auth.entity";
import { Company } from "../../src/models/company.entity";
import FileUpload from "../../src/components/page/SignUp/section/fileUpload";
import Approval from "../../src/components/page/SignUp/section/approval";
import Main from "../../src/components/page/Main";
import { UseLink } from "../../src/configure/router.entity";
import { useRouter } from "next/dist/client/router";
import MyPageAccount from "../../src/components/page/MyPageAccount";
import MyPageWorker from "../../src/components/page/MyPageWorker";
import Test from "../../src/components/page/Test";
import { _MainProps } from "../../src/configure/_props.entity";
import axios, { AxiosResponse } from "axios";
import { FindParameters, FindResult } from "../../src/models/base.entity";
import { User } from "../../src/models/user.entity";
import AdminManCompaniesPage from "../../src/components/page/admin/man_companies";
import AdminReviewCompaniesPage from "../../src/components/page/admin/review_companies";

import { PageWrapper } from "../../src/components/styles/LayoutComponents";
import {
  AdminApiPath,
  SettingsApiPath,
} from "../../src/constants/api-path.const";
import AdminUsersPage from "../../src/components/page/admin/users";
import AdminManPartsPage from "../../src/components/page/admin/man_parts";
import AdminMolitItemsPage from "../../src/components/page/admin/molit_items";
import { CompanyApproval } from "../../src/constants/model.const";
import ManPartsPage from "../../src/components/page/ManPart";
import ManSetPage from "../../src/components/page/ManSet";
import ManBusinessPage from "../../src/components/page/ManBusiness";

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
    <PageWrapper>
      <Header {...props} />
      <MainComponent {...props} />
      <Footer />
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

  /** 요효환 pagePath들 */
  const useUrlArray: string[] = Object.values(UseLink);

  /** 호출된 페이지 URL */
  const pagePath: string = getPathName(url);

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
        successResult.props.data = {
          class: [
            { _id: "1", name: "분류명1" },
            { _id: "2", name: "분류명2" },
          ],
          part: [
            {
              _id: "1",
              class: "분류명1",
              code: "code1",
              name: "name1",
              molit: "molit1",
            },
            {
              _id: "2",
              class: "분류명2",
              code: "code2",
              name: "name2",
              molit: "molit2",
            },
            {
              _id: "3",
              class: "분류명1",
              code: "code3",
              name: "name3",
              molit: "molit3",
            },
            {
              _id: "4",
              class: "분류명2",
              code: "code4",
              name: "name4",
              molit: "molit4",
            },
          ],
        };
        return successResult;

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
