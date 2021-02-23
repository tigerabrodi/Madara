import { css } from 'styled-components'

export const focusStyles = css`
  &:focus-visible {
    outline: 0.2rem solid darkorange;
    outline-offset: 0.2rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`
