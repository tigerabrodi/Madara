import * as React from 'react'
import firebase from 'firebase/app'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Card } from 'components/Card'
import { ColumnType, Task, TaskFirestoreResult } from 'types'
import { AddTaskForm } from 'components/AddTaskForm'
import { useAlert } from 'components/Alert/AlertStore'
import { ConfirmationModal } from 'components/ConfirmationModal'
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd'
import {
  Column,
  ToggleFormButton,
  Inner,
  Status,
  TotalTasks,
  Toggle,
  Delete,
  DeleteAllTasksButton,
  DroppableCardList,
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

  const trimmedColumnType = columnType.split(' ').join('')

  const taskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${trimmedColumnType}Tasks`)
    .doc(trimmedColumnType)

  const [taskDocResult] = useDocumentData<TaskFirestoreResult>(taskDoc)

  const addSuccessDeleteAllTasksAlert = useAlert(
    `You successfully deleted all tasks in ${columnType} column.`,
    'success'
  )

  const handleConfirmationModalSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    taskDoc.set({
      tasks: [],
    })

    addSuccessDeleteAllTasksAlert()

    toggleConfirmationModal()
  }

  const reorder = (tasks: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(tasks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    if (taskDocResult?.tasks) {
      const newTasks = reorder(
        taskDocResult.tasks,
        result.source.index,
        result.destination.index
      )

      taskDoc.set({
        tasks: newTasks,
      })
    }
  }

  const columnId = columnType.replace(/\s/g, '-')
  const totalTasks = taskDocResult?.tasks?.length || 0

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
          disabled={!taskDocResult?.tasks.length}
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`${trimmedColumnType}List`}>
              {(provided: DroppableProvided) => (
                <DroppableCardList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {taskDocResult?.tasks &&
                    taskDocResult.tasks.length > 0 &&
                    taskDocResult.tasks.map((task, index) => (
                      <Card
                        setMenuOpen={setIsCardMenuOpen}
                        isMenuOpen={isCardMenuOpen}
                        toggleMenu={toggleCardMenu}
                        key={task.id}
                        task={task}
                        index={index}
                      />
                    ))}
                  {provided.placeholder}
                </DroppableCardList>
              )}
            </Droppable>
          </DragDropContext>
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
