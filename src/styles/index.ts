import { css } from 'styled-components'

export const focusStyles = css`
  &:focus-visible {
    outline: 0.3rem solid darkorange;
    outline-offset: 0.1rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`
