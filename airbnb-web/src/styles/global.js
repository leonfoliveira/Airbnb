import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
}

body, html {
  background: #eee;
  font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  height: 100%;
  width: 100%;
}

button {
  cursor: pointer;
}
`;
