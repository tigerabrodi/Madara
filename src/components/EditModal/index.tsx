import * as React from 'react'
import { ModalOverlay } from 'styles'
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
  toggleModal: () => void
  taskText: string
  onSuccess: (
    event: React.FormEvent<HTMLFormElement>,
    text: string
  ) => Promise<void>
}

export const EditModal = ({
  toggleModal,
  taskText,
  setOpen,
  onSuccess,
}: EditModalProps) => {
  const [editTaskText, setEditTaskText] = React.useState(taskText)

  const handleEditTaskChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditTaskText(event.target.value)
  }

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation()
    toggleModal()
  }

  const [editModalRef] = useClickOutside(() => setOpen(false))

  const { firstButtonElementRef, secondButtonElementRef } = useTrapTabKey({
    ref: editModalRef,
    setOpen,
  })

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
        <EditModalForm onSubmit={(event) => onSuccess(event, editTaskText)}>
          <EditLabel htmlFor="taskText">Task</EditLabel>
          <EditTextarea
            id="taskText"
            name="Task"
            placeholder="Clean kitchen."
            aria-label="Edit your task"
            aria-invalid={editTaskText.trim() === '' ? 'true' : 'false'}
            aria-required="true"
            onChange={handleEditTaskChange}
            value={editTaskText}
          />
          <EditConfirmButton
            type="submit"
            disabled={editTaskText.trim() === ''}
          >
            Edit
          </EditConfirmButton>
          <EditCancelButton
            onClick={handleCancel}
            type="button"
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
