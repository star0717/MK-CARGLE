declare module "@mui/material/styles" {
  interface Theme {
    custom: any;
  }
  interface ThemeOptions {
    custom?: any;
  }
}

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#314FA5",
    },
    // secondary: {
    //   main: "#19857b",
    // },
    // error: {
    //   main: red.A400,
    // },
  },
  custom: {
    basicTheme_C: "#314FA5",
    lightTheme_C: "#448fff",
    darkTheme_C: "#203462",

    //
    black_C: "#343a40",
    white_C: "#fff",
    subWhite_C: "#f5f5f5",
    red_C: "#d6263b",
    green_C: "#51b351",
    grey_C: "#c4c4c4",
    darkGrey_C: "#9d9d9d",
    lightGrey_C: "#ddd",
    border: "1px solid #C4C4C4",
    radius: "4px",
    tableRadius: "0px",
    inputPadding: "0px 8px",
    textPadding: "10px",
    boxShadow: "0px 10px 15px rgba(220,220,220,1)",
    boxShadowV2: "0px 5px 10px rgba(220,220,220,1)",
    boxShadowDark: "0px 10px  rgba(70,70,70,1)",
    transition: "0.4s",
  },
});

export default theme;
