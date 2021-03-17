import styled from 'styled-components/macro'
import { theme } from '../../theme/theme'
import { ReactComponent as HeartSVG } from '../../assets/hearts.svg'
import { ReactComponent as ExternalIcon } from 'assets/external.svg'
import { media } from 'theme/media'
import { focusStyles } from 'styles'

export const FooterWrapper = styled.footer`
  grid-area: footer;
  height: 8rem;
  width: 100%;
  background-color: ${theme.Blue};
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 1rem ${theme.Blue};
`

export const FooterText = styled.p`
  color: ${theme.LightBlue};
  font-family: ${theme.SourceSansPro};
  font-size: 2.3rem;
`

export const FooterLink = styled.a`
  text-decoration: underline;
  position: relative;
  color: ${theme.White};
  ${focusStyles};
`

export const Heart = styled(HeartSVG)`
  position: relative;
  top: 0.5rem;
  margin: 0 0.2rem 0 0.5rem;
  height: 2.5rem;
  ${media.phone} {
    height: 3rem;
  }
`

export const External = styled(ExternalIcon)`
  position: absolute;
  top: -1.4rem;
  right: -1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  fill: ${theme.LightBlue};
`
