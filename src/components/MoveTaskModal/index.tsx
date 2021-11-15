import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { MobileMoveTaskParams } from 'pages/Board'
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
  onSuccess: ({
    sourceColumnType,
    sourceTaskIndex,
    destinationColumnType,
    setMoveTaskModalOpen,
    isDisabled,
  }: MobileMoveTaskParams) => void
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

  const isTodoType = taskType === 'Todo'
  const isProgressType = taskType === 'In progress'
  const isDoneType = taskType === 'Done'

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
            aria-label={`Move task from ${taskType} column to another column`}
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
            onClick={() =>
              onSuccess({
                sourceColumnType: taskType,
                isDisabled: isTodoType,
                destinationColumnType: 'Todo',
                setMoveTaskModalOpen: setOpen,
                sourceTaskIndex: taskIndex,
              })
            }
            aria-disabled={isTodoType ? 'true' : 'false'}
          >
            To do
          </MoveTaskModalButton>
          <MoveTaskModalButton
            onClick={() =>
              onSuccess({
                sourceColumnType: taskType,
                isDisabled: isProgressType,
                destinationColumnType: 'In progress',
                setMoveTaskModalOpen: setOpen,
                sourceTaskIndex: taskIndex,
              })
            }
            aria-disabled={isProgressType ? 'true' : 'false'}
          >
            In progress
          </MoveTaskModalButton>
          <MoveTaskModalButton
            onClick={() =>
              onSuccess({
                sourceColumnType: taskType,
                isDisabled: isDoneType,
                destinationColumnType: 'Done',
                setMoveTaskModalOpen: setOpen,
                sourceTaskIndex: taskIndex,
              })
            }
            aria-disabled={isDoneType ? 'true' : 'false'}
          >
            Done
          </MoveTaskModalButton>
        </MoveTaskModalBody>
      </MoveTaskModalWrapper>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
