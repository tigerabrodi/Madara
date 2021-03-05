import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as AddSVG } from 'assets/add-task.svg'
import { focusStyles } from 'styles'
import { media } from 'theme/media'

export const BoardColumn = styled.section`
  height: 95%;
  width: 100%;
  max-width: 36rem;
  grid-template-rows: 8%;
  border-radius: 0.3rem;
  background-color: ${theme.Blue};
  box-shadow: 0 0 1rem ${theme.Blue};
  display: grid;
  grid-template-areas:
    'totalTasks toggleFormButton'
    'inner inner';
  align-content: flex-start;
  align-items: center;
  justify-items: flex-end;
  overflow-y: auto;
  ${focusStyles};
  ${media.phone} {
    grid-template-columns: 10% 76% 14%;
    grid-template-areas:
      'totalTasks status toggleFormButton'
      'inner inner inner';
    border-radius: 0.5rem;
    height: 90%;
    width: 30%;
    max-width: 40rem;
    min-width: 35rem;
    grid-template-rows: 7%;
  }
`

export const TotalTasks = styled.span`
  justify-self: flex-start;
  margin-left: 1.5rem;
  padding: 0 0.6rem;
  border-radius: 2em;
  font-size: 2rem;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  grid-area: totalTasks;
  background-color: ${theme.LightBlue};
  color: ${theme.Blue};
  ${media.phone} {
    margin-left: 0;
    justify-self: flex-end;
  }
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
  justify-self: flex-end;
  margin-right: 1rem;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  ${focusStyles};
  ${media.phone} {
    justify-self: center;
    margin-right: 0;
  }
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
