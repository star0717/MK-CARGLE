import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  PreviewData,
} from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import Footer from "../src/components/layout/Footer";
import Header from "../src/components/layout/Header";
import SignIn from "../src/components/page/SignIn";
import { WholeWrapper } from "../src/components/styles/CommonComponents";
import { PageWrapper } from "../src/components/styles/LayoutComponents";
import { _SignInProps } from "../src/configure/_props.entity";
import { UseLink } from "../src/configure/router.entity";

/**
 * Index: 로그인 페이지
 * @param props
 * @returns
 */
const Home: NextPage<_SignInProps> = (props) => {
  return (
    <PageWrapper>
      <Header />
      <SignIn {...props} />
      <Footer />
    </PageWrapper>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  // 쿠키 확인 - 아이디 저장, props로 전달(있을 경우 : 쿠키 / 없을 경우 : "")
  const saveId: string = context.req.cookies.saveId
    ? context.req.cookies.saveId
    : ""; // 저장된 아이디(id)
  const saveCheck: boolean = context.req.cookies.saveId ? true : false; // 저장 여부(boolean)
  // 토큰 확인 - 있을 경우, 메인 화면으로 리디렉트
  if (context.req.cookies.mk_token) {
    return {
      redirect: {
        permanent: false,
        destination: UseLink.MAIN,
      },
    };
  }
  return {
    props: {
      saveId,
      saveCheck,
    },
  };
};
