import styled from 'styled-components/macro'
import { theme } from 'theme/theme'
import { focusStyles } from 'styles'
import { ReactComponent as CardLogoSVG } from 'assets/card-logo.svg'
import { ReactComponent as CardMenuSVG } from 'assets/card-menu.svg'
import { media } from 'theme/media'

export const Card = styled.article`
  position: relative;
  background-color: ${theme.LightBlue};
  border-radius: 0.5rem;
  min-height: 15rem;
  width: 90%;
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
  grid-template-rows: minmax(10%, auto) minmax(70%, auto) minmax(10%, auto);
  grid-template-areas:
    'logo menuButton'
    'text text'
    'date date';
  row-gap: 0.5rem;
  align-items: center;
  ${focusStyles};
`

export const CardLogo = styled(CardLogoSVG)`
  grid-area: logo;
  justify-self: start;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  height: 2.1rem;
  width: 2.5rem;
`

export const CardMenuButton = styled.button`
  grid-area: menuButton;
  justify-self: end;
  margin-right: 1.5rem;
  margin-top: 1.5rem;
  height: 1.6rem;
  width: 1.6rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ${focusStyles};
`

export const CardMenuLogo = styled(CardMenuSVG)`
  height: 100%;
  width: 100%;
`

export const CardText = styled.p`
  grid-area: text;
  font-weight: 600;
  max-width: 90%;
  justify-self: end;
  font-family: ${theme.SourceSansPro};
  font-size: 1.8rem;
  padding-right: 2rem;
  color: ${theme.Blue};
`

export const CardDate = styled.p`
  grid-area: date;
  justify-self: start;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  font-family: ${theme.SourceSansPro};
  font-size: 1.2rem;
  color: ${theme.Blue};
`

export const CardMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 15rem;
  width: 40%;
  background-color: ${theme.Blue};
  box-shadow: 0 0.2rem 1rem ${theme.DarkBlue};
  border-radius: 0.5rem;
  top: 65%;
  left: 76.2%;
  transform: translate(-50%, -50%);
  ${media.desktop} {
    top: 70%;
    height: 17rem;
  }
`

export const CardMenuItem = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  font-family: ${theme.SourceSansPro};
  font-size: 2rem;
  font-weight: 600;
  height: 4rem;
  color: ${theme.LightBlue};
  transition: 0.1s;
  cursor: pointer;
  ${media.tablet} {
    &:hover {
      background-color: ${theme.LightBlue};
      color: ${theme.Blue};
    }
  }
  ${focusStyles};
`
