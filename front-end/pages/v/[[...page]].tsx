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
import axios, { AxiosResponse } from "axios";
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

/**
 * pre-rendering: 서버사이드 렌더링
 * @param context
 * @returns
 */
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  /**
   * 현재 url (query 제외)
   */
  const url: string = context.resolvedUrl;
  /**
   * 사용가능한 url 배열
   */
  const useUrlArray: string[] = Object.values(UseLink);
  /**
   * pathName 가져오기
   */
  const pathName: string = getPathName(url);

  /**
   * Axios URL
   */
  const apiUrl: string =
    process.env.DESTINATION_API + process.env.DESTINATION_PORT;

  const genPath = (apiPath: string, id: string, findParams: FindParameters) => {
    apiPath = apiUrl + apiPath;

    if (id) {
      console.log("1");
      apiPath = apiPath + "/" + id;
      console.log(apiPath);
    }

    if (findParams) {
      apiPath = apiPath + "/" + FindParameters.getQuery(findParams);
      console.log(apiPath);
    }

    return apiPath;
  };

  const authConfig = {
    headers: {
      Cookie: `mk_token=${context.req.cookies.mk_token}`,
    },
    withCredentials: true,
  };

  if (context.req.cookies.mk_token) {
    /**
     * 로그인 토큰
     */
    const tokenValue: AuthTokenInfo = parseJwt(context.req.cookies.mk_token);

    if (useUrlArray.indexOf(pathName) === -1) {
      return {
        notFound: true,
      };
    } else {
      let data: any;

      // 렌더링 시 데이터가 필요한 페이지만 URL 및 API 추가
      switch (pathName) {
        case UseLink.TEST:
          data = await axios
            .get(`${apiUrl}${AuthApiPath.profile}`, {
              headers: {
                Cookie: `mk_token=${context.req.cookies.mk_token}`,
              },
              withCredentials: true,
            })
            .then((res: AxiosResponse<unknown, any>) => res.data);
          return {
            props: {
              tokenValue,
              data,
            },
          };

        case UseLink.MYPAGE_WORKER: {
          try {
            const params: FindParameters = {
              take: 10,
            };

            data = await axios
              .get(
                `${apiUrl}${
                  SettingsApiPath.management_workers
                }?${FindParameters.getQuery(params)}`,
                {
                  headers: {
                    Cookie: `mk_token=${context.req.cookies.mk_token}`,
                  },
                  withCredentials: true,
                }
              )
              .then((res: AxiosResponse<FindResult<User>, User>) => res.data);
            return {
              props: {
                tokenValue,
                data,
              },
            };
          } catch (err) {
            return {
              notFound: true,
            };
          }
        }

        case UseLink.ADMIN_REVIEW_COMPANIES: {
          const routerQuery = getQuery(url);
          if (routerQuery.id) {
            console.log("info");

            try {
              data = await axios
                .get(
                  genPath(AdminApiPath.signup_info, routerQuery.id, null),
                  authConfig
                )
                // .get(`${apiUrl}${AdminApiPath.signup_info}/${routerQuery.id}`, {
                //   headers: {
                //     Cookie: `mk_token=${context.req.cookies.mk_token}`,
                //   },
                //   withCredentials: true,
                // })
                .then(
                  (res: AxiosResponse<FindResult<Company>, Company>) => res.data
                );
              return {
                props: {
                  tokenValue,
                  data,
                },
              };
            } catch (err) {
              console.log(err);
              return {
                redirect: {
                  permanent: false,
                  destination: UseLink.ADMIN_REVIEW_COMPANIES,
                },
              };
            }
          } else {
            try {
              const params: FindParameters = {
                take: 10,
              };

              console.log("list");
              data = await axios
                .get(
                  genPath(AdminApiPath.ing_companies, null, params),
                  authConfig
                )
                // .get(
                //   `${apiUrl}${
                //     AdminApiPath.ing_companies
                //   }?${FindParameters.getQuery(params)}`,
                //   {
                //     headers: {
                //       Cookie: `mk_token=${context.req.cookies.mk_token}`,
                //     },
                //     withCredentials: true,
                //   }
                // )
                .then(
                  (res: AxiosResponse<FindResult<Company>, Company>) => res.data
                );
              return {
                props: {
                  tokenValue,
                  data,
                },
              };
            } catch (err) {
              return {
                notFound: true,
              };
            }
          }
        }
        case UseLink.ADMIN_MAN_COMPANIES: {
          const routerQuery = getQuery(url);
          if (routerQuery.id) {
            try {
              data = await axios
                .get(`${apiUrl}${AdminApiPath.signup_info}/${routerQuery.id}`, {
                  headers: {
                    Cookie: `mk_token=${context.req.cookies.mk_token}`,
                  },
                  withCredentials: true,
                })
                .then(
                  (res: AxiosResponse<FindResult<Company>, Company>) => res.data
                );
              return {
                props: {
                  tokenValue,
                  data,
                },
              };
            } catch (err) {
              return {
                redirect: {
                  permanent: false,
                  destination: UseLink.ADMIN_MAN_COMPANIES,
                },
              };
            }
          } else {
            try {
              const params: FindParameters = {
                take: 10,
              };

              data = await axios
                .get(
                  `${apiUrl}${
                    AdminApiPath.done_companies
                  }?${FindParameters.getQuery(params)}`,
                  {
                    headers: {
                      Cookie: `mk_token=${context.req.cookies.mk_token}`,
                    },
                    withCredentials: true,
                  }
                )
                .then(
                  (res: AxiosResponse<FindResult<Company>, Company>) => res.data
                );
              return {
                props: {
                  tokenValue,
                  data,
                },
              };
            } catch (err) {
              return {
                notFound: true,
              };
            }
          }
        }
        case UseLink.ADMIN_USERS: {
          const routerQuery = getQuery(url);
          const params: FindParameters = {
            take: 10,
          };
          if (routerQuery.id) {
            try {
              data = await axios
                .get(
                  `${apiUrl}${AdminApiPath.users}/${
                    routerQuery.id
                  }?${FindParameters.getQuery(params)}`,
                  {
                    headers: {
                      Cookie: `mk_token=${context.req.cookies.mk_token}`,
                    },
                    withCredentials: true,
                  }
                )
                .then((res: AxiosResponse<FindResult<User>, User>) => res.data);
              return {
                props: {
                  tokenValue,
                  data,
                },
              };
            } catch (err) {
              return {
                redirect: {
                  permanent: false,
                  destination: UseLink.ADMIN_USERS,
                },
              };
            }
          } else {
            try {
              data = await axios
                .get(
                  `${apiUrl}${AdminApiPath.users}?${FindParameters.getQuery(
                    params
                  )}`,
                  {
                    headers: {
                      Cookie: `mk_token=${context.req.cookies.mk_token}`,
                    },
                    withCredentials: true,
                  }
                )
                .then((res: AxiosResponse<FindResult<User>, User>) => res.data);
              return {
                props: {
                  tokenValue,
                  data,
                },
              };
            } catch (err) {
              return {
                notFound: true,
              };
            }
          }
        }
        case UseLink.ADMIN_TEST: {
          console.log("타는가");
          const routerQuery = getQuery(url);
          if (routerQuery.step === Step.FIRST) {
            data = await axios
              // .get(`${apiUrl}/admin/signup-info/${routerQuery.id}`, {
              .get(`${apiUrl}${AdminApiPath.signup_info}/${routerQuery.id}`, {
                headers: {
                  Cookie: `mk_token=${context.req.cookies.mk_token}`,
                },
                withCredentials: true,
              })
              .then(
                (res: AxiosResponse<FindResult<Company>, Company>) => res.data
              )
              .catch((error) => {
                return null;
              });

            console.log("타는가2");
            return {
              props: {
                tokenValue,
                data,
              },
            };
          } else {
            const params: FindParameters = {
              take: 5,
              filterKey: "approval",
              filterValue: "done",
            };

            data = await axios
              .get(
                `${apiUrl}${AdminApiPath.companies}?${FindParameters.getQuery(
                  params
                )}`,
                {
                  headers: {
                    Cookie: `mk_token=${context.req.cookies.mk_token}`,
                  },
                  withCredentials: true,
                }
              )
              .then(
                (res: AxiosResponse<FindResult<Company>, Company>) => res.data
              );
            return {
              props: {
                tokenValue,
                data,
              },
            };
          }
        }
        default:
          return {
            props: {
              tokenValue,
            },
          };
      }
    }
    // 토큰 확인 - 없을 경우, 로그인 화면으로 리디렉트
  } else {
    return {
      redirect: {
        permanent: false,
        destination: UseLink.INDEX,
      },
    };
  }
};
