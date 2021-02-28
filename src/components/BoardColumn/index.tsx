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

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)
  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)

  return (
    <Column aria-label={`${columnType} column`} tabIndex={0}>
      <TotalTasks title="0">0</TotalTasks>
      <Status>{columnType}</Status>
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
          toggleEditModal={toggleEditModal}
          toggleMenu={toggleCardMenu}
          toggleConfirmationModal={toggleConfirmationModal}
        />
      </Inner>
    </Column>
  )
}
