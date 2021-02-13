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
    'form';
  justify-items: center;
  min-height: calc(100vh - 8rem);
  row-gap: 1rem;
  grid-template-rows: 11% 3% 86%;
  padding-bottom: 5rem;
  align-items: flex-end;
  ${media.phone} {
    height: calc(100vh - 8rem);
    grid-template-rows: 15% 7% 78%;
    align-items: flex-start;
  }
`

export const Title = styled.h1`
  font-size: 5.6rem;
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  align-self: flex-end;
  ${media.phone} {
    font-size: 9.6rem;
  }
`

export const Subtitle = styled.h2`
  grid-area: subtitle;
  font-family: ${theme.SourceSansPro};
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.Blue};
  text-decoration: underline;
  ${media.phone} {
    font-size: 3.5rem;
  }
`

export const Form = styled.form<{ isLoginMode: boolean }>`
  grid-area: form;
  background-color: ${theme.Blue};
  border-radius: 0.2rem;
  box-shadow: 0 0 1rem var(--blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 65rem;
  width: 95%;
  ${(props) =>
    props.isLoginMode &&
    css`
      height: 50rem;
    `}
  ${media.phone} {
    height: 95%;
  }
  ${media.custom(900)} {
    width: 85rem;
  }
`

export const FormTitle = styled.h1`
  font-size: 3rem;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.White};
  ${media.phone} {
    font-size: 4rem;
  }
`

export const FormGroup = styled.div`
  width: 90%;
  height: 14rem;
  display: grid;
  grid-template-areas:
    'label'
    'input'
    'errorMessage';
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  ${media.phone} {
    width: 80%;
  }
  ${media.custom(700)} {
    width: 60%;
  }
`

export const Label = styled.label`
  grid-area: label;
  color: ${theme.White};
  font-weight: bold;
  font-size: 2rem;
  font-family: ${theme.SourceSansPro};
  justify-self: start;
  align-self: center;
`

export const Input = styled.input`
  height: 80%;
  align-self: center;
  border: none;
  border-radius: 0.2rem;
  grid-area: input;
  background-color: ${theme.White};
  width: 100%;
  color: ${theme.Blue};
  padding-left: 2rem;
  font-size: 2rem;
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  &:focus {
    outline: none;
    box-shadow: 0 0 0.5rem ${theme.Black};
  }
  ${media.phone} {
    height: 100%;
  }
`

const errorAnim = keyframes`
  to {
    transform: translateY(0rem);
  }
`

export const ErrorMessage = styled.span`
  font-size: 1.4rem;
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  grid-area: errorMessage;
  color: ${theme.Pink};
  align-self: center;
  transform: translateY(-0.5rem);
  animation: ${errorAnim} 0.2s forwards;
  ${media.phone} {
    font-size: 1.7rem;
  }
`

export const SubmitButton = styled.button`
  font-family: ${theme.SourceSansPro};
  background-color: ${theme.White};
  color: ${theme.Blue};
  border: none;
  width: 13rem;
  height: 4.5rem;
  font-weight: bold;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.4s;
  box-shadow: 0 0.1rem 0.2rem black;
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

export const SwitchButton = styled.button`
  color: ${theme.White};
  font-family: ${theme.SourceSansPro};
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  ${focusStyles};
  text-decoration: underline;
  ${media.tablet} {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

export const SwitchButtonHighlight = styled.span`
  font-size: 1.7rem;
  font-weight: bold;
`
