import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'

export const focusStyles = css`
  &:focus-visible {
    outline: 0.3rem solid darkorange;
    outline-offset: 0.2rem;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const totalTasksStyles = css`
  padding: 0 0.6rem;
  border-radius: 2em;
  font-size: 2rem;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
`

export const ModalOverlay = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.Black};
  opacity: 0.5;
`
