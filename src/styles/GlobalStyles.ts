import { createGlobalStyle } from "styled-components";

export const colors = {
  dominant: "#0a0a0a", // 漆黒
  sub: "#222222", // ブラッシュド・メタルグレー
  accent1: "#D4AF37", // リキッドゴールド
  accent2: "#B80000", // ブラッドレッド
};

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
    background-color: ${colors.dominant};
    color: white;
    font-family: 'Noto Sans JP', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 18px;
    line-height: 1.7;
    letter-spacing: 0.02em;
  }

  @media (max-width: 600px) {
    html, body, #root {
      font-size: 15px;
      padding: 0;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Serif JP', serif;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin-bottom: 0.5em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
  }
`;

export default GlobalStyles;
