import * as React from 'react'
import firebase from 'firebase/app'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { EditModal } from 'components/EditModal'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { useAlert } from 'components/Alert/AlertStore'
import { TaskType } from 'types'
import {
  CardWrapper,
  CardMenuButton,
  CardMenuLogo,
  CardDate,
  CardLogo,
  CardText,
  CardMenu,
  CardMenuItem,
} from './styles'

type CardProps = {
  setMenuOpen: (state: boolean) => void
  toggleMenu: () => void
  isMenuOpen: boolean
  task: TaskType
}

export const Card = ({
  setMenuOpen,
  isMenuOpen,
  toggleMenu,
  task,
}: CardProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )

  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const [ref] = useClickOutside(() => setMenuOpen(false))

  useTrapTabKey({ ref, setOpen: setMenuOpen, pause: !isMenuOpen })

  const addSuccessDeleteAlert = useAlert(
    `You successfully deleted a task in ${task.columnType} column.`,
    'success'
  )

  const addSuccessEditAlert = useAlert(
    `You successfully edited a task in ${task.columnType} column.`,
    'success'
  )

  const currentTaskRef = firebase.firestore().collection('tasks').doc(task.id)

  const handleConfirmationModalSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    await currentTaskRef.delete()

    addSuccessDeleteAlert()
  }

  const handleEditModalSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    taskText: string
  ) => {
    event.preventDefault()

    await currentTaskRef.update({
      text: taskText,
    })

    addSuccessEditAlert()

    toggleEditModalForm()
  }

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)

  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

  return (
    <>
      <CardWrapper
        tabIndex={0}
        aria-label={`Task in ${task.columnType} column`}
      >
        <CardLogo aria-hidden="true" />
        <CardMenuButton
          aria-label="Card menu"
          aria-haspopup="menu"
          onClick={(event) => {
            event.stopPropagation()
            toggleMenu()
          }}
        >
          <CardMenuLogo aria-hidden="true" />
        </CardMenuButton>
        <CardText>{task.text}</CardText>
        <CardDate>Created at {task.createdAt}</CardDate>
        {isMenuOpen && (
          <CardMenu role="menu" ref={ref}>
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
          toggleModal={toggleEditModalForm}
          taskText={task.text}
        />
      )}
    </>
  )
}
