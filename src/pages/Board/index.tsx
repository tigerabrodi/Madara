import * as React from 'react'
import {
  ToggleFormButton,
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
  Toggle,
  Card,
  CardMenuButton,
  CardMenuLogo,
  CardDate,
  CardLogo,
  CardText,
  AddTaskForm,
  AddTaskTextarea,
  FormAddButton,
  FormCancelButton,
} from './styles'

export const Board = () => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)
  const [addTaskText, setAddTaskText] = React.useState('')
  const [isCardMenuOpen, setIsCardMenuOpen] = React.useState(false)

  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddTaskText(event.target.value)
  }

  const handleAddTaskSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log({ addTaskText })
  }

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
            <ToggleFormButton
              aria-label="Add a task to this column."
              aria-expanded={isAddTaskFormOpen ? 'true' : 'false'}
              onClick={toggleTaskForm}
            >
              <Toggle aria-hidden="true" />
            </ToggleFormButton>
            <InnerColumn isFormOpen={isAddTaskFormOpen}>
              {isAddTaskFormOpen && (
                <AddTaskForm onSubmit={handleAddTaskSubmit}>
                  <AddTaskTextarea
                    name="Task"
                    aria-label="Enter a task"
                    placeholder="Enter a note"
                    required
                    onChange={handleTextareaChange}
                  />
                  <FormAddButton type="submit" disabled={addTaskText === ''}>
                    Add
                  </FormAddButton>
                  <FormCancelButton type="button" onClick={toggleTaskForm}>
                    Cancel
                  </FormCancelButton>
                </AddTaskForm>
              )}
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
