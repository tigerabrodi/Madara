import * as React from 'react'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import {
  AddTaskForm as Form,
  AddTaskTextarea,
  FormAddButton,
  FormCancelButton,
} from './styles'

type TaskFormProps = {
  onSuccess: (event: React.FormEvent<HTMLFormElement>) => void
  setOpen: (state: boolean) => void
}

export const AddTaskForm = ({ onSuccess, setOpen }: TaskFormProps) => {
  const [addTaskText, setAddTaskText] = React.useState('')

  const handleAddTaskTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddTaskText(event.target.value)
  }

  const [ref] = useClickOutside<HTMLFormElement>(() => setOpen(false))
  const { firstButtonElementRef } = useTrapTabKey({
    ref,
    setOpen,
  })

  /* Tell users using ATs that textarea is still invalid due to only containing spaces and not an actual task */

  return (
    <Form onSubmit={onSuccess} ref={ref}>
      <AddTaskTextarea
        name="Task"
        aria-label="Enter a task"
        aria-required="true"
        placeholder="Enter a task"
        onChange={handleAddTaskTextChange}
      />
      <FormAddButton type="submit" disabled={addTaskText.trim() === ''}>
        Add
      </FormAddButton>
      <FormCancelButton
        type="button"
        onClick={() => setOpen(false)}
        ref={firstButtonElementRef}
      >
        Cancel
      </FormCancelButton>
    </Form>
  )
}
