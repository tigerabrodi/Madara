import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
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
}

export const Card = ({
  setMenuOpen,
  isMenuOpen,
  toggleMenu,
  toggleEditModal,
  toggleConfirmationModal,
}: CardProps) => {
  const [ref] = useClickOutside(() => setMenuOpen(false))

  useTrapTabKey({ ref, setOpen: setMenuOpen, pause: !isMenuOpen })

  return (
    <CardWrapper tabIndex={0}>
      <CardLogo aria-hidden="true" />
      <CardMenuButton
        aria-label={isMenuOpen ? 'Close card menu' : 'Open card menu'}
        aria-haspopup="menu"
        onClick={(event) => {
          event.stopPropagation()
          toggleMenu()
        }}
      >
        <CardMenuLogo aria-hidden="true" />
      </CardMenuButton>
      <CardText>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed sea
        takimata sanctus est Lorem ipsum dolor sit amet.
      </CardText>
      <CardDate aria-label={`Created at ${new Date().toLocaleDateString()}`}>
        Created at {new Date().toLocaleDateString()}
      </CardDate>
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
