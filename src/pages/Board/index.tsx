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
  Card,
  CardMenuButton,
  CardMenuLogo,
  CardDate,
  CardLogo,
  CardText,
  AddTaskForm,
} from './styles'

export const Board = () => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)
  const [isCardMenuOpen, setIsCardMenuOpen] = React.useState(false)

  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)

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
          <BoardColumn aria-label="In progress column" tabIndex={0}>
            <TotalTasks title="0">0</TotalTasks>
            <Status>In progress</Status>
            <AddTaskButton
              aria-label="Add a task to this column."
              aria-expanded={isAddTaskFormOpen ? 'true' : 'false'}
              onClick={toggleTaskForm}
            >
              <AddTask aria-hidden="true" />
            </AddTaskButton>
            <InnerColumn isFormOpen={isAddTaskFormOpen}>
              {isAddTaskFormOpen && <AddTaskForm />}
              <Card tabIndex={0}>
                <CardLogo aria-hidden="true" />
                <CardMenuButton
                  aria-label={
                    isCardMenuOpen ? 'Close card menu' : 'Open card menu'
                  }
                  aria-haspopup="menu"
                  onClick={toggleCardMenu}
                >
                  <CardMenuLogo aria-hidden="true" />
                </CardMenuButton>
                <CardText>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  sea takimata sanctus est Lorem ipsum dolor sit amet.
                </CardText>
                <CardDate
                  aria-label={`Created at ${new Date().toLocaleDateString()}`}
                >
                  Created at {new Date().toLocaleDateString()}
                </CardDate>
              </Card>
            </InnerColumn>
          </BoardColumn>
        </BoardWrapper>
      </BoardMain>
    </>
  )
}
