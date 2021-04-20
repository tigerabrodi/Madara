import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { focusStyles } from 'styles'
import { media } from 'theme/media'

export const Form = styled.form`
  background: transparent;
  width: 90%;
  height: 15rem;
  display: grid;
  grid-template-areas:
    'textarea textarea'
    'addButton cancelButton';
  grid-template-rows: 69% 25%;
  grid-template-columns: 50% 50%;
  align-items: center;
  row-gap: 1rem;
  margin-bottom: 1.5rem;
`

export const AddTaskTextarea = styled.textarea`
  grid-area: textarea;
  height: 100%;
  width: 100%;
  background: ${theme.White};
  color: ${theme.Blue};
  border-radius: 0.5rem;
  font-family: ${theme.SourceSansPro};
  font-size: 1.8rem;
  padding: 0.7rem 0 0 1rem;
  font-weight: 600;
  transition: 0.2s;
  &::placeholder {
    color: ${theme.Blue};
    opacity: 0.7;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0.3rem 0.4rem ${theme.DarkBlue};
  }
`

const formButtonStyles = css`
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  font-size: 1.8rem;
  height: 3.5rem;
  box-shadow: 0 0.1rem 0.3rem black;
  width: 13rem;
  border-radius: 0.2rem;
  background-color: transparent;
  transition: 0.2s;
  ${focusStyles};
  ${media.phone} {
    box-shadow: none;
  }
  ${media.tablet} {
    &:hover {
      color: ${theme.Blue};
      box-shadow: 0 0.2rem 0.3rem ${theme.DarkBlue};
      transform: translateY(-0.1rem);
    }
    &:active {
      box-shadow: 0 0.2rem 0.1rem ${theme.DarkBlue};
      transform: translateY(0.1rem);
    }
  }
`

export const FormAddButton = styled.button`
  ${formButtonStyles};
  grid-area: addButton;
  border: 0.2rem solid ${theme.Green};
  color: ${theme.Green};
  &:disabled {
    box-shadow: none;
    opacity: 0.3;
  }
  ${media.tablet} {
    &:hover:not(:disabled) {
      cursor: pointer;
      background-color: ${theme.Green};
    }
  }
`

export const FormCancelButton = styled.button`
  ${formButtonStyles};
  grid-area: cancelButton;
  border: 0.2rem solid ${theme.Pink};
  color: ${theme.Pink};
  justify-self: end;
  cursor: pointer;
  ${media.tablet} {
    &:hover {
      background-color: ${theme.Pink};
    }
  }
`
