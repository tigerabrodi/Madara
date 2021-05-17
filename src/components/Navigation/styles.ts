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
  box-shadow: 0 0.1rem 0.5rem ${theme.Black};
  position: fixed;
  top: 91.5%;
  left: 16%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.2s;

  ${media.phone} {
    position: absolute;
    top: 4.8rem;
    left: 5rem;
    &:hover {
      box-shadow: 0 0.1rem 1rem ${theme.Black};
    }
  }

  ${media.desktop} {
    box-shadow: none;
    border-radius: 0;
    height: 4.6rem;
    width: 4.6rem;
    background-color: transparent;
    top: 4.5%;
    left: 96%;
    &:hover {
      box-shadow: none;
      svg {
        transform: translateY(-0.2rem);
      }
    }
  }
  ${focusStyles};
`

export const Logout = styled(LogoutSVG)`
  height: 3.5rem;
  width: 3.5rem;
  position: relative;
  left: 3px;
  transition: 0.2s;

  ${media.desktop} {
    left: 0;
    height: 100%;
    width: 100%;
  }
`
