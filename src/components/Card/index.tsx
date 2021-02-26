import * as React from 'react'
import {
  Card as CardContainer,
  CardMenuButton,
  CardMenuLogo,
  CardDate,
  CardLogo,
  CardText,
  CardMenu,
  CardMenuItem,
} from './styles'

type CardProps = {
  menuRef: React.RefObject<HTMLDivElement>
  toggleCardMenu: () => void
  toggleConfirmationModal: () => void
  toggleEditModal: () => void
  isMenuOpen: boolean
}

export const Card = ({
  menuRef,
  isMenuOpen,
  toggleCardMenu,
  toggleEditModal,
  toggleConfirmationModal,
}: CardProps) => {
  return (
    <CardContainer tabIndex={0}>
      <CardLogo aria-hidden="true" />
      <CardMenuButton
        aria-label={isMenuOpen ? 'Close card menu' : 'Open card menu'}
        aria-haspopup="menu"
        onClick={(event) => {
          event.stopPropagation()
          toggleCardMenu()
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
        <CardMenu role="menu" ref={menuRef}>
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
    </CardContainer>
  )
}
