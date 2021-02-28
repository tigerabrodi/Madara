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
    --lightBlue: #DDE1F4;
    --middleBlue: #4759AD;
    --blue: #36458F;
    --pink: #E9B7B7;
    --darkBlue: #202E73;
    --darkGreen: #025400;
    --green: #9DFF9B;
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
