import { createGlobalStyle } from 'styled-components';

export const colors = {
  dominant: '#0a0a0a',
  sub: '#222222',
  accent1: '#D4AF37',
  accent2: '#B80000',
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: ${colors.dominant};
    color: white;
    font-family: sans-serif;
  }
`;

export default GlobalStyles;