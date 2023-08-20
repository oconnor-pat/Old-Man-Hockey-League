// src/utils/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #2B3784; /* spidey blue background color */
    margin: 0; /* Remove default margin */
    padding: 0; /* Remove default padding */
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyles;
