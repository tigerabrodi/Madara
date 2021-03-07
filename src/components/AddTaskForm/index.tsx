import * as React from 'react'
import {
  AddTaskForm as Form,
  AddTaskTextarea,
  FormAddButton,
  FormCancelButton,
} from './styles'

type TaskFormProps = {
  toggleForm: () => void
  onSuccess: (event: React.FormEvent<HTMLFormElement>) => void
  handleCancelFormButtonPress: (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => void
}

export const AddTaskForm = ({
  toggleForm,
  onSuccess,
  handleCancelFormButtonPress,
}: TaskFormProps) => {
  const [addTaskText, setAddTaskText] = React.useState('')

  const handleAddTaskTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddTaskText(event.target.value)
  }

  return (
    <Form onSubmit={onSuccess}>
      <AddTaskTextarea
        name="Task"
        aria-label="Enter a task"
        placeholder="Enter a task"
        required
        onChange={handleAddTaskTextChange}
      />
      <FormAddButton type="submit" disabled={addTaskText === ''}>
        Add
      </FormAddButton>
      <FormCancelButton
        type="button"
        onClick={toggleForm}
        onKeyPress={(event) => handleCancelFormButtonPress(event)}
      >
        Cancel
      </FormCancelButton>
    </Form>
  )
}
