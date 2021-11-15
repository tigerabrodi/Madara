import styled from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as CheckSVG } from 'assets/check.svg'
import { ReactComponent as AlertCloseSVG } from 'assets/close.svg'
import { focusStyles } from 'styles'
import { media } from 'theme/media'

export const AlertWrapper = styled.div`
  width: 90vw;
  max-width: 85rem;
  min-width: 31rem;
  height: 10rem;
  border: 0.2rem solid ${theme.DarkGreen};
  background-color: ${theme.Green};
  box-shadow: 0 0.1rem 0.5rem ${theme.DarkGreen};
  display: grid;
  grid-template-columns: 13% 27% 20% 30% 10%;
  grid-template-areas:
    'icon status status status close'
    '. message message message .';
  align-items: center;
  justify-items: center;
  &:focus {
    outline: none;
  }
  ${media.phone} {
    grid-template-columns: 25% 15% 20% 30% 10%;
  }
  ${media.tablet} {
    grid-template-columns: 25% 15% 20% 20% 20%;
    min-width: 60rem;
    width: 80vw;
    height: 13rem;
  }
`

export const AlertStatus = styled.h1`
  grid-area: status;
  justify-self: flex-start;
  padding-left: 1rem;
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  font-size: 2rem;
  color: ${theme.DarkGreen};
  ${media.tablet} {
    padding-left: 1.8rem;
    font-size: 2.6rem;
  }
`

export const AlertMessage = styled.p`
  grid-area: message;
  justify-self: flex-start;
  align-self: flex-start;
  padding-left: 1.2rem;
  font-family: ${theme.SourceSansPro};
  font-weight: 400;
  font-size: 1.6rem;
  color: ${theme.DarkGreen};
  ${media.tablet} {
    padding-left: 2rem;
    font-size: 2rem;
  }
`

export const AlertCloseButton = styled.button`
  grid-area: close;
  justify-self: flex-end;
  margin-right: 2rem;
  height: 1.6rem;
  width: 1.6rem;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transition: 0.1s;
  will-change: transform;
  cursor: pointer;
  ${focusStyles};
  ${media.phone} {
    margin-right: 3rem;
  }
  ${media.tablet} {
    height: 2rem;
    width: 2rem;
    &:hover {
      transform: translateY(-0.2rem);
    }
  }
`

export const AlertClose = styled(AlertCloseSVG)`
  height: 100%;
  width: 100%;
  path {
    fill: ${theme.DarkGreen};
  }
`

export const AlertIcon = styled(CheckSVG)`
  grid-area: icon;
  justify-self: end;
  height: 1.8rem;
  width: 1.8rem;
  ${media.tablet} {
    height: 2rem;
    width: 2rem;
  }
  ${media.tablet} {
    height: 2.4rem;
    width: 2.4rem;
  }
`
