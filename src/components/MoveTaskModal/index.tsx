import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { ModalOverlay } from 'styles'
import { ColumnType } from 'types'
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
  taskType: ColumnType
}

export const MoveTaskModal = ({ setOpen, taskType }: MoveTaskModalProps) => {
  const [moveTaskModalRef] = useClickOutside(() => setOpen(false))

  const { firstButtonElementRef } = useTrapTabKey({
    ref: moveTaskModalRef,
    setOpen,
  })

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation()
    setOpen(false)
  }

  return (
    <>
      <MoveTaskModalWrapper
        aria-labelledby="moveTaskDialogTitle"
        role="dialog"
        ref={moveTaskModalRef}
      >
        <MoveTaskModalHeader>
          <MoveTaskModalTitle
            id="moveTaskDialogTitle"
            aria-label={`Move task in ${taskType} column to another column`}
          >
            Move task to column
          </MoveTaskModalTitle>
          <MoveTaskModalCloseButton
            aria-label="Cancel"
            onClick={handleCancel}
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
