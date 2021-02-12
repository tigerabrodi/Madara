import { css } from 'styled-components'
import { theme } from 'theme/theme'

export const focusStyles = css`
  &:focus-visible {
    border: 0.2rem solid ${theme.Black};
    border-radius: 0.2rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`
