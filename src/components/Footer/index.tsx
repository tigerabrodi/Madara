import { FooterWrapper, Heart, FooterLink, FooterText } from './styles'

export const Footer = () => (
  <FooterWrapper>
    <FooterText aria-label="Built with love by the eigth hokage.">
      Built With <Heart title="Heart" role="img" /> by{' '}
      <FooterLink href="https://github.com/tigerabrodi" target="_blank">
        The 8th Hokage
      </FooterLink>
    </FooterText>
  </FooterWrapper>
)
