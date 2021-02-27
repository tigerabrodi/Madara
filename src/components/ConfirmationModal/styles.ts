import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { media } from 'theme/media'
import { focusStyles } from 'styles'

export const ConfirmationModal = styled.div`
  position: absolute;
  width: 51rem;
  height: 28rem;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  background-color: ${theme.Blue};
  border-radius: 0.5rem;
  display: grid;
  grid-template-areas:
    'title title'
    'text text'
    'confirm cancel';
  grid-template-rows: 20% 35% 45%;
  align-items: center;
  justify-items: center;
  ${focusStyles};
`

export const ConfirmationTitle = styled.h1`
  grid-area: title;
  font-family: ${theme.SourceSansPro};
  text-align: center;
  color: ${theme.Pink};
  font-weight: 600;
  font-size: 4.8rem;
`

export const ConfirmationText = styled.p`
  grid-area: text;
  font-family: ${theme.SourceSansPro};
  color: ${theme.LightBlue};
  text-align: center;
  font-size: 2.4rem;
  font-weight: 600;
`

const confirmationModalButtonStyles = css`
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  height: 5.2rem;
  width: 16rem;
  border-radius: 0.2rem;
  background-color: transparent;
  transition: 0.2s;
  font-size: 3rem;
  cursor: pointer;
  ${focusStyles};
  ${media.tablet} {
    &:hover {
      color: ${theme.Blue};
      box-shadow: 0 0.2rem 0.3rem ${theme.DarkBlue};
      transform: translateY(-0.1rem);
    }
    &:active {
      box-shadow: 0 0.2rem 0.1rem ${theme.DarkBlue};
      transform: translateY(0.1rem);
    }
  }
`

export const ConfirmButton = styled.button`
  ${confirmationModalButtonStyles};
  grid-area: confirm;
  border: 0.2rem solid ${theme.Green};
  color: ${theme.Green};
  ${media.tablet} {
    &:hover {
      background-color: ${theme.Green};
    }
  }
`

export const CancelButton = styled.button`
  ${confirmationModalButtonStyles};
  grid-area: cancel;
  border: 0.2rem solid ${theme.Pink};
  color: ${theme.Pink};
  font-size: 3rem;
  ${media.tablet} {
    &:hover {
      background-color: ${theme.Pink};
    }
  }
`
