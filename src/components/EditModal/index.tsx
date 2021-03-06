import * as React from 'react'
import { ModalOverlay } from 'styles'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import {
  EditModal as Modal,
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
  onSuccess: (event: React.FormEvent<HTMLFormElement>) => void
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

  const [ref] = useClickOutside(() => setOpen(false))

  const { firstButtonElementRef, secondButtonElementRef } = useTrapTabKey({
    ref,
    setOpen,
  })

  return (
    <>
      <Modal role="dialog" aria-modal="true" ref={ref}>
        <EditModalHeader>
          <EditTitle>Edit task</EditTitle>
          <EditCloseButton
            aria-label="Cancel edit"
            onClick={handleCancel}
            ref={firstButtonElementRef}
          >
            <EditClose aria-hidden="true" />
          </EditCloseButton>
        </EditModalHeader>
        <EditModalForm onSubmit={onSuccess}>
          <EditLabel htmlFor="taskText">Task</EditLabel>
          <EditTextarea
            id="taskText"
            name="Task"
            placeholder="Edit your task"
            aria-label="Edit your task"
            onChange={handleEditTaskChange}
            value={editTaskText}
          />
          <EditConfirmButton type="submit" disabled={editTaskText === ''}>
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
      </Modal>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
