import * as React from 'react'
import firebase from 'firebase/app'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { useAlertStore, Alert } from 'components/Alert/AlertStore'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { v4 as uuidv4 } from 'uuid'
import { TaskType } from 'types'
import {
  Card as CardWrapper,
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
  toggleEditModal: () => void
  isMenuOpen: boolean
  task: TaskType
}

export const Card = ({
  setMenuOpen,
  isMenuOpen,
  toggleMenu,
  toggleEditModal,
  task,
}: CardProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )

  const [ref] = useClickOutside(() => setMenuOpen(false))

  useTrapTabKey({ ref, setOpen: setMenuOpen, pause: !isMenuOpen })

  const { addAlert, removeAlert } = useAlertStore()

  const handleConfirmationModalSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    await firebase.firestore().collection('tasks').doc(task.id).delete()

    const alert: Alert = {
      message: `You successfully deleted a task in ${task.columnType} column.`,
      type: 'success',
      id: uuidv4(),
    }

    addAlert(alert)

    setTimeout(() => {
      removeAlert(alert.id)
    }, 3000)
  }

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)

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
                toggleEditModal()
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
    </>
  )
}
