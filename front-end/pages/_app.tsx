import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import wrapper from "../store/configure.store";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default wrapper.withRedux(MyApp);
