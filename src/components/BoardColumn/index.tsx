import * as React from 'react'
import firebase from 'firebase/app'
import { Card } from 'components/Card'
import { ColumnType, TrimmedColumnType, Task } from 'types'
import { AddTaskForm } from 'components/AddTaskForm'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { ATOnlyText } from 'styles'
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
  ReorderButton,
  StartReorder,
  StopReorder,
} from './styles'
import { toast } from 'components/Alert'

type ColumnProps = {
  columnType: ColumnType
  isNotMobileLayout: boolean
  tasks: Task[] | undefined
  handleMobileMoveTask: (
    sourceTaskType: ColumnType,
    sourceTaskIndex: number,
    destTaskType: ColumnType,
    setMoveTaskModalOpen: (state: boolean) => void,
    isDisabled: boolean
  ) => void
  isMobileDraggable: boolean
  toggleMobileDraggable: (isDisabled: boolean) => void
}

export const BoardColumn = ({
  columnType,
  isNotMobileLayout,
  tasks,
  handleMobileMoveTask,
  isMobileDraggable,
  toggleMobileDraggable,
}: ColumnProps) => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = React.useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    React.useState(false)

  const toggleFormButtonRef = React.useRef<HTMLButtonElement>(null)

  const toggleTaskForm = () => setIsAddTaskFormOpen(!isAddTaskFormOpen)

  const toggleConfirmationModal = (isDisabled = false) =>
    !isDisabled && setIsConfirmationModalOpen(!isConfirmationModalOpen)

  const trimmedColumnType = columnType.split(' ').join('') as TrimmedColumnType

  const userId = firebase.auth().currentUser?.uid

  const taskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${trimmedColumnType}Tasks`)
    .doc(trimmedColumnType)

  const handleConfirmationModalSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    taskDoc.set({
      tasks: [],
    })

    toast(`You successfully deleted all tasks in ${columnType} column.`)

    toggleConfirmationModal()
  }

  const columnId = columnType.replace(/\s/g, '-')
  const totalTasks = tasks?.length || 0

  const hasNoTasks = !tasks?.length

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
        <ReorderButton
          aria-label="Reorder tasks"
          aria-pressed={isMobileDraggable ? true : false}
          onClick={() => toggleMobileDraggable(hasNoTasks)}
          aria-disabled={hasNoTasks}
          aria-describedby={hasNoTasks ? 'has-no-tasks-reorder' : undefined}
        >
          {isMobileDraggable ? (
            <StopReorder aria-hidden="true" />
          ) : (
            <StartReorder aria-hidden="true" />
          )}
        </ReorderButton>
        {hasNoTasks && (
          <ATOnlyText id="has-no-tasks-reorder">
            Button is disabled because no tasks exist in this column.
          </ATOnlyText>
        )}
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
          onClick={() => toggleConfirmationModal(hasNoTasks)}
          aria-disabled={hasNoTasks ? 'true' : 'false'}
          aria-describedby={hasNoTasks ? 'has-no-tasks-delete' : undefined}
        >
          <Delete aria-hidden="true" />
        </DeleteAllTasksButton>
        {hasNoTasks && (
          <ATOnlyText id="has-no-tasks-delete">
            Button is disabled because no tasks exist in this column.
          </ATOnlyText>
        )}
        <Inner isFormOpen={isAddTaskFormOpen}>
          {isAddTaskFormOpen && (
            <AddTaskForm
              setOpen={setIsAddTaskFormOpen}
              columnType={columnType}
            />
          )}
          <Droppable droppableId={`${trimmedColumnType}`}>
            {(provided: DroppableProvided) => (
              <DroppableCardList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks &&
                  tasks.length > 0 &&
                  tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          task={task}
                          handleMobileMoveTask={handleMobileMoveTask}
                          taskIndex={index}
                          provided={provided}
                          isNotMobileLayout={isNotMobileLayout}
                          isMobileDraggable={isMobileDraggable}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </DroppableCardList>
            )}
          </Droppable>
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
