import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { media } from 'theme/media'
import { focusStyles } from 'styles'
import { ReactComponent as EditCloseSVG } from 'assets/close.svg'

export const EditModal = styled.div`
  position: absolute;
  width: 95%;
  max-width: 45rem;
  height: 27rem;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  ${media.phone} {
    height: 35rem;
  }
  ${focusStyles};
`

export const EditModalHeader = styled.div`
  height: 20%;
  width: 100%;
  background-color: ${theme.MiddleBlue};
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const EditModalForm = styled.form`
  grid-template-rows: 17% 53% 30%;
  height: 80%;
  width: 100%;
  background-color: ${theme.Blue};
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  display: grid;
  grid-template-areas:
    'label label label label label label'
    'textarea textarea textarea textarea textarea textarea'
    'confirm confirm confirm cancel cancel cancel';
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-items: center;
  ${media.phone} {
    grid-template-rows: 20% 50% 30%;
  }
`

export const EditTitle = styled.h1`
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
  ${media.phone} {
    margin-left: 4.3rem;
  }
`

export const EditCloseButton = styled.button`
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

export const EditClose = styled(EditCloseSVG)`
  height: 100%;
  width: 100%;
`

export const EditLabel = styled.label`
  padding-left: 2rem;
  grid-area: label;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  font-size: 1.8rem;
  color: ${theme.LightBlue};
  align-self: center;
  justify-self: flex-start;
  ${media.custom(360)} {
    padding-left: 3.5rem;
  }
  ${media.custom(400)} {
    padding-left: 4rem;
  }
  ${media.phone} {
    padding-left: 4.5rem;
  }
`

export const EditTextarea = styled.textarea`
  grid-area: textarea;
  background-color: ${theme.LightBlue};
  height: 95%;
  width: 90%;
  font-weight: 600;
  font-size: 1.6rem;
  font-family: ${theme.SourceSansPro};
  color: ${theme.Blue};
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  &::placeholder {
    opacity: 0.7;
    color: ${theme.Blue};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0.3rem 0.4rem ${theme.DarkBlue};
  }
  ${media.custom(360)} {
    height: 100%;
    width: 80%;
  }
  ${media.phone} {
    font-size: 1.8rem;
  }
`

const editModalButtonStyles = css`
  width: 80%;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  height: 3.5rem;
  border-radius: 0.2rem;
  background-color: transparent;
  transition: 0.2s;
  font-size: 1.8rem;
  box-shadow: 0 0.1rem 0.3rem black;
  ${focusStyles};
  ${media.custom(360)} {
    width: 70%;
  }
  ${media.phone} {
    box-shadow: none;
    width: 65%;
    height: 4rem;
  }
  ${media.tablet} {
    &:hover:not(:disabled) {
      color: ${theme.Blue};
      box-shadow: 0 0.2rem 0.3rem ${theme.DarkBlue};
      transform: translateY(-0.1rem);
    }
    &:active:not(:disabled) {
      box-shadow: 0 0.2rem 0.1rem ${theme.DarkBlue};
      transform: translateY(0.1rem);
    }
  }
`

export const EditConfirmButton = styled.button`
  ${editModalButtonStyles};
  justify-self: flex-end;
  margin-right: 1.2rem;
  grid-area: confirm;
  border: 0.2rem solid ${theme.Green};
  color: ${theme.Green};
  &:disabled {
    opacity: 0.3;
    box-shadow: none;
  }
  ${media.custom(360)} {
    margin-right: 1.7rem;
  }
  ${media.phone} {
    margin-right: 3.2rem;
  }
  ${media.tablet} {
    &:hover:not(:disabled) {
      cursor: pointer;
      background-color: ${theme.Green};
    }
  }
`

export const EditCancelButton = styled.button`
  ${editModalButtonStyles};
  justify-self: flex-start;
  margin-left: 1.2rem;
  grid-area: cancel;
  border: 0.2rem solid ${theme.Pink};
  color: ${theme.Pink};
  cursor: pointer;
  ${media.custom(360)} {
    margin-left: 1.7rem;
  }
  ${media.phone} {
    margin-left: 3.4rem;
  }
  ${media.tablet} {
    &:hover {
      background-color: ${theme.Pink};
    }
  }
`
