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
  transition: 0.2s;
  transform: translate(0);
  top: 80%;
  left: 7%;
  margin: auto;
  bottom: 0;

  ${media.phone} {
    position: absolute;
    top: 95px;
    left: 40px;
    margin: revert;
    &:hover {
      box-shadow: 0 2px 8px ${theme.Black};
      transform: translateY(-0.2rem);
    }

    &:active {
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
