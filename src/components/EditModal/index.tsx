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

  const [ref] = useClickOutside(() => setOpen(false))

  const {
    firstButtonElementRef,
    secondButtonElementRef,
    thirdButtonElementRef,
  } = useTrapTabKey({
    ref,
    setOpen,
  })

  /* Tell users using ATs that textarea is still invalid due to only containing spaces and not an actual task */

  return (
    <>
      <Modal role="dialog" aria-labelledby="editDialogTitle" ref={ref}>
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
            aria-required="true"
            onChange={handleEditTaskChange}
            value={editTaskText}
          />
          <EditConfirmButton
            type="submit"
            ref={thirdButtonElementRef}
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
      </Modal>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
