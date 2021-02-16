import { css } from 'styled-components'
import { theme } from 'theme/theme'

export const focusStyles = css`
  &:focus-visible {
    outline: 0.2rem solid ${theme.Black};
    border: 0.2rem solid ${theme.LightBlue};
    border-radius: 0.2rem;
    padding: 0.3rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`
