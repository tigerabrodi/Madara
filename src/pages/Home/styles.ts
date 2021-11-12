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
  padding-bottom: 5rem;
  align-items: flex-end;
  min-height: calc(100vh - 8rem);
`

export const Title = styled.h1`
  text-align: center;
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  align-self: flex-end;
  font-size: 5rem;
  margin-top: 10px;
  ${media.phone} {
    margin-top: 20px;
    font-size: 9rem;
  }
`

export const Subtitle = styled.p`
  grid-area: subtitle;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  color: ${theme.Blue};
  text-decoration: underline;
  font-size: 2.2rem;
  ${media.phone} {
    font-size: 3.5rem;
    margin-bottom: 20px;
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
  padding-bottom: 20px;
  width: min(95%, 800px);
  ${media.phone} {
    min-height: 700px;
  }
`

export const ToolBar = styled.div`
  grid-area: toolbar;
  width: 35rem;
  max-width: 90vw;
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
  height: 65px;
  ${media.phone} {
    height: 100px;
    width: min(70rem, 90%);
  }
`

const toolbarButtonHighlightStyles = css`
  color: ${theme.Blue};
  background-color: ${theme.LightBlue};
  transform: translateY(-0.2rem);
  box-shadow: 0 0.1rem 0.3rem ${theme.Black};
`

export const ToolBarButton = styled.button`
  font-weight: 600;
  background-color: transparent;
  border: 0.2rem solid ${theme.LightBlue};
  border-radius: 0.2rem;
  color: ${theme.LightBlue};
  font-family: ${theme.SourceSansPro};
  cursor: pointer;
  transition: 0.2s;
  height: 40px;
  width: 90px;
  font-size: 1.8rem;
  ${focusStyles};
  &[aria-pressed='true'] {
    ${toolbarButtonHighlightStyles}
  }
  ${media.phone} {
    font-size: 2.5rem;
    width: 120px;
    height: 55px;
    &:hover {
      ${toolbarButtonHighlightStyles}
    }
  }
`

export const FormTitle = styled.h2`
  font-family: ${theme.LibreBaskerville};
  color: ${theme.White};
  font-size: 3rem;
  padding-top: 3.5rem;
  ${media.phone} {
    padding-top: 50px;
    font-size: 4rem;
  }
`

export const FormGroup = styled.div`
  position: relative;
  width: 90%;
  display: grid;
  grid-template-areas:
    'label'
    'input'
    'errorMessage';
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  height: 130px;
  &:first-of-type {
    margin-top: 15px;
  }
  ${media.phone} {
    width: 70%;
    height: 160px;
  }
`

export const Label = styled.label`
  grid-area: label;
  color: ${theme.White};
  font-weight: bold;
  font-family: ${theme.SourceSansPro};
  justify-self: start;
  align-self: center;
  font-size: 1.8rem;
  ${media.phone} {
    font-size: 2.3rem;
  }
`

export const Input = styled.input`
  align-self: center;
  border: none;
  border-radius: 0.2rem;
  grid-area: input;
  background-color: ${theme.White};
  width: 100%;
  color: ${theme.Blue};
  padding-left: 1rem;
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  font-size: 1.5rem;
  height: 40px;
  &::placeholder {
    font-style: italic;
    color: ${theme.Blue};
    opacity: 1;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0.5rem ${theme.Black};
  }
  ${media.phone} {
    font-size: 1.8rem;
    padding-left: 1.3rem;
    height: 90%;
  }
`

export const ShowPasswordButton = styled.button`
  top: 50%;
  right: 0;
  transform: translate(-10px, -50%);
  box-shadow: 0 0.1rem 0.3rem ${theme.Blue};
  font-weight: bold;
  position: absolute;
  color: ${theme.Blue};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.1s;
  font-size: 1.2rem;
  padding: 6px 10px;
  ${focusStyles};
  ${media.phone} {
    font-size: 1.7rem;
  }
  ${media.tablet} {
    &:hover {
      box-shadow: 0 0.2rem 0.5rem ${theme.Blue};
      transform: translate(-10px, -55%);
    }
    &:active {
      box-shadow: 0 0.1rem 0.3rem ${theme.Blue};
      transform: translate(-10px, -50%);
    }
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
  font-size: 1.2rem;
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
    font-size: 1.5rem;
  }
  ${media.tablet} {
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
  font-family: ${theme.SourceSansPro};
  background-color: ${theme.White};
  color: ${theme.Blue};
  border: none;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0.1rem 0.2rem black;
  transition: transform 0.2s, box-shadow 0.4s;
  border-radius: 0.2rem;
  font-size: 2rem;
  height: 45px;
  width: 105px;
  margin-top: 10px;
  ${focusStyles};
  ${media.phone} {
    font-size: 2.8rem;
    width: 145px;
    height: 60px;
  }
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
  height: 1.6rem;
  width: 1.6rem;
  margin-left: 1rem;
  ${media.tablet} {
    height: 2.2rem;
    width: 2.2rem;
  }
`
