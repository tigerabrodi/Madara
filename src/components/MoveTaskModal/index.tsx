import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { ModalOverlay } from 'styles'
import {
  MoveTaskModalWrapper,
  MoveTaskModalHeader,
  MoveTaskModalTitle,
  MoveTaskModalCloseButton,
  MoveTaskModalClose,
  MoveTaskModalBody,
  MoveTaskModalButton,
} from './styles'

type MoveTaskModalProps = {
  setOpen: (state: boolean) => void
}

export const MoveTaskModal = ({ setOpen }: MoveTaskModalProps) => {
  const [moveTaskModalRef] = useClickOutside(() => setOpen(false))

  const { firstButtonElementRef } = useTrapTabKey({
    ref: moveTaskModalRef,
    setOpen,
  })

  return (
    <>
      <MoveTaskModalWrapper
        aria-labelledby="moveTaskDialogTitle"
        ref={moveTaskModalRef}
      >
        <MoveTaskModalHeader>
          <MoveTaskModalTitle id="moveTaskDialogTitle">
            Move task to column
          </MoveTaskModalTitle>
          <MoveTaskModalCloseButton
            aria-label="Cancel"
            ref={firstButtonElementRef}
          >
            <MoveTaskModalClose aria-hidden="true" />
          </MoveTaskModalCloseButton>
        </MoveTaskModalHeader>
        <MoveTaskModalBody>
          <MoveTaskModalButton>To do</MoveTaskModalButton>
          <MoveTaskModalButton>In progress</MoveTaskModalButton>
          <MoveTaskModalButton>Done</MoveTaskModalButton>
        </MoveTaskModalBody>
      </MoveTaskModalWrapper>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
