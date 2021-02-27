import * as React from 'react'
import { ModalOverlay } from 'styles'
import { useClickOutside } from 'hooks/useClickOutside'
import {
  ConfirmationModal as Modal,
  ConfirmButton,
  ConfirmationText,
  ConfirmationTitle,
  CancelButton,
} from './styles'

type ConfirmationModalProps = {
  setOpen: (state: boolean) => void
  toggleModal: () => void
  text: string
}

export const ConfirmationModal = ({
  setOpen,
  toggleModal,
  text,
}: ConfirmationModalProps) => {
  const [ref] = useClickOutside(() => setOpen(false))

  return (
    <>
      <Modal role="alertdialog" aria-modal="true" tabIndex={0} ref={ref}>
        <ConfirmationTitle>Are you sure?</ConfirmationTitle>
        <ConfirmationText>{text}</ConfirmationText>
        <ConfirmButton>Yes</ConfirmButton>
        <CancelButton
          onClick={(event) => {
            event.stopPropagation()
            toggleModal()
          }}
        >
          No
        </CancelButton>
      </Modal>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
