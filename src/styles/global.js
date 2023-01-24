import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        background-color: #f0f2f5;
        font-family: "Noto Sans", sans-serif;
        color: $clr-gray500;
    }

`;

export default GlobalStyle;
