import * as React from 'react'
import firebase from 'firebase/app'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { v4 as uuidv4 } from 'uuid'
import { ColumnType, TaskFirestoreResult } from 'types'
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

  const [formRef] = useClickOutside<HTMLFormElement>(() => setOpen(false))

  const { firstButtonElementRef } = useTrapTabKey({
    ref: formRef,
    setOpen,
  })

  const userId = firebase.auth().currentUser?.uid

  const trimmedColumnType = columnType.split(' ').join('')

  const taskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${trimmedColumnType}Tasks`)
    .doc(trimmedColumnType)

  const [taskDocResult] = useDocumentData<TaskFirestoreResult>(taskDoc)

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const currentDate = new Date().toLocaleDateString('en-US')

    const newTask = {
      columnType,
      text: addTaskText,
      createdAt: currentDate,
      id: uuidv4(),
    }

    const updatedTasks = taskDocResult
      ? [newTask, ...taskDocResult.tasks]
      : [newTask]

    taskDoc.set({ tasks: updatedTasks })

    setOpen(false)
  }

  return (
    <Form onSubmit={handleFormSubmit} ref={formRef}>
      <AddTaskTextarea
        aria-label="Enter a task"
        aria-required="true"
        aria-invalid={addTaskText.trim() === '' ? 'true' : 'false'}
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
