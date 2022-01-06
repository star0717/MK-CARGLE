/* html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
} */

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: "Noto Sans KR", sans-serif;
}

#__next {
  height: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
} 
`;

export default GlobalStyle;
