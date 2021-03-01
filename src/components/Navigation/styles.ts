import styled from 'styled-components/macro'
import { ReactComponent as LogoutSVG } from 'assets/logout.svg'
import { focusStyles } from 'styles'
import { media } from 'theme/media'
import { theme } from 'theme/theme'

export const LogoutButton = styled.button`
  background-color: var(--lightBlue);
  border-radius: 50%;
  height: 6.5rem;
  box-shadow: 0 0.1rem 0.5rem ${theme.Black};
  width: 6.5rem;
  position: fixed;
  top: 92%;
  left: 15.5%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.2s;

  ${media.phone} {
    position: absolute;
    top: 48px;
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
