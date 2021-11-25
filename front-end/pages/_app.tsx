import "../styles/globals.css";
import Theme from "../styles/Theme"
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import wrapper from "../store/configure.store";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>);
};
export default wrapper.withRedux(MyApp);
