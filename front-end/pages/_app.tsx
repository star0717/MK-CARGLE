import { AppProps } from "next/app";
import { NextPage } from "next";
import wrapper from "../store";
import GlobalStyle from "../styles/globals";
import theme from "../styles/theme";
import { ThemeProvider } from "styled-components";
import Head from "next/head";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>MK SOLUTION</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);

// import theme from "../styles/theme";
// import { ThemeProvider } from "styled-components";
// import type { AppProps } from "next/app";
// import { NextPage } from "next";
// import wrapper from "../store";
// import React from "react";
// import Head from "next/head";
// import CssBaseline from "@mui/material/CssBaseline";
// import GlobalStyle from "../styles/globals";

// const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
//   return (
//     <React.Fragment>
//       <Head>
//         <title>Next App</title>
//         <meta
//           content="minimum-scale=1, initial-scale=1, width=device-width"
//           name="viewport"
//         />
//       </Head>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <GlobalStyle />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </React.Fragment>
//   );
// };
// export default wrapper.withRedux(MyApp);
