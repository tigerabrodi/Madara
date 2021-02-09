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
  grid-template-rows: 15% 15% 70%;
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
`

export const Form = styled.form`
  grid-area: form;
  height: 60%;
  width: 50%;
  background-color: ${theme.Blue};
  border-radius: 0.2rem;
`
