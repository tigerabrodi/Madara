import * as React from 'react'
import firebase from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Card } from 'components/Card'
import { ColumnType, TaskType } from 'types'
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
  isNotMobileLayout: boolean
}

export const BoardColumn = ({
  toggleConfirmationModal,
  toggleEditModal,
  columnType,
  isNotMobileLayout,
}: ColumnProps) => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)
  const [isCardMenuOpen, setIsCardMenuOpen] = React.useState(false)

  const toggleFormButtonRef = React.useRef<HTMLButtonElement>(null)

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)
  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)

  const userId = firebase.auth().currentUser?.uid

  const userTasksCollection = firebase
    .firestore()
    .collection('tasks')
    .where('columnType', '==', columnType)
    .where('userId', '==', userId)

  const [tasks] = useCollectionData<TaskType>(userTasksCollection)

  const columnId = columnType.replace(/\s/g, '-')
  const totalTasks = tasks?.length || 0

  return (
    <Column
      role={isNotMobileLayout ? 'region' : 'tabpanel'}
      id={isNotMobileLayout ? undefined : columnId}
      aria-label={`${columnType} column with ${totalTasks} tasks`}
      tabIndex={0}
    >
      <TotalTasks aria-hidden="true">{totalTasks}</TotalTasks>
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
          <AddTaskForm setOpen={setIsAddTaskFormOpen} columnType={columnType} />
        )}
        {tasks &&
          tasks.map((task) => (
            <Card
              setMenuOpen={setIsCardMenuOpen}
              isMenuOpen={isCardMenuOpen}
              toggleEditModal={toggleEditModal}
              toggleMenu={toggleCardMenu}
              toggleConfirmationModal={toggleConfirmationModal}
              key={task.id}
              task={task}
            />
          ))}
      </Inner>
    </Column>
  )
}
