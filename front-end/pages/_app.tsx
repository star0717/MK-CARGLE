import "../styles/globals.css";
import Theme from "../styles/Theme";
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@material-ui/core";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import wrapper from "../store";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};
export default wrapper.withRedux(MyApp);
