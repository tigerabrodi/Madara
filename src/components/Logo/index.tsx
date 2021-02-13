import styled from 'styled-components'
import LogoImg from 'assets/hand-writing.png'
import { media } from 'theme/media'

const LogoImage = styled.img`
  display: none;
  ${media.tablet} {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 5rem;
    margin-left: 3rem;
    margin-top: 3rem;
  }
`

export const Logo = () => <LogoImage src={LogoImg} alt="Writing hand." />
