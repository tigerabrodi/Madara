import * as React from 'react'
import firebase from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Card } from 'components/Card'
import { ColumnType, TaskType } from 'types'
import { AddTaskForm } from 'components/AddTaskForm'
import { useAlert } from 'components/Alert/AlertStore'
import { ConfirmationModal } from 'components/ConfirmationModal'
import {
  BoardColumn as Column,
  ToggleFormButton,
  Inner,
  Status,
  TotalTasks,
  Toggle,
  Delete,
  DeleteAllTasksButton,
} from './styles'

type ColumnProps = {
  columnType: ColumnType
  isNotMobileLayout: boolean
}

export const BoardColumn = ({ columnType, isNotMobileLayout }: ColumnProps) => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)
  const [isCardMenuOpen, setIsCardMenuOpen] = React.useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )

  const toggleFormButtonRef = React.useRef<HTMLButtonElement>(null)

  const toggleCardMenu = () => setIsCardMenuOpen(!isCardMenuOpen)
  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)

  const userId = firebase.auth().currentUser?.uid

  const tasksCollection = firebase
    .firestore()
    .collection('tasks')
    .orderBy('createdAtStamp')

  const [tasks] = useCollectionData<TaskType>(tasksCollection, {
    idField: 'id',
  })

  const addSuccessDeleteAllTasksAlert = useAlert(
    `You successfully deleted all tasks in ${columnType} column.`,
    'success'
  )

  const userTasks = tasks?.filter(
    (task) => task.columnType === columnType && task.userId === userId
  )

  const handleConfirmationModalSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    userTasks?.forEach(async ({ id }) => {
      await firebase.firestore().collection('tasks').doc(id).delete()
    })

    addSuccessDeleteAllTasksAlert()
  }

  const columnId = columnType.replace(/\s/g, '-')
  const totalTasks = userTasks?.length || 0

  return (
    <>
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
        <DeleteAllTasksButton
          aria-label={`Delete all tasks in ${columnType} column.`}
          onClick={toggleConfirmationModal}
        >
          <Delete aria-hidden="true" />
        </DeleteAllTasksButton>
        <Inner isFormOpen={isAddTaskFormOpen}>
          {isAddTaskFormOpen && (
            <AddTaskForm
              setOpen={setIsAddTaskFormOpen}
              columnType={columnType}
            />
          )}
          {userTasks &&
            userTasks.length > 0 &&
            userTasks.map((task) => (
              <Card
                setMenuOpen={setIsCardMenuOpen}
                isMenuOpen={isCardMenuOpen}
                toggleMenu={toggleCardMenu}
                key={task.id}
                task={task}
              />
            ))}
        </Inner>
      </Column>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          setOpen={setIsConfirmationModalOpen}
          onSuccess={handleConfirmationModalSubmit}
          toggleModal={toggleConfirmationModal}
          text={`Do you really want to delete all tasks in ${columnType} column?`}
        />
      )}
    </>
  )
}
