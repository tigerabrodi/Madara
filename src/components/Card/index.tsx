import * as React from 'react'
import firebase from 'firebase/app'
import { ATOnlyText } from 'styles'
import { DraggableProvided } from 'react-beautiful-dnd'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { MoveTaskModal } from 'components/MoveTaskModal'
import { EditModal } from 'components/EditModal'
import { Task } from 'types'
import {
  CardWrapper,
  CardMenuButton,
  CardMenuLogo,
  CardDate,
  CardLogo,
  CardText,
  CardMenu,
  CardMenuItem,
  CardReorderMenu,
  MoveTaskButton,
  MobileDragArea,
  MobileDrag,
} from './styles'
import { toast } from 'components/Alert'
import { trimString } from 'lib/utils'
import { MobileMoveTaskParams } from 'pages/Board'
import { useStore } from 'lib/store'

type CardProps = {
  task: Task
  isNotMobileLayout: boolean
  isMobileDraggable: boolean
  provided: DraggableProvided
  mobileMoveTask: ({
    sourceColumnType,
    sourceTaskIndex,
    destinationColumnType,
    setMoveTaskModalOpen,
    isDisabled,
  }: MobileMoveTaskParams) => void
  taskIndex: number
}

export const Card = ({
  provided,
  isNotMobileLayout,
  task,
  taskIndex,
  isMobileDraggable,
  mobileMoveTask,
}: CardProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    React.useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMenuOpenViaKey, setIsMenuOpenViaKey] = React.useState(false)
  const [isMoveTaskModalOpen, setIsMoveTaskModalOpen] = React.useState(false)

  const {
    todoTasks,
    setTodoTasks,
    doneTasks,
    setDoneTasks,
    progressTasks,
    setProgressTasks,
  } = useStore()

  const { containerRef: cardMenuRef, firstButtonRef: cardMenuButtonRef } =
    useClickOutside(() => setIsMenuOpen(false))

  useTrapTabKey({
    ref: cardMenuRef,
    setOpen: setIsMenuOpenViaKey,
    shouldPause: !isMenuOpenViaKey,
  })

  const userId = firebase.auth().currentUser?.uid

  const trimmedColumnType = trimString(task.columnType)

  const taskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${trimmedColumnType}Tasks`)
    .doc(trimmedColumnType)

  const handleConfirmationModalSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    let newTasks: Task[] = []
    switch (task.columnType) {
      case 'Todo':
        newTasks = todoTasks.filter(({ id }) => id !== task.id)
        setTodoTasks(newTasks)
        await taskDoc.update({
          tasks: newTasks,
        })
        break

      case 'In progress':
        newTasks = progressTasks.filter(({ id }) => id !== task.id)
        setProgressTasks(newTasks)
        await taskDoc.update({
          tasks: newTasks,
        })
        break

      case 'Done':
        newTasks = doneTasks.filter(({ id }) => id !== task.id)
        setDoneTasks(newTasks)
        await taskDoc.update({
          tasks: newTasks,
        })
        break
      default:
        break
    }

    toast(`You successfully deleted a task in ${task.columnType} column.`)

    toggleConfirmationModal()
  }

  const handleEditModalSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    taskText: string,
    isDisabled = false
  ) => {
    event.preventDefault()

    if (isDisabled) return

    switch (task.columnType) {
      case 'Todo':
        const todoTasksCopy = todoTasks.slice()
        const indexOfCurrentTodoTask = todoTasksCopy.findIndex(
          ({ id }) => id === task.id
        )
        const modifiedCurrentTodoTask = {
          ...todoTasksCopy[indexOfCurrentTodoTask],
          text: taskText,
        }
        todoTasksCopy[indexOfCurrentTodoTask] = modifiedCurrentTodoTask

        setTodoTasks(todoTasksCopy)
        await taskDoc.update({
          tasks: todoTasksCopy,
        })
        break

      case 'In progress':
        const progressTasksCopy = progressTasks.slice()
        const indexOfCurrentProgressTask = progressTasksCopy.findIndex(
          ({ id }) => id === task.id
        )
        const modifiedCurrentProgressTask = {
          ...progressTasksCopy[indexOfCurrentProgressTask],
          text: taskText,
        }

        progressTasksCopy[indexOfCurrentProgressTask] =
          modifiedCurrentProgressTask

        setProgressTasks(progressTasksCopy)
        await taskDoc.update({
          tasks: progressTasksCopy,
        })
        break

      case 'Done':
        const doneTasksCopy = doneTasks.slice()
        const indexOfCurrentDoneTask = doneTasksCopy.findIndex(
          ({ id }) => id === task.id
        )
        const modifiedCurrentDoneTask = {
          ...doneTasksCopy[indexOfCurrentDoneTask],
          text: taskText,
        }

        doneTasksCopy[indexOfCurrentDoneTask] = modifiedCurrentDoneTask

        setDoneTasks(doneTasksCopy)
        await taskDoc.update({
          tasks: doneTasksCopy,
        })
        break
      default:
        break
    }

    toast(`You successfully edited a task in ${task.columnType} column.`)

    toggleEditModalForm()

    setIsMenuOpen(false)
    setIsMenuOpenViaKey(false)
  }

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)
  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)
  const toggleMoveTaskModal = () => setIsMoveTaskModalOpen(!isMoveTaskModalOpen)
  const toggleMenu = (isDisabled: boolean) =>
    !isDisabled && setIsMenuOpen(!isMenuOpen)
  const toggleMenuViaKey = (isDisabled: boolean) =>
    !isDisabled && setIsMenuOpenViaKey(!isMenuOpenViaKey)

  const isCardMenuOpen = isMenuOpen || isMenuOpenViaKey
  const isCardMenuDisabled = isMobileDraggable

  return (
    <>
      <CardWrapper
        aria-label={`Task in ${task.columnType} column`}
        tabIndex={0}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...(isNotMobileLayout && provided.dragHandleProps)}
        role="article"
      >
        <CardLogo aria-hidden="true" />
        <CardMenuButton
          aria-label="Card menu"
          aria-haspopup="menu"
          aria-disabled={isCardMenuDisabled ? 'true' : 'false'}
          aria-describedby={
            isCardMenuDisabled ? 'menu-button-disabled-text-id' : undefined
          }
          onKeyPress={(event) => {
            event.stopPropagation()
            toggleMenuViaKey(isCardMenuDisabled)
          }}
          onMouseDown={(event) => {
            event.stopPropagation()
            toggleMenu(isCardMenuDisabled)
          }}
          ref={cardMenuButtonRef}
        >
          <CardMenuLogo aria-hidden="true" />
        </CardMenuButton>
        {isCardMenuDisabled && (
          <ATOnlyText id="menu-button-disabled-text-id">
            Button is disabled since currently tasks are being reordered
          </ATOnlyText>
        )}
        <CardText>{task.text}</CardText>
        <CardDate>Created at {task.createdAt}</CardDate>
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
                toggleConfirmationModal()
              }}
            >
              Delete Task
            </CardMenuItem>
          </CardMenu>
        )}
        {isMobileDraggable && (
          <CardReorderMenu>
            <MoveTaskButton
              aria-label="Move current task to another column"
              type="button"
              onClick={toggleMoveTaskModal}
            >
              Move to...
            </MoveTaskButton>
            <MobileDragArea
              {...provided.dragHandleProps}
              aria-label="Reorder current task"
            >
              <MobileDrag aria-hidden="true" />
            </MobileDragArea>
          </CardReorderMenu>
        )}
      </CardWrapper>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          setOpen={setIsConfirmationModalOpen}
          onSuccess={handleConfirmationModalSubmit}
          toggleModal={toggleConfirmationModal}
          text={`Do you really want to delete this task in ${task.columnType} column?`}
        />
      )}
      {isEditFormOpen && (
        <EditModal
          setOpen={setIsEditFormOpen}
          onSuccess={handleEditModalSubmit}
          taskText={task.text}
        />
      )}
      {isMoveTaskModalOpen && (
        <MoveTaskModal
          onSuccess={mobileMoveTask}
          taskIndex={taskIndex}
          setOpen={setIsMoveTaskModalOpen}
          taskType={task.columnType}
        />
      )}
    </>
  )
}
