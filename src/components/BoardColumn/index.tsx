import * as React from 'react'
import { Card } from 'components/Card'
import { ColumnType } from 'types'
import { AddTaskForm } from 'components/AddTaskForm'
import {
  BoardColumn as Column,
  ToggleFormButton,
  Inner,
  Status,
  TotalTasks,
  Toggle,
} from './styles'

/* TODO 
   Get Tasks as prop. 
   Update aria-label of column with proper amount of tasks.
   Map out tasks.
*/

type ColumnProps = {
  toggleConfirmationModal: () => void
  toggleEditModal: () => void
  columnType: ColumnType
}

export const BoardColumn = ({
  toggleConfirmationModal,
  toggleEditModal,
  columnType,
}: ColumnProps) => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)
  const [isCardMenuOpen, setIsCardMenuOpen] = React.useState(false)

  const toggleFormButtonRef = React.useRef<HTMLButtonElement>(null)

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)
  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)

  const handleAddTaskFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleCancelFormButtonPress = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === 'Enter') {
      toggleFormButtonRef.current?.focus()
    }
  }

  return (
    <Column aria-label={`${columnType} column with 2 tasks`} tabIndex={0}>
      <TotalTasks aria-hidden="true">0</TotalTasks>
      <Status>{columnType}</Status>
      <ToggleFormButton
        aria-label="Add a task to this column."
        aria-expanded={isAddTaskFormOpen ? 'true' : 'false'}
        onClick={toggleTaskForm}
        ref={toggleFormButtonRef}
      >
        <Toggle aria-hidden="true" />
      </ToggleFormButton>
      <Inner isFormOpen={isAddTaskFormOpen}>
        {isAddTaskFormOpen && (
          <AddTaskForm
            toggleForm={toggleTaskForm}
            onSuccess={handleAddTaskFormSubmit}
            handleCancelFormButtonPress={handleCancelFormButtonPress}
          />
        )}
        <Card
          setMenuOpen={setIsCardMenuOpen}
          isMenuOpen={isCardMenuOpen}
          toggleEditModal={toggleEditModal}
          toggleMenu={toggleCardMenu}
          toggleConfirmationModal={toggleConfirmationModal}
        />
      </Inner>
    </Column>
  )
}
