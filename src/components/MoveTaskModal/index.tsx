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
  onSuccess: (
    sourceTaskType: ColumnType,
    sourceTaskIndex: number,
    destTaskType: ColumnType,
    setMoveTaskModalOpen: (state: boolean) => void
  ) => void
  taskIndex: number
  taskType: ColumnType
}

export const MoveTaskModal = ({
  setOpen,
  taskType,
  taskIndex,
  onSuccess,
}: MoveTaskModalProps) => {
  const { containerRef: moveTaskModalRef } = useClickOutside(() =>
    setOpen(false)
  )

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
          <MoveTaskModalButton
            disabled={taskType === 'Todo'}
            onClick={() => onSuccess(taskType, taskIndex, 'Todo', setOpen)}
          >
            To do
          </MoveTaskModalButton>
          <MoveTaskModalButton
            disabled={taskType === 'In progress'}
            onClick={() =>
              onSuccess(taskType, taskIndex, 'In progress', setOpen)
            }
          >
            In progress
          </MoveTaskModalButton>
          <MoveTaskModalButton
            disabled={taskType === 'Done'}
            onClick={() => onSuccess(taskType, taskIndex, 'Done', setOpen)}
          >
            Done
          </MoveTaskModalButton>
        </MoveTaskModalBody>
      </MoveTaskModalWrapper>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
