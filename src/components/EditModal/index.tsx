import * as React from 'react'
import { ModalOverlay } from 'styles'
import { useClickOutside } from 'hooks/useClickOutside'
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
}

export const EditModal = ({
  toggleModal,
  taskText,
  setOpen,
}: EditModalProps) => {
  const [editTaskText, setEditTaskText] = React.useState(taskText)

  const handleEditTaskChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditTaskText(event.target.value)
  }

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    /* Submit edited Task with new text */
  }

  const [ref] = useClickOutside(() => setOpen(false))

  return (
    <>
      <Modal role="dialog" aria-modal="true" ref={ref}>
        <EditModalHeader>
          <EditTitle>Edit task</EditTitle>
          <EditCloseButton
            aria-label="Cancel edit"
            onClick={(event) => {
              event.stopPropagation()
              toggleModal()
            }}
          >
            <EditClose aria-hidden="true" />
          </EditCloseButton>
        </EditModalHeader>
        <EditModalForm onSubmit={handleEditSubmit}>
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
            onClick={(event) => {
              event.stopPropagation()
              toggleModal()
            }}
            type="button"
          >
            Cancel
          </EditCancelButton>
        </EditModalForm>
      </Modal>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
