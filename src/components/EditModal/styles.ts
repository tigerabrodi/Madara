import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { media } from 'theme/media'
import { focusStyles } from 'styles'
import { ReactComponent as EditCloseSVG } from 'assets/close.svg'

export const EditModalWrapper = styled.div`
  position: absolute;
  width: 95%;
  max-width: 450px;
  z-index: 100;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 300px;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${media.phone} {
    height: 350px;
  }
  ${media.tablet} {
    max-width: 700px;
    height: 450px;
    top: 33%;
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
  margin-left: 20px;
  ${media.custom(360)} {
    margin-left: 33px;
  }
  ${media.custom(410)} {
    margin-left: 37px;
  }
  ${media.phone} {
    margin-left: 43px;
  }
  ${media.tablet} {
    margin-left: 65px;
    font-size: 2.4rem;
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
  margin-right: 20px;
  ${media.phone} {
    margin-right: 30px;
  }
  cursor: pointer;
  ${media.tablet} {
    width: 18px;
    height: 18px;
    margin-right: 35px;
    transition: transform 0.3s ease-out;
    &:hover {
      transition: transform 0.17s ease-out;
      transform: rotate(0.5turn);
    }
  }
  ${focusStyles};
`

export const EditClose = styled(EditCloseSVG)`
  height: 100%;
  width: 100%;
`

export const EditLabel = styled.label`
  margin-left: 20px;
  grid-area: label;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  font-size: 1.8rem;
  color: ${theme.LightBlue};
  align-self: center;
  justify-self: flex-start;
  ${media.custom(360)} {
    margin-left: 35px;
  }
  ${media.custom(400)} {
    margin-left: 40px;
  }
  ${media.phone} {
    margin-left: 45px;
  }
  ${media.tablet} {
    margin-left: 68px;
    font-size: 2.2rem;
  }
`

export const EditTextarea = styled.textarea`
  grid-area: textarea;
  background-color: ${theme.LightBlue};
  border: none;
  height: 95%;
  width: 90%;
  font-weight: 600;
  font-family: ${theme.SourceSansPro};
  color: ${theme.Blue};
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  font-size: 1.8rem;
  &::placeholder {
    color: ${theme.Blue};
    font-style: italic;
    opacity: 1;
  }
  &:focus {
    outline: none;
    box-shadow: 0 3px 4px ${theme.DarkBlue};
  }
  ${media.custom(360)} {
    height: 100%;
    width: 80%;
  }
  ${media.phone} {
    font-size: 1.8rem;
  }
  ${media.tablet} {
    font-size: 2.2rem;
    padding-left: 10px;
    padding-top: 8px;
  }
`

const editModalButtonStyles = css`
  width: 80%;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  height: 35px;
  border-radius: 2px;
  background-color: transparent;
  transition: 0.2s;
  font-size: 1.8rem;
  box-shadow: 0 1px 3px black;
  ${focusStyles};
  ${media.custom(360)} {
    width: 70%;
  }
  ${media.phone} {
    box-shadow: none;
    width: 65%;
    height: 40px;
  }
  ${media.tablet} {
    &[aria-disabled='false'] {
      &:hover {
        color: ${theme.Blue};
        box-shadow: 0 2px 3px ${theme.DarkBlue};
        transform: translateY(-1px);
      }
      &:active {
        box-shadow: 0 2px 1px ${theme.DarkBlue};
        transform: translateY(1px);
      }
      width: 150px;
      height: 50px;
      font-size: 2.3rem;
      justify-self: center;
      margin: 0;
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
  &[aria-disabled='true'] {
    opacity: 0.3;
    box-shadow: none;
    cursor: not-allowed;
  }
  ${media.custom(360)} {
    margin-right: 1.7rem;
  }
  ${media.phone} {
    margin-right: 3.2rem;
  }
  ${media.tablet} {
    &[aria-disabled='false'] {
      &:hover {
        cursor: pointer;
        background-color: ${theme.Green};
      }
      margin-left: 20px;
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
    margin-right: 20px;
  }
`
