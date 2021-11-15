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
    setMoveTaskModalOpen: (state: boolean) => void,
    isDisabled: boolean
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
              onSuccess(taskType, taskIndex, 'Todo', setOpen, isTodoType)
            }
            aria-disabled={isTodoType ? 'true' : 'false'}
          >
            To do
          </MoveTaskModalButton>
          <MoveTaskModalButton
            onClick={() =>
              onSuccess(
                taskType,
                taskIndex,
                'In progress',
                setOpen,
                isProgressType
              )
            }
            aria-disabled={isProgressType ? 'true' : 'false'}
          >
            In progress
          </MoveTaskModalButton>
          <MoveTaskModalButton
            onClick={() =>
              onSuccess(taskType, taskIndex, 'Done', setOpen, isDoneType)
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
