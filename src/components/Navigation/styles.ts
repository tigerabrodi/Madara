import styled from 'styled-components/macro'
import { ReactComponent as LogoutSVG } from 'assets/logout.svg'
import { focusStyles } from 'styles'
import { media } from 'theme/media'
import { theme } from 'theme/theme'

export const LogoutButton = styled.button`
  height: 6rem;
  width: 6rem;
  z-index: 50;
  background-color: var(--lightBlue);
  border-radius: 50%;
  box-shadow: 0 1px 5px ${theme.Black};
  position: fixed;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  transform: translate(0);
  top: 80%;
  left: 7%;
  margin: auto;
  bottom: 0;
  will-change: transform;

  ${media.phone} {
    position: absolute;
    top: 95px;
    left: 40px;
    margin: revert;
    transition: 0.3s all ease-out;
    &:hover {
      transition: 0.2s all ease-out;
      box-shadow: 0 1px 8px ${theme.Black};
      transform: translateY(-2px);
    }

    &:active {
      transition: 0.1s all ease-out;
      box-shadow: 0 1px 5px ${theme.Black};
      transform: translateY(0);
    }
  }

  ${media.desktop} {
    left: revert;
    top: 40px;
    right: 50px;
  }
  ${focusStyles};
`

export const Logout = styled(LogoutSVG)`
  height: 3.5rem;
  width: 3.5rem;
  position: relative;
  left: 3px;
  transition: 0.2s;
`
