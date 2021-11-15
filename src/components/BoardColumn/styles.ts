import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as AddSVG } from 'assets/add-tasks.svg'
import { ReactComponent as DeleteSVG } from 'assets/delete-tasks.svg'
import { ReactComponent as StopReorderSVG } from 'assets/stop-reorder.svg'
import { ReactComponent as StartReorderSVG } from 'assets/start-reorder.svg'
import { focusStyles } from 'styles'
import { media } from 'theme/media'

export const Column = styled.section`
  height: 95%;
  width: 95%;
  max-width: 36rem;
  grid-template-rows: 10%;
  border-radius: 0.3rem;
  background-color: ${theme.Blue};
  box-shadow: 0 0 1rem ${theme.Blue};
  display: grid;
  grid-template-columns: 15% 65% 20%;
  grid-template-areas:
    'totalTasks deleteAllTasksButton toggleFormButton'
    'inner inner inner';
  align-content: flex-start;
  align-items: center;
  justify-items: flex-end;
  overflow-y: auto;
  ${focusStyles};
  ${media.phone} {
    grid-template-columns: 10% 68% 10% 10%;
    grid-template-areas:
      'totalTasks status deleteAllTasksButton toggleFormButton'
      'inner inner inner inner';
    border-radius: 0.5rem;
    height: 90%;
    width: 30%;
    max-width: 38rem;
    min-width: 35rem;
    grid-template-rows: 7%;
  }
  ${media.desktop} {
    height: 97%;
    max-width: 400px;
    row-gap: 10px;
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

export const Status = styled.h2`
  grid-area: status;
  justify-self: flex-start;
  font-size: 2.2rem;
  border-radius: 0.5rem;
  padding-left: 1rem;
  font-weight: 600;
  font-family: ${theme.SourceSansPro};
  color: ${theme.LightBlue};
  @media (max-width: 425px) {
    display: none;
  }
`

export const ToggleFormButton = styled.button`
  grid-area: toggleFormButton;
  background: transparent;
  border: none;
  display: flex;
  justify-self: flex-end;
  margin-right: 1.4rem;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  width: 27px;
  height: 27px;
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

export const DeleteAllTasksButton = styled.button`
  grid-area: deleteAllTasksButton;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  justify-self: flex-end;
  ${focusStyles};

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
  ${media.phone} {
    justify-self: center;
  }
`

export const Delete = styled(DeleteSVG)`
  width: 100%;
  height: 100%;
`

export const Inner = styled.div<{ isFormOpen: boolean }>`
  grid-area: inner;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  padding-bottom: 0.5rem;
  max-height: 100%;
  ${(props) =>
    props.isFormOpen &&
    css`
      justify-content: stretch;
    `}
`

export const DroppableCardList = styled.div`
  width: 90%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  row-gap: 10px;
  ${media.desktop} {
    row-gap: 15px;
  }
`

export const ReorderButton = styled.button`
  height: 6rem;
  width: 6rem;
  z-index: 50;
  background-color: var(--lightBlue);
  border-radius: 50%;
  box-shadow: 0 0.1rem 0.5rem ${theme.Black};
  position: fixed;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  top: 80%;
  bottom: 0;
  right: 7%;
  margin: auto;
  ${media.phone} {
    display: none;
  }
  ${focusStyles};
`

export const StartReorder = styled(StartReorderSVG)`
  height: 3.3rem;
  width: 3.3rem;
`

export const StopReorder = styled(StopReorderSVG)`
  height: 27px;
  width: 27px;
`
