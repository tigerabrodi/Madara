import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { media } from 'theme/media'
import { focusStyles } from 'styles'

export const ConfirmationModal = styled.div`
  position: absolute;
  z-index: 100;
  height: 21rem;
  max-width: 55rem;
  width: 95%;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.Blue};
  border-radius: 0.5rem;
  display: grid;
  grid-template-areas:
    'title title'
    'text text'
    'confirm cancel';
  grid-template-rows: 26% 32% 42%;
  align-items: center;
  justify-items: center;
  ${focusStyles};
  ${media.custom(360)} {
    height: 26rem;
  }
  ${media.phone} {
    height: 30rem;
  }
  ${media.tablet} {
    height: 40rem;
    max-width: 75rem;
  }
`

export const ConfirmationTitle = styled.h1`
  grid-area: title;
  font-family: ${theme.SourceSansPro};
  text-align: center;
  color: ${theme.Pink};
  font-weight: 600;
  font-size: 4rem;
  ${media.custom(360)} {
    font-size: 4.5rem;
  }
  ${media.phone} {
    font-size: 4.8rem;
  }
  ${media.tablet} {
    font-size: 6rem;
  }
`

export const ConfirmationText = styled.p`
  font-size: 2rem;
  padding: 0 2rem;
  grid-area: text;
  font-family: ${theme.SourceSansPro};
  color: ${theme.LightBlue};
  text-align: center;
  font-weight: 600;
  ${media.custom(360)} {
    font-size: 2.5rem;
  }
  ${media.phone} {
    font-size: 3rem;
  }
  ${media.tablet} {
    font-size: 4rem;
  }
`

const confirmationModalButtonStyles = css`
  height: 4rem;
  width: 11rem;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  font-size: 2.5rem;
  border-radius: 0.2rem;
  background-color: transparent;
  transition: 0.2s;
  will-change: transform;
  cursor: pointer;
  ${focusStyles};
  ${media.custom(360)} {
    height: 5rem;
    width: 13rem;
    font-size: 3rem;
  }
  ${media.phone} {
    height: 5.2rem;
    width: 16rem;
  }
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
    height: 65px;
    font-size: 3.5rem;
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
    margin-left: auto;
    margin-right: 60px;
  }
`

export const CancelButton = styled.button`
  ${confirmationModalButtonStyles};
  grid-area: cancel;
  border: 0.2rem solid ${theme.Pink};
  color: ${theme.Pink};
  ${media.tablet} {
    &:hover {
      background-color: ${theme.Pink};
    }
    margin-right: auto;
    margin-left: 60px;
  }
`
