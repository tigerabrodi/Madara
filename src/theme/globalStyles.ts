import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    --light-blue: #DDE1F4;
    --blue: #36458F;
    --pink: #E9B7B7;
    --libre-baskerville: 'Libre Baskerville';
    --source-sans-pro: 'Source Sans Pro';
  }

  body {
    box-sizing: border-box;
    background: ${theme.LightBlue};
    #root {
      width: 100vw;
      max-width: 100%;
      display: grid;
      grid-template-areas:
      "main"
      "footer";
    }
  }
`
