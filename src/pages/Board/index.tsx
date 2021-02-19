import * as React from 'react'
import {
  AddTaskButton,
  BoardColumn,
  BoardMain,
  BoardWrapper,
  InnerColumn,
  Status,
  Subtitle,
  SubtitleHandWriting,
  SubtitleWrapper,
  Title,
  TotalTasks,
  LogoutButton,
  Logout,
  AddTask,
} from './styles'

export const Board = () => {
  const [isAddTaskFormOpen] = React.useState(false)
  return (
    <>
      <LogoutButton aria-label="Logout">
        <Logout aria-hidden="true" />
      </LogoutButton>
      <BoardMain>
        <Title>Welcome Tiger Abrodi!</Title>
        <SubtitleWrapper>
          <Subtitle>Manage Your Tasks</Subtitle>
          <SubtitleHandWriting aria-hidden="true" />
        </SubtitleWrapper>
        <BoardWrapper>
          <BoardColumn aria-label="In progress column" tabIndex={1}>
            <TotalTasks title="0">0</TotalTasks>
            <Status>In progress</Status>
            <AddTaskButton
              aria-label="Add a task to this column."
              aria-expanded={isAddTaskFormOpen ? 'true' : 'false'}
            >
              <AddTask aria-hidden="true" />
            </AddTaskButton>
            <InnerColumn />
          </BoardColumn>
        </BoardWrapper>
      </BoardMain>
    </>
  )
}
