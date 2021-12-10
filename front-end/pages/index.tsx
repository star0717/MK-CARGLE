import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../src/components/layout/Footer";
import Header from "../src/components/layout/Header";
import SignIn from "../src/components/page/SignIn/SignIn";
import { WholeWrapper } from "../src/components/styles/CommonComponents";

//SCSS

interface SignInProps {
  saveId: string;
  saveCheck: boolean;
}

const Home: NextPage<SignInProps> = (props) => {
  return (
    <>
      <Head>
        <title>MK SOLUTION</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WholeWrapper minHeight={`100vh`} ju={`space-between`}>
        <Header />
        <SignIn {...props} />
        <Footer />
      </WholeWrapper>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 쿠키 확인 - 아이디 저장, props로 전달(있을 경우 : 쿠키 / 없을 경우 : "")
  const saveId = context.req.cookies.saveId ? context.req.cookies.saveId : ""; // 저장된 아이디(id)
  const saveCheck = context.req.cookies.saveId ? true : false; // 저장 여부(boolean)
  // 토큰 확인 - 있을 경우, 메인 화면으로 리디렉트
  if (context.req.cookies.mk_token) {
    return {
      redirect: {
        permanent: false,
        destination: "/view/main",
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
