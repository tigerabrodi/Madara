import * as React from 'react'
import { useClickOutside } from 'hooks/useClickOutside'
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
  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

  const [cardMenuRef] = useClickOutside(() => setIsCardMenuOpen(false))
  const [editModalRef] = useClickOutside(() => setIsEditFormOpen(false))
  const [confirmationModalRef] = useClickOutside(() => setIsModalOpen(false))

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
    /* Add new Task */
  }

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    /* Submit edited Task with new text */
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
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleCardMenu()
                  }}
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
                  <CardMenu role="menu" ref={cardMenuRef}>
                    <CardMenuItem
                      role="menuitem"
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleEditModalForm()
                      }}
                    >
                      Edit Task
                    </CardMenuItem>
                    <CardMenuItem
                      role="menuitem"
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleModal()
                      }}
                    >
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
          <ConfirmationModal
            role="alertdialog"
            aria-modal="true"
            tabIndex={0}
            ref={confirmationModalRef}
          >
            <ConfirmationTitle>Are you sure?</ConfirmationTitle>
            <ConfirmationText>
              Do you really want to delete every task in this column?
            </ConfirmationText>
            <ConfirmButton>Yes</ConfirmButton>
            <CancelButton
              onClick={(event) => {
                event.stopPropagation()
                toggleModal()
              }}
            >
              No
            </CancelButton>
          </ConfirmationModal>
          <ModalOverlay aria-hidden="true" />
        </>
      )}

      {isEditFormOpen && (
        <>
          <EditModal role="dialog" aria-modal="true" ref={editModalRef}>
            <EditModalHeader>
              <EditTitle>Edit task</EditTitle>
              <EditCloseButton
                aria-label="Cancel edit"
                onClick={(event) => {
                  event.stopPropagation()
                  toggleEditModalForm()
                }}
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
                value={editTaskText}
              />
              <EditConfirmButton type="submit" disabled={editTaskText === ''}>
                Edit
              </EditConfirmButton>
              <EditCancelButton
                onClick={(event) => {
                  event.stopPropagation()
                  toggleEditModalForm()
                }}
                type="button"
              >
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
