import styled from 'styled-components/macro'
import { focusStyles } from 'styles'
import { media } from 'theme/media'
import { theme } from 'theme/theme'
import { ReactComponent as CloseSVG } from 'assets/close.svg'

export const MoveTaskModalWrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 15%;
  height: 300px;
  max-width: 33rem;
  z-index: 100;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  ${focusStyles};
`

export const MoveTaskModalHeader = styled.div`
  height: 20%;
  width: 100%;
  background-color: ${theme.MiddleBlue};
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const MoveTaskModalTitle = styled.h1`
  font-family: ${theme.SourceSansPro};
  color: ${theme.LightBlue};
  font-weight: 600;
  margin-left: 2rem;
  font-size: 2.2rem;
  ${media.custom(360)} {
    margin-left: 3.3rem;
  }
  ${media.custom(410)} {
    margin-left: 3.7rem;
  }
`

export const MoveTaskModalCloseButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 15px;
  width: 15px;
  margin-right: 23px;
  ${media.phone} {
    margin-right: 3rem;
  }
  cursor: pointer;
  ${focusStyles};
`

export const MoveTaskModalClose = styled(CloseSVG)`
  height: 100%;
  width: 100%;
`

export const MoveTaskModalBody = styled.div`
  width: 100%;
  height: 80%;
  background-color: ${theme.Blue};
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

export const MoveTaskModalButton = styled.button`
  border: none;
  background-color: ${theme.LightBlue};
  font-family: ${theme.SourceSansPro};
  color: ${theme.Blue};
  box-shadow: 0 0.1rem 0.2rem ${theme.Black};
  font-weight: 600;
  width: 21rem;
  border-radius: 0.3rem;
  font-size: 2.3rem;
  height: 42px;
  &[aria-disabled='true'] {
    opacity: 0.3;
  }
  ${focusStyles};
`
