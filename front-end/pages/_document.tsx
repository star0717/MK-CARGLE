import React from "react";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import theme from "../styles/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta content={theme.palette.primary.main} name="theme-color" />
          <meta charSet="utf-8" />
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          ></link> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

// import React from "react";
// import Document, {
//   DocumentContext,
//   Head,
//   Html,
//   Main,
//   NextScript,
// } from "next/document";
// import { ServerStyleSheet } from "styled-components";
// import { ServerStyleSheets } from "@mui/styles";
// import theme from "../styles/theme";

// class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const styledComponentsSheet = new ServerStyleSheet();
//     const materialSheets = new ServerStyleSheets();
//     const originalRenderPage = ctx.renderPage;

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             styledComponentsSheet.collectStyles(
//               materialSheets.collect(<App {...props} />)
//             ),
//         });
//       const initialProps = await Document.getInitialProps(ctx);
//       return {
//         ...initialProps,
//         styles: (
//           <React.Fragment>
//             {initialProps.styles}
//             {materialSheets.getStyleElement()}
//             {styledComponentsSheet.getStyleElement()}
//           </React.Fragment>
//         ),
//       };
//     } finally {
//       styledComponentsSheet.seal();
//     }
//   }

//   render() {
//     return (
//       <Html lang="ko">
//         <Head>
//           <meta content={theme.palette.primary.main} name="theme-color" />
//           <meta charSet="utf-8" />
//           {/* <link
//              href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
//              rel="stylesheet"
//           ></link> */}
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
