import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as AddSVG } from 'assets/add-task.svg'
import { focusStyles } from 'styles'

export const BoardColumn = styled.section`
  height: 90%;
  width: 30%;
  max-width: 40rem;
  min-width: 35rem;
  background-color: ${theme.Blue};
  box-shadow: 0 0 1rem ${theme.Blue};
  display: grid;
  grid-template-areas:
    'totalTasks status toggleFormButton'
    'inner inner inner';
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 7%;
  align-content: flex-start;
  align-items: center;
  justify-items: flex-end;
  border-radius: 0.5rem;
  overflow-y: auto;
  ${focusStyles};
`

export const TotalTasks = styled.span`
  grid-area: totalTasks;
  padding: 0 0.6rem;
  background-color: ${theme.LightBlue};
  border-radius: 2em;
  font-size: 2rem;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  color: ${theme.Blue};
`

export const Status = styled.h3`
  grid-area: status;
  justify-self: flex-start;
  font-size: 2rem;
  border-radius: 0.5rem;
  padding-left: 1rem;
  font-weight: 600;
  font-family: ${theme.SourceSansPro};
  color: ${theme.LightBlue};
`

export const ToggleFormButton = styled.button`
  grid-area: toggleFormButton;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  ${focusStyles};
`

export const Toggle = styled(AddSVG)`
  width: 100%;
  height: 100%;
`

export const Inner = styled.section<{ isFormOpen: boolean }>`
  grid-area: inner;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  padding-bottom: 0.5rem;
  max-height: 100%;
  ${(props) =>
    props.isFormOpen &&
    css`
      justify-content: stretch;
    `}
`
