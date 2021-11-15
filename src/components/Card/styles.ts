import styled, { keyframes } from 'styled-components/macro'
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
  grid-template-rows: 2.5rem minmax(60%, auto) 1rem;
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
  justify-self: flex-start;
  align-self: flex-start;
  padding: 0.5rem 2rem 1.8rem 1.55rem;
  font-family: ${theme.SourceSansPro};
  font-size: 1.8rem;
  color: ${theme.Blue};
`

export const CardDate = styled.p`
  grid-area: date;
  justify-self: start;
  margin-left: 1.6rem;
  margin-bottom: 2.5rem;
  font-family: ${theme.SourceSansPro};
  font-size: 1.3rem;
  color: ${theme.Blue};
`

const fadeDown = keyframes`
    from {
      clip-path: polygon(-5% -5%, 105% 0%, 110% 0%, -5% 0%);
    } 

    to {
      clip-path: polygon(-5% -5%, 105% 0%, 110% 110%, 0% 110%);
    }
`
export const CardMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(-1.3rem) translateY(3.4rem);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 16rem;
  min-width: 12rem;
  width: 40%;
  background-color: ${theme.Blue};
  box-shadow: 0 2px 5px ${theme.DarkBlue};
  border-radius: 0.5rem;
  animation: ${fadeDown} 0.2s ease-out both;
  ${media.desktop} {
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
  width: 70%;
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
  border-radius: 0.2rem;
  box-shadow: 0 0.1rem 0.3rem -0.1rem ${theme.Black};
  width: 97px;
  height: 37px;
  font-size: 1.7rem;
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
