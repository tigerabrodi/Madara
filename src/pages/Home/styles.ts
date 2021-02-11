import styled from 'styled-components/macro'
import { theme } from '../../theme/theme'

export const HomeMain = styled.main`
  grid-area: main;
  display: grid;
  height: calc(100vh - 8rem);
  width: 100%;
  grid-template-areas:
    'title'
    'subtitle'
    'form';
  justify-items: center;
  align-items: center;
  grid-template-rows: 15% 7% 78%;
`

export const Title = styled.h1`
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  font-size: 9.6rem;
`

export const Subtitle = styled.h2`
  grid-area: subtitle;
  font-family: ${theme.SourceSansPro};
  font-size: 3.5rem;
  font-weight: 600;
  color: ${theme.Blue};
  text-decoration: underline;
`

export const Form = styled.form`
  grid-area: form;
  background-color: ${theme.Blue};
  border-radius: 0.2rem;
  box-shadow: 0 0 1rem var(--blue);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 95%;
  width: 85rem;
`

export const FormTitle = styled.h1`
  font-family: ${theme.LibreBaskerville};
  color: ${theme.White};
  font-size: 4rem;
`

export const FormGroup = styled.div`
  height: 13rem;
  width: 60%;
  display: grid;
  grid-template-areas:
    'label'
    'input'
    'errorMessage';
  justify-items: center;
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
  border: none;
  border-radius: 0.2rem;
  grid-area: input;
  background-color: ${theme.White};
  width: 100%;
  height: 100%;
`

export const ErrorMessage = styled.span`
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  font-size: 1.7rem;
  grid-area: errorMessage;
  color: ${theme.Pink};
  align-self: center;
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
`

export const SwitchButton = styled.button`
  text-decoration: underline;
  color: ${theme.White};
  font-family: ${theme.SourceSansPro};
  font-weight: bold;
  background-color: transparent;
  border: none;
`

export const SwitchButtonHighlight = styled.span`
  font-size: 1.5rem;
`
