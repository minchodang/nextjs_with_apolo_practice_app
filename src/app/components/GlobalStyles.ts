import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-size: 1rem;
    background: ${({ theme }) => theme.colors.accent};
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
