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
} from './styles'
import { ReactComponent as AddTaskSVG } from 'assets/add-task.svg'

export const Board = () => (
  <BoardMain>
    <Title>Welcome Tiger Abrodi!</Title>
    <SubtitleWrapper>
      <Subtitle>Manage Your Tasks</Subtitle>
      <SubtitleHandWriting aria-hidden="true" />
    </SubtitleWrapper>
    <BoardWrapper>
      <BoardColumn aria-label="Todo column">
        <TotalTasks title="0">0</TotalTasks>
        <Status>Todo</Status>
        <AddTaskButton
          aria-label="Add a task to this column."
          aria-haspopup="true"
        >
          <AddTaskSVG aria-hidden="true" />
        </AddTaskButton>
        <InnerColumn />
      </BoardColumn>

      <BoardColumn aria-label="In progress column">
        <TotalTasks title="0">0</TotalTasks>
        <Status>In progress</Status>
        <AddTaskButton
          aria-label="Add a task to this column."
          aria-haspopup="true"
        >
          <AddTaskSVG aria-hidden="true" />
        </AddTaskButton>
        <InnerColumn />
      </BoardColumn>

      <BoardColumn aria-label="Done column">
        <TotalTasks title="0">0</TotalTasks>
        <Status>Done</Status>
        <AddTaskButton
          aria-label="Add a task to this column."
          aria-haspopup="true"
        >
          <AddTaskSVG aria-hidden="true" />
        </AddTaskButton>
        <InnerColumn />
      </BoardColumn>
    </BoardWrapper>
  </BoardMain>
)
