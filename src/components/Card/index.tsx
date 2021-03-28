import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
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
  toggleConfirmationModal: () => void
  toggleEditModal: () => void
  isMenuOpen: boolean
  task: TaskType
}

export const Card = ({
  setMenuOpen,
  isMenuOpen,
  toggleMenu,
  toggleEditModal,
  toggleConfirmationModal,
  task,
}: CardProps) => {
  const [ref] = useClickOutside(() => setMenuOpen(false))

  useTrapTabKey({ ref, setOpen: setMenuOpen, pause: !isMenuOpen })

  return (
    <CardWrapper tabIndex={0} aria-label={`Task in ${task.columnType} column`}>
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
  )
}
