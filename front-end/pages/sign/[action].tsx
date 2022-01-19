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
import { WholeWrapper } from "../../src/components/styles/CommonComponents";
import SignUp from "../../src/components/page/SignUp";
import { useRouter } from "next/dist/client/router";
import { UseLink } from "../../src/configure/router.entity";
import Find from "../../src/components/page/Find";
import { getPathName } from "../../src/modules/commonModule";
import { PageWrapper } from "../../src/components/styles/LayoutComponents";

/**
 * 계정관련: url에 따른 컴포넌트
 */
const SignComponent: NextPage = () => {
  const router: NextRouter = useRouter();
  const pathName: string = getPathName(router.asPath);

  switch (pathName) {
    case UseLink.SIGNUP:
      return <SignUp />;

    case UseLink.FIND_EMAIL:
      return <Find />;

    case UseLink.FIND_PASSWORD:
      return <Find />;
  }
};

/**
 * 계정관련: 페이지
 * @returns
 */
const SignUpPage: NextPage = () => {
  return (
    <PageWrapper>
      <Header />
      <SignComponent />
      <Footer />
    </PageWrapper>
  );
};

export default SignUpPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const url: string = context.resolvedUrl; // 현재 url (query 제외)
  const useUrlArray: string[] = Object.values(UseLink); // 사용가능한 url 배열
  const pathName: string = getPathName(url); // pathName 가져오기

  if (context.req.cookies.mk_token) {
    return {
      redirect: {
        permanent: false,
        destination: UseLink.MAIN,
      },
    };
  } else {
    if (useUrlArray.indexOf(pathName) === -1) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {},
      };
    }
  }
};
