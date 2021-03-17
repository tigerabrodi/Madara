import styled, { keyframes, css } from 'styled-components/macro'
import { focusStyles } from 'styles'
import { media } from 'theme/media'
import { theme } from '../../theme/theme'

export const HomeMain = styled.main`
  grid-area: main;
  display: grid;
  width: 100%;
  grid-template-areas:
    'title'
    'subtitle'
    'toolbar'
    'form';
  justify-items: center;
  row-gap: 1rem;
  padding-bottom: 5rem;
  align-items: flex-end;
  height: 100rem;
  grid-template-rows: 9% 3% 12% 76%;
  ${media.phone} {
    height: 115rem;
    grid-template-rows: 11% 4% 12% 73%;
    align-items: flex-start;
  }
`

export const Title = styled.h1`
  font-size: 7rem;
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  align-self: flex-end;
  ${media.phone} {
    font-size: 9.6rem;
  }
`

export const Subtitle = styled.p`
  grid-area: subtitle;
  font-family: ${theme.SourceSansPro};
  font-size: 3rem;
  font-weight: 600;
  color: ${theme.Blue};
  text-decoration: underline;
  ${media.phone} {
    font-size: 3.5rem;
  }
`

export const Form = styled.form`
  grid-area: form;
  height: 100%;
  align-self: flex-start;
  background-color: ${theme.Blue};
  border-radius: 0.2rem;
  box-shadow: 0 0 1rem ${theme.Blue};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  ${media.custom(900)} {
    width: 85rem;
  }
`

export const ToolBar = styled.div`
  grid-area: toolbar;
  width: 60rem;
  max-width: 90%;
  height: 90%;
  background-color: ${theme.Blue};
  align-self: flex-end;
  border-radius: 0.2em;
  position: relative;
  bottom: -2rem;
  box-shadow: 0 0.2rem 0.3rem ${theme.Black};
  z-index: 5;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const toolbarButtonHighlightStyles = css`
  color: ${theme.Blue};
  background-color: ${theme.LightBlue};
  transform: translateY(-0.2rem);
  box-shadow: 0 0.1rem 0.3rem ${theme.Black};
`

export const ToolBarButton = styled.button<{
  isRegisterButton?: boolean
  isLoginMode: boolean
}>`
  width: 13rem;
  height: 6rem;
  font-size: 2.5rem;
  font-weight: 600;
  background-color: transparent;
  border: 0.2rem solid ${theme.LightBlue};
  border-radius: 0.2rem;
  color: ${theme.LightBlue};
  font-family: ${theme.SourceSansPro};
  cursor: pointer;
  transition: 0.2s;
  ${focusStyles};
  ${(props) =>
    !props.isLoginMode && props.isRegisterButton
      ? css`
          ${toolbarButtonHighlightStyles}
        `
      : props.isLoginMode && !props.isRegisterButton
      ? css`
          ${toolbarButtonHighlightStyles}
        `
      : null};
  ${media.tablet} {
    &:hover {
      ${toolbarButtonHighlightStyles}
    }
  }
`

export const FormTitle = styled.h2`
  font-family: ${theme.LibreBaskerville};
  color: ${theme.White};
  font-size: 4rem;
`

export const FormGroup = styled.div`
  width: 90%;
  height: 15rem;
  display: grid;
  grid-template-areas:
    'label'
    'input'
    'errorMessage';
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  ${media.phone} {
    width: 80%;
    height: 14rem;
  }
  ${media.custom(700)} {
    width: 60%;
  }
`

export const Label = styled.label`
  grid-area: label;
  color: ${theme.White};
  font-weight: bold;
  font-size: 2.5rem;
  font-family: ${theme.SourceSansPro};
  justify-self: start;
  align-self: center;
`

export const Input = styled.input`
  height: 100%;
  align-self: center;
  border: none;
  border-radius: 0.2rem;
  grid-area: input;
  background-color: ${theme.White};
  width: 100%;
  color: ${theme.Blue};
  padding-left: 1rem;
  font-size: 2rem;
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  &::placeholder {
    font-style: italic;
    color: ${theme.Blue};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0.5rem ${theme.Black};
  }
  ${media.phone} {
    padding-left: 2rem;
  }
`

const errorAnim = keyframes`
  to {
    transform: translateY(0rem);
  }
`

const errorAnim2 = keyframes`
  to {
    transform: translateY(1rem);
  }
`

const errorAnim2Tablet = keyframes`
  to {
    transform: translateY(2rem);
  }
`

export const ErrorMessage = styled.span<{ isLoginMode?: boolean }>`
  font-size: 1.4rem;
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  grid-area: errorMessage;
  color: ${theme.Pink};
  align-self: center;
  transform: translateY(-0.5rem);
  animation: ${errorAnim} 0.2s forwards;
  ${(props) =>
    props.isLoginMode &&
    css`
      transform: translate(0);
      font-size: 1.7rem;
      animation: ${errorAnim2} 0.2s forwards;
    `}

  ${media.phone} {
    font-size: 1.7rem;
    ${(props) =>
      props.isLoginMode &&
      css`
        font-size: 2rem;
        animation: ${errorAnim2Tablet} 0.2s forwards;
      `}
  }
`

export const SubmitButton = styled.button`
  position: relative;
  font-family: ${theme.SourceSansPro};
  background-color: ${theme.White};
  color: ${theme.Blue};
  border: none;
  width: 15rem;
  height: 6rem;
  font-weight: bold;
  font-size: 2.5rem;
  cursor: pointer;
  box-shadow: 0 0.1rem 0.2rem black;
  transition: transform 0.2s, box-shadow 0.4s;
  top: -1rem;
  border-radius: 0.2rem;
  ${focusStyles};
  ${media.tablet} {
    box-shadow: none;
    &:hover {
      transform: translateY(-0.3rem);
      box-shadow: 0 0.2rem 0.5rem ${theme.Black};
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0 0 0.5rem ${theme.Black};
    }
  }
`
