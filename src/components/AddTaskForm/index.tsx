import * as React from 'react'
import firebase from 'firebase/app'
import { ColumnType } from 'types'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import {
  Form,
  AddTaskTextarea,
  FormAddButton,
  FormCancelButton,
} from './styles'

type TaskFormProps = {
  setOpen: (state: boolean) => void
  columnType: ColumnType
}

export const AddTaskForm = ({ setOpen, columnType }: TaskFormProps) => {
  const [addTaskText, setAddTaskText] = React.useState('')

  const handleAddTaskTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddTaskText(event.target.value)
  }

  const [ref] = useClickOutside<HTMLFormElement>(() => setOpen(false))
  const { firstButtonElementRef, secondButtonElementRef } = useTrapTabKey({
    ref,
    setOpen,
  })

  const userId = firebase.auth().currentUser?.uid

  const trimmedColumnType = columnType.split(' ').join('')

  const tasksCollection = firebase
    .firestore()
    .collection(`users/${userId}/${trimmedColumnType}Tasks`)

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newDate = new Date().toLocaleDateString('en-US')

    tasksCollection.add({
      columnType,
      text: addTaskText,
      createdAt: newDate,
    })

    setOpen(false)
  }

  return (
    <Form onSubmit={handleFormSubmit} ref={ref}>
      <AddTaskTextarea
        aria-label="Enter a task"
        aria-required="true"
        aria-invalid={addTaskText.trim() === '' ? 'true' : 'false'}
        placeholder="Enter a task"
        onChange={handleAddTaskTextChange}
      />
      <FormAddButton
        type="submit"
        disabled={addTaskText.trim() === ''}
        ref={secondButtonElementRef}
      >
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
