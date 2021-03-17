import {
  FooterWrapper,
  Heart,
  FooterLink,
  FooterText,
  External,
} from './styles'

export const Footer = () => (
  <FooterWrapper>
    <FooterText>
      Built With <Heart aria-label="love" role="img" /> by{' '}
      <FooterLink href="https://github.com/tigerabrodi" target="_blank">
        Naruto's student
        <External aria-hidden="true" />
      </FooterLink>
    </FooterText>
  </FooterWrapper>
)
