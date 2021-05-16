import styled from 'styled-components/macro'
import { theme } from 'theme/theme'
import { focusStyles } from 'styles'
import { ReactComponent as CardLogoSVG } from 'assets/card-logo.svg'
import { ReactComponent as MobileDragSVG } from 'assets/mobile-drag.svg'
import { ReactComponent as CardMenuSVG } from 'assets/card-menu.svg'
import { media } from 'theme/media'

export const CardWrapper = styled.article`
  position: relative;
  background-color: ${theme.LightBlue};
  border-radius: 0.5rem;
  min-height: 11rem;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
  grid-template-rows: minmax(10%, auto) minmax(60%, auto) minmax(10%, auto);
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
  justify-self: flex-start;
  align-self: flex-start;
  padding: 1.2rem 1rem 0.5rem 1.5rem;
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
  font-size: 1.3rem;
  color: ${theme.Blue};
`

export const CardMenu = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 16rem;
  min-width: 12rem;
  width: 40%;
  background-color: ${theme.Blue};
  box-shadow: 0 0.2rem 1rem ${theme.DarkBlue};
  border-radius: 0.5rem;
  left: 73.5%;
  top: 98%;
  transform: translate(-50%, -50%);
  ${media.custom(360)} {
    left: 76%;
  }
  ${media.phone} {
    left: 75.8%;
  }
  ${media.desktop} {
    top: 102%;
    height: 17rem;
    left: 76%;
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

export const CardReorderMenu = styled.div`
  position: absolute;
  background-color: ${theme.Blue};
  top: 0;
  right: 0;
  height: 100%;
  border: 0.2rem solid ${theme.Black};
  z-index: 20;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 60%;
  justify-content: space-between;
  border-bottom-right-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
`

export const MoveTaskButton = styled.button`
  border: none;
  background-color: ${theme.LightBlue};
  color: ${theme.Blue};
  font-weight: 600;
  font-family: ${theme.SourceSansPro};
  margin-left: 1.5rem;
  width: 7.7rem;
  height: 2.8rem;
  border-radius: 0.2rem;
  box-shadow: 0 0.1rem 0.3rem -0.1rem ${theme.Black};
  font-size: 1.5rem;
  ${focusStyles};
`

export const MobileDragArea = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${focusStyles};
`

export const MobileDrag = styled(MobileDragSVG)`
  width: 70%;
`
