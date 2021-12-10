import type { GetServerSideProps, NextPage } from "next";
import { AuthTokenInfo } from "../../src/models/auth.entity";
import { parseJwt } from "../../src/modules/parseJwt";
import { MainRoute, SubRoute } from "../../src/models/router.entity";
import MyPageAccount from "../../src/components/page/MyPageAccount";
import MyPageWorker from "../../src/components/page/MyPageWorker";
import { WholeWrapper } from "../../src/components/styles/CommonComponents";
import Header from "../../src/components/layout/Header";
import Footer from "../../src/components/layout/Footer";
import { useRouter } from "next/dist/client/router";

interface PageProps {
  query: any;
  tokenValue: any;
}

/**
 * MyPage: url query 에 따른 component
 * @param props
 * @returns
 */
const MyPageComponent: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const { route } = router.query;

  switch (route) {
    case SubRoute.ACCOUNT:
      return <MyPageAccount {...props} />;
      break;

    case SubRoute.WORKER:
      return <MyPageWorker {...props} />;
      break;

    default:
      return <MyPageAccount {...props} />;
      break;
  }
};

/**
 * MyPage 페이지
 * @param props
 * @returns
 */
const MyPagePage: NextPage<PageProps> = (props) => {
  return (
    <WholeWrapper minHeight={`100vh`} ju={`space-between`}>
      <Header {...props} />
      <MyPageComponent {...props} />
      <Footer {...props} />
    </WholeWrapper>
  );
};

export default MyPagePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

  if (context.req.cookies.mk_token) {
    const tokenValue: AuthTokenInfo = parseJwt(context.req.cookies.mk_token);

    return {
      props: {
        query,
        tokenValue,
      },
    };
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
