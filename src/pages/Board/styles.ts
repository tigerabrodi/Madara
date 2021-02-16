import styled from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as HandWriting } from 'assets/hand-writing.svg'

export const BoardMain = styled.main`
  grid-area: main;
  display: grid;
  width: 100%;
  height: calc(100vh - 8rem);
  grid-template-areas:
    'title'
    'subtitle'
    'board';
  justify-items: center;
  align-items: center;
  grid-template-rows: 10% 7% 83%;
`

export const Title = styled.h1`
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  font-size: 6.4rem;
`

export const SubtitleWrapper = styled.div`
  grid-area: subtitle;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 53.7rem;
`

export const Subtitle = styled.h2`
  font-size: 4.8rem;
  font-family: ${theme.SourceSansPro};
  color: ${theme.Blue};
  font-weight: 600;
`

export const SubtitleHandWriting = styled(HandWriting)`
  height: 6.5rem;
  width: 6.5rem;
  position: relative;
  bottom: 0.5rem;
  fill: ${theme.Blue};
`

export const BoardWrapper = styled.section`
  height: 95%;
  width: 100%;
  grid-area: board;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
`

export const BoardColumn = styled.section`
  height: 90%;
  width: 30%;
  max-width: 39.5rem;
  min-width: 30rem;
  background-color: ${theme.Blue};
  box-shadow: 0 0 1rem ${theme.Blue};
  display: grid;
  grid-template-areas:
    'totalTasks status status addTaskButton'
    'innerColumn innerColumn innerColumn innerColumn';
  grid-template-rows: 5% minmax(95%, auto);
  overflow-y: scroll;
`

export const TotalTasks = styled.span`
  grid-area: totalTasks;
`

export const Status = styled.h3`
  grid-area: status;
`

export const AddTaskButton = styled.button`
  grid-area: addTaskButton;
`

export const InnerColumn = styled.section`
  grid-area: innerColumn;
`
