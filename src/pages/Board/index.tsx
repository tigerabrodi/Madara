import * as React from 'react'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { EditModal } from 'components/EditModal'
import { Card } from 'components/Card'
import { AddTaskForm } from 'components/AddTaskForm'
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
} from './styles'

export const Board = () => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)

  const [isCardMenuOpen, setIsCardMenuOpen] = React.useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)
  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)
  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)
  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

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
          <BoardColumn aria-label="Todo column" tabIndex={0}>
            <TotalTasks title="0">0</TotalTasks>
            <Status>Todo</Status>
            <ToggleFormButton
              aria-label="Add a task to this column."
              aria-expanded={isAddTaskFormOpen ? 'true' : 'false'}
              onClick={toggleTaskForm}
            >
              <Toggle aria-hidden="true" />
            </ToggleFormButton>
            <Inner isFormOpen={isAddTaskFormOpen}>
              {isAddTaskFormOpen && <AddTaskForm toggleForm={toggleTaskForm} />}
              <Card
                setMenuOpen={setIsCardMenuOpen}
                isMenuOpen={isCardMenuOpen}
                toggleEditModal={toggleEditModalForm}
                toggleMenu={toggleCardMenu}
                toggleConfirmationModal={toggleConfirmationModal}
              />
            </Inner>
          </BoardColumn>
        </BoardWrapper>
      </BoardMain>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          setOpen={setIsConfirmationModalOpen}
          toggleModal={toggleConfirmationModal}
          text="Do you really want to delete every task in this column?"
        />
      )}

      {isEditFormOpen && (
        <EditModal
          setOpen={setIsEditFormOpen}
          toggleModal={toggleEditModalForm}
          taskText="Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      )}
    </>
  )
}
