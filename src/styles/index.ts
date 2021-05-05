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

export const ModalOverlay = styled.div`
  position: absolute;
  z-index: 50;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.Black};
  opacity: 0.5;
`

export const AssistiveTechnologyOnly = css`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`

export const ATOnlyText = styled.span`
  ${AssistiveTechnologyOnly};
`
