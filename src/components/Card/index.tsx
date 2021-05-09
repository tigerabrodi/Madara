import * as React from 'react'
import firebase from 'firebase/app'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { DraggableProvided } from 'react-beautiful-dnd'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { useAlert } from 'components/Alert/AlertStore'
import { MoveTaskModal } from 'components/MoveTaskModal'
import { EditModal } from 'components/EditModal'
import { Task, TaskFirestoreResult } from 'types'
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

type CardProps = {
  task: Task
  isNotMobileLayout: boolean
  isMobileDraggable: boolean
  provided: DraggableProvided
}

export const Card = ({
  provided,
  isNotMobileLayout,
  task,
  isMobileDraggable,
}: CardProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const [isMenuOpenViaKey, setIsMenuOpenViaKey] = React.useState(false)

  const [isMoveTaskModalOpen, setIsMoveTaskModalOpen] = React.useState(false)

  const editButtonRef = React.useRef<HTMLButtonElement>(null)

  const [cardMenuRef] = useClickOutside(() => setIsMenuOpen(false))

  useTrapTabKey({
    ref: cardMenuRef,
    setOpen: setIsMenuOpenViaKey,
    pause: !isMenuOpenViaKey,
  })

  const addSuccessDeleteAlert = useAlert(
    `You successfully deleted a task in ${task.columnType} column.`,
    'success'
  )

  const addSuccessEditAlert = useAlert(
    `You successfully edited a task in ${task.columnType} column.`,
    'success'
  )

  const userId = firebase.auth().currentUser?.uid

  const trimmedColumnType = task.columnType.split(' ').join('')

  const taskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${trimmedColumnType}Tasks`)
    .doc(trimmedColumnType)

  const [taskDocResult] = useDocumentData<TaskFirestoreResult>(taskDoc)

  const handleConfirmationModalSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    if (taskDocResult) {
      const newTasks = taskDocResult.tasks.filter(({ id }) => id !== task.id)

      await taskDoc.update({
        tasks: newTasks,
      })

      addSuccessDeleteAlert()

      toggleConfirmationModal()
    }
  }

  const handleEditModalSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    taskText: string
  ) => {
    event.preventDefault()

    if (taskDocResult) {
      const tasksCopy = taskDocResult.tasks.slice()

      const indexOfCurrentTask = tasksCopy.findIndex(({ id }) => id === task.id)

      const modifiedCurrentTask = {
        ...tasksCopy[indexOfCurrentTask],
        text: taskText,
      }

      tasksCopy[indexOfCurrentTask] = modifiedCurrentTask

      await taskDoc.update({
        tasks: tasksCopy,
      })

      addSuccessEditAlert()

      toggleEditModalForm()

      editButtonRef.current?.focus()
    }
  }

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)

  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

  const toggleMoveTaskModal = () => setIsMoveTaskModalOpen(!isMoveTaskModalOpen)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const toggleMenuViaKey = () => setIsMenuOpenViaKey(!isMenuOpenViaKey)

  const isCardMenuOpen = isMenuOpen || isMenuOpenViaKey

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
          onKeyPress={(event) => {
            event.stopPropagation()
            toggleMenuViaKey()
          }}
          onMouseDown={(event) => {
            event.stopPropagation()
            toggleMenu()
          }}
        >
          <CardMenuLogo aria-hidden="true" />
        </CardMenuButton>
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
              ref={editButtonRef}
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
          setOpen={setIsMoveTaskModalOpen}
          taskType={task.columnType}
        />
      )}
    </>
  )
}
