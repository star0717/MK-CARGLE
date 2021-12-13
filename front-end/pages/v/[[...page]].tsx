import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../../src/components/layout/Footer";
import Header from "../../src/components/layout/Header";
import { parseJwt } from "../../src/modules/commonModule";
import { WholeWrapper } from "../../src/components/styles/CommonComponents";
import { AuthTokenInfo } from "../../src/models/auth.entity";
import { CompanyApproval } from "../../src/models/company.entity";
import FileUpload from "../../src/components/page/SignUp/section/fileUpload";
import Approval from "../../src/components/page/SignUp/section/approval";
import Main from "../../src/components/page/Main";
import { MainRoute, SubRoute } from "../../src/models/router.entity";
import { useRouter } from "next/dist/client/router";
import MyPageAccount from "../../src/components/page/MyPageAccount";
import MyPageWorker from "../../src/components/page/MyPageWorker";

interface ViewProps {
  route: any;
  tokenValue: any;
}

/**
 * cApproval에 따른 메인 컴포넌트
 * @param props
 * @returns
 */
const MainComponent: NextPage<ViewProps> = (props) => {
  // 필요한 props 재정의
  const tokenValue = props.tokenValue;

  switch (tokenValue.cApproval) {
    case CompanyApproval.BEFORE:
      return <FileUpload {...props} />;

    case CompanyApproval.ING:
      return <Approval />;

    default:
      return <SubComponent {...props} />;
  }
};

/**
 * url query에 따른 서브 컴포넌트
 * @param props
 * @returns
 */
const SubComponent: NextPage<ViewProps> = (props) => {
  const router = useRouter();

  const { page } = router.query; // page url query

  const mainRoute = page && page[0];
  const subRoute = page && page[1];

  switch (mainRoute) {
    case MainRoute.MAIN:
      return <Main {...props} />;

    case MainRoute.MYPAGE:
      if (subRoute === SubRoute.ACCOUNT) {
        return <MyPageAccount {...props} />;
      }
      if (subRoute === SubRoute.WORKER) {
        return <MyPageWorker {...props} />;
      }
  }
};

/**
 * 실제 페이지를 구성하는 컴포넌트
 * @param props
 * @returns
 */
const MainPage: NextPage<ViewProps> = (props) => {
  console.log("아호이");

  return (
    <>
      <Head>
        <title>MK SOLUTION</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WholeWrapper minHeight={`100vh`} ju={`space-between`}>
        <Header {...props} />
        <MainComponent {...props} />
        <Footer />
      </WholeWrapper>
    </>
  );
};

export default MainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const route = context.query;
  const mainRoute = route.page ? route.page[0] : null;
  const subRoute = route.page ? route.page[1] : null;

  const mItem: any = Object.values(MainRoute); // page first query array
  const sItem: any = Object.values(SubRoute); // page second query array

  if (context.req.cookies.mk_token) {
    const tokenValue: AuthTokenInfo = parseJwt(context.req.cookies.mk_token);

    if (mItem.indexOf(mainRoute) === -1) {
      return {
        notFound: true,
      };
    } else {
      if (mainRoute === "mypage" && sItem.indexOf(subRoute) === -1) {
        return {
          notFound: true,
        };
      }
      return {
        props: {
          tokenValue,
        },
      };
    }
    // 토큰 확인 - 없을 경우, 로그인 화면으로 리디렉트
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
