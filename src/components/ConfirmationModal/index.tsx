import * as React from 'react'
import { ModalOverlay } from 'styles'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
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
  onSuccess: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ConfirmationModal = ({
  setOpen,
  toggleModal,
  text,
  onSuccess,
}: ConfirmationModalProps) => {
  const [ref] = useClickOutside(() => setOpen(false))

  const { firstButtonElementRef } = useTrapTabKey({ ref, setOpen })

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation()
    toggleModal()
  }

  return (
    <>
      <Modal
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalDesc"
        tabIndex={0}
        ref={ref}
      >
        <ConfirmationTitle id="modalTitle">Are you sure?</ConfirmationTitle>
        <ConfirmationText id="modalDesc">{text}</ConfirmationText>
        <ConfirmButton onClick={onSuccess}>Yes</ConfirmButton>
        <CancelButton onClick={handleCancel} ref={firstButtonElementRef}>
          No
        </CancelButton>
      </Modal>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
