import * as React from 'react'
import {
  ToggleFormButton,
  BoardColumn,
  BoardMain,
  BoardWrapper,
  Inner,
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
  CardMenu,
  CardMenuItem,
  ConfirmationModal,
  ModalOverlay,
  ConfirmationTitle,
  ConfirmationText,
  ConfirmButton,
  CancelButton,
  EditModal,
  EditModalHeader,
  EditModalForm,
  EditTitle,
  EditClose,
  EditCloseButton,
  EditCancelButton,
  EditConfirmButton,
  EditLabel,
  EditTextarea,
} from './styles'

export const Board = () => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)
  const [addTaskText, setAddTaskText] = React.useState('')
  const [editTaskText, setEditTaskText] = React.useState(
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed sea takimata sanctus est Lorem ipsum dolor sit amet.'
  )
  const [isCardMenuOpen, setIsCardMenuOpen] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)
  const toggleEditForm = () => setIsEditFormOpen(!isEditFormOpen)

  const handleAddTaskTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddTaskText(event.target.value)
  }

  const handleEditTaskChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditTaskText(event.target.value)
  }

  const handleAddTaskSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log({ addTaskText })
  }

  const handleEditSubmit = (event: React.FormEvent) => {
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
            <Inner isFormOpen={isAddTaskFormOpen}>
              {isAddTaskFormOpen && (
                <AddTaskForm onSubmit={handleAddTaskSubmit}>
                  <AddTaskTextarea
                    name="Task"
                    aria-label="Enter a task"
                    placeholder="Enter a task"
                    required
                    onChange={handleAddTaskTextChange}
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
                {isCardMenuOpen && (
                  <CardMenu role="menu">
                    <CardMenuItem role="menuitem" onClick={toggleEditForm}>
                      Edit Task
                    </CardMenuItem>
                    <CardMenuItem role="menuitem" onClick={toggleModal}>
                      Delete Task
                    </CardMenuItem>
                  </CardMenu>
                )}
              </Card>
            </Inner>
          </BoardColumn>
        </BoardWrapper>
      </BoardMain>

      {isModalOpen && (
        <>
          <ConfirmationModal role="alertdialog" aria-modal="true" tabIndex={0}>
            <ConfirmationTitle>Are you sure?</ConfirmationTitle>
            <ConfirmationText>
              Do you really want to delete every task in this column?
            </ConfirmationText>
            <ConfirmButton>Yes</ConfirmButton>
            <CancelButton onClick={toggleModal}>No</CancelButton>
          </ConfirmationModal>
          <ModalOverlay aria-hidden="true" />
        </>
      )}

      {isEditFormOpen && (
        <>
          <EditModal role="dialog" aria-modal="true">
            <EditModalHeader>
              <EditTitle>Edit task</EditTitle>
              <EditCloseButton
                aria-label="Cancel edit"
                onClick={toggleEditForm}
              >
                <EditClose aria-hidden="true" />
              </EditCloseButton>
            </EditModalHeader>
            <EditModalForm onSubmit={handleEditSubmit}>
              <EditLabel htmlFor="taskText">Task</EditLabel>
              <EditTextarea
                id="taskText"
                name="Task"
                placeholder="Edit your task"
                aria-label="Edit your task"
                onChange={handleEditTaskChange}
              >
                {editTaskText}
              </EditTextarea>
              <EditConfirmButton type="submit" disabled={editTaskText === ''}>
                Edit
              </EditConfirmButton>
              <EditCancelButton onClick={toggleEditForm} type="button">
                Cancel
              </EditCancelButton>
            </EditModalForm>
          </EditModal>
          <ModalOverlay aria-hidden="true" />
        </>
      )}
    </>
  )
}
