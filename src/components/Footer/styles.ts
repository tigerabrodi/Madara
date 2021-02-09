import styled from 'styled-components/macro'
import { theme } from '../../theme/theme'
import { ReactComponent as HeartSVG } from '../../assets/hearts.svg'

export const FooterWrapper = styled.footer`
  grid-area: footer;
  height: 8rem;
  width: 100%;
  background-color: ${theme.Blue};
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const FooterText = styled.span`
  color: ${theme.LightBlue};
  font-family: ${theme.SourceSansPro};
`

export const FooterLink = styled.a`
  text-decoration: underline;
  color: inherit;
`

export const Heart = styled(HeartSVG)``
