import styled from 'styled-components/macro'
import { ReactComponent as LogoutSVG } from 'assets/logout.svg'
import { focusStyles } from 'styles'
import { media } from 'theme/media'

export const LogoutButton = styled.button`
  height: 4.6rem;
  width: 4.6rem;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 4.5%;
  left: 96%;
  cursor: pointer;
  transition: 0.2s;
  ${media.tablet} {
    &:hover {
      svg {
        transform: translateY(-0.2rem);
      }
    }
  }
  ${focusStyles};
`

export const Logout = styled(LogoutSVG)`
  height: 100%;
  width: 100%;
  ${media.tablet} {
    transition: 0.2s;
  }
`
