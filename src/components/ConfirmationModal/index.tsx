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

  React.useEffect(() => {
    const focusableElements = ref.current?.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    )

    const firstItem = focusableElements![0] as HTMLElement
    const lastItem = focusableElements![
      focusableElements!.length - 1
    ] as HTMLElement

    firstItem.focus()

    const trapTabKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstItem) {
            event.preventDefault()
            lastItem.focus()
          }
        } else {
          if (document.activeElement === lastItem) {
            event.preventDefault()
            firstItem.focus()
          }
        }
      } else if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    ref.current?.addEventListener('keydown', trapTabKey)
    return () => document.removeEventListener('keydown', trapTabKey)
  }, [])

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
