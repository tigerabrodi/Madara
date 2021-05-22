import * as React from 'react'
import { ATOnlyText, ModalOverlay } from 'styles'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import {
  EditModalWrapper,
  EditCancelButton,
  EditClose,
  EditCloseButton,
  EditConfirmButton,
  EditLabel,
  EditModalHeader,
  EditTextarea,
  EditTitle,
  EditModalForm,
} from './styles'

type EditModalProps = {
  setOpen: (state: boolean) => void
  taskText: string
  onSuccess: (
    event: React.FormEvent<HTMLFormElement>,
    text: string,
    isDisabled: boolean
  ) => Promise<void>
}

export const EditModal = ({ taskText, setOpen, onSuccess }: EditModalProps) => {
  const [editTaskText, setEditTaskText] = React.useState(taskText)

  const handleEditTaskChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditTaskText(event.target.value)
  }

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation()
    setOpen(false)
  }

  const { containerRef: editModalRef } = useClickOutside(() => setOpen(false))

  const { firstButtonElementRef, secondButtonElementRef } = useTrapTabKey({
    ref: editModalRef,
    setOpen,
  })

  const isTextEmpty = editTaskText.trim() === ''

  return (
    <>
      <EditModalWrapper
        role="dialog"
        aria-labelledby="editDialogTitle"
        ref={editModalRef}
      >
        <EditModalHeader>
          <EditTitle id="editDialogTitle">Edit task</EditTitle>
          <EditCloseButton
            aria-label="Cancel"
            onClick={handleCancel}
            ref={firstButtonElementRef}
          >
            <EditClose aria-hidden="true" />
          </EditCloseButton>
        </EditModalHeader>
        <EditModalForm
          onSubmit={(event) => onSuccess(event, editTaskText, isTextEmpty)}
        >
          <EditLabel htmlFor="taskText">Task</EditLabel>
          <EditTextarea
            id="taskText"
            name="Task"
            placeholder="Clean kitchen."
            aria-label="Edit your task"
            aria-invalid={isTextEmpty ? 'true' : 'false'}
            aria-required="true"
            onChange={handleEditTaskChange}
            value={editTaskText}
          />
          <EditConfirmButton
            type="submit"
            aria-disabled={isTextEmpty ? 'true' : 'false'}
            aria-describedby={isTextEmpty ? 'is-text-empty' : undefined}
          >
            Edit
          </EditConfirmButton>
          {isTextEmpty && (
            <ATOnlyText id="is-text-empty">
              Button is disabled because text is empty.
            </ATOnlyText>
          )}
          <EditCancelButton
            onClick={handleCancel}
            type="button"
            aria-disabled="false"
            ref={secondButtonElementRef}
          >
            Cancel
          </EditCancelButton>
        </EditModalForm>
      </EditModalWrapper>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
