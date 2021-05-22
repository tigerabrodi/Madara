import styled from 'styled-components/macro'
import { focusStyles } from 'styles'
import { media } from 'theme/media'
import { theme } from 'theme/theme'
import { ReactComponent as CloseSVG } from 'assets/close.svg'

export const MoveTaskModalWrapper = styled.div`
  position: absolute;
  top: 35%;
  height: 22rem;
  width: 95%;
  max-width: 33rem;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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
  font-size: 1.8rem;
  margin-left: 2rem;
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
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 2rem;
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
  height: 3rem;
  width: 21rem;
  font-size: 1.8rem;
  border-radius: 0.3rem;
  &[aria-disabled='true'] {
    opacity: 0.3;
  }
  ${focusStyles};
`
