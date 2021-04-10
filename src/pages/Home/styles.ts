import styled, { keyframes, css } from 'styled-components/macro'
import { focusStyles } from 'styles'
import { media } from 'theme/media'
import { theme } from '../../theme/theme'
import { ReactComponent as WarningSVG } from 'assets/warning.svg'
import { ReactComponent as SmallSpinnerSVG } from 'assets/small-spinner.svg'

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
  height: 110rem;
  grid-template-rows: 9% 2% 12% 77%;
  ${media.phone} {
    height: 120rem;
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
  font-size: 3.3rem;
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
  width: 35rem;
  max-width: 90vw;
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
  ${media.phone} {
    width: 60rem;
    max-width: 90%;
  }
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
  padding-top: 3rem;
  font-size: 4rem;
  ${media.phone} {
    padding-top: 1rem;
  }
`

export const FormGroup = styled.div`
  position: relative;
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

export const ShowPasswordButton = styled.button`
  top: 50%;
  left: 87%;
  padding: 0.7rem 1rem;
  box-shadow: 0 0.1rem 0.3rem ${theme.Blue};
  font-weight: bold;
  position: absolute;
  transform: translate(-50%, -50%);
  color: ${theme.Blue};
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.1s;
  ${focusStyles};
  ${media.tablet} {
    &:hover {
      box-shadow: 0 0.2rem 0.5rem ${theme.Blue};
      transform: translate(-50%, -55%);
    }
    &:active {
      box-shadow: 0 0.1rem 0.3rem ${theme.Blue};
      transform: translate(-50%, -50%);
    }
  }
  ${media.custom(900)} {
    left: 93%;
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
  font-size: 1.9rem;
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  grid-area: errorMessage;
  color: ${theme.Pink};
  align-self: center;
  transform: translateY(-0.5rem);
  animation: ${errorAnim} 0.2s forwards;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ${(props) =>
    props.isLoginMode &&
    css`
      transform: translate(0);
      animation: ${errorAnim2} 0.2s forwards;
    `}

  ${media.phone} {
    font-size: 2rem;
    ${(props) =>
      props.isLoginMode &&
      css`
        font-size: 2.2rem;
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

const spin = keyframes`
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`

export const SmallSpinner = styled(SmallSpinnerSVG)`
  height: 1.7rem;
  width: 1.7rem;
  position: absolute;
  top: 28%;
  left: 88%;
  transform: translate(-50%, -50%);
  z-index: 5;
  fill: ${theme.Blue};
  animation: ${spin} 0.5s linear infinite;
`

export const WarningIcon = styled(WarningSVG)`
  fill: ${theme.Pink};
  height: 2rem;
  width: 2rem;
  margin-left: 1rem;
`
