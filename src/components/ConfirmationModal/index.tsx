import * as React from 'react'
import { ModalOverlay } from 'styles'
import {
  ConfirmationModal as Modal,
  ConfirmButton,
  ConfirmationText,
  ConfirmationTitle,
  CancelButton,
} from './styles'

type ConfirmationModalProps = {
  ref: React.RefObject<HTMLDivElement>
  toggleModal: () => void
  text: string
}

export const ConfirmationModal = ({
  ref,
  toggleModal,
  text,
}: ConfirmationModalProps) => (
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
