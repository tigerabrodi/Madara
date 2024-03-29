import * as React from 'react'
import firebase from 'firebase/app'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { v4 as uuidv4 } from 'uuid'
import { ColumnType, TaskFirestoreResult } from 'types'
import { useClickOutside } from 'hooks/useClickOutside'
import { useTrapTabKey } from 'hooks/useTrapTabKey'
import { ATOnlyText } from 'styles'
import {
  Form,
  AddTaskTextarea,
  FormAddButton,
  FormCancelButton,
} from './styles'
import { trimString } from 'lib/utils'
import { useStore } from 'lib/store'
import { useSetTasks } from 'hooks/useSetTasks'

type TaskFormProps = {
  setOpen: (state: boolean) => void
  columnType: ColumnType
}

export const AddTaskForm = ({ setOpen, columnType }: TaskFormProps) => {
  const [addTaskText, setAddTaskText] = React.useState('')
  const { todoTasks, progressTasks, doneTasks } = useStore()
  const setTasks = useSetTasks()

  const handleAddTaskTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddTaskText(event.target.value)
  }

  const { containerRef: formRef } = useClickOutside<HTMLFormElement>(() =>
    setOpen(false)
  )

  const { firstButtonElementRef } = useTrapTabKey({
    ref: formRef,
    setOpen,
  })

  const userId = firebase.auth().currentUser?.uid

  const trimmedColumnType = trimString(columnType)

  const taskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${trimmedColumnType}Tasks`)
    .doc(trimmedColumnType)

  const [taskDocResult] = useDocumentData<TaskFirestoreResult>(taskDoc)

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    isDisabled = false
  ) => {
    event.preventDefault()

    if (isDisabled) return

    const currentDate = new Date().toLocaleDateString('en-US')

    const newTask = {
      columnType,
      text: addTaskText,
      createdAt: currentDate,
      id: uuidv4(),
    }

    const storeTasks =
      columnType === 'Todo'
        ? todoTasks
        : columnType === 'In progress'
        ? progressTasks
        : doneTasks

    setTasks(columnType, [newTask, ...storeTasks])

    const updatedTasks = taskDocResult
      ? [newTask, ...taskDocResult.tasks]
      : [newTask]

    taskDoc.set({ tasks: updatedTasks })

    setOpen(false)
  }

  const isTextEmpty = addTaskText.trim() === ''

  return (
    <Form
      onSubmit={(event) => handleFormSubmit(event, isTextEmpty)}
      ref={formRef}
    >
      <AddTaskTextarea
        aria-label="Enter a task"
        aria-required="true"
        aria-invalid={addTaskText.trim() === '' ? 'true' : 'false'}
        placeholder="Enter a task"
        onChange={handleAddTaskTextChange}
      />
      <FormAddButton
        type="submit"
        aria-disabled={isTextEmpty ? 'true' : 'false'}
        aria-describedby={isTextEmpty ? 'is-text-empty' : undefined}
      >
        Add
      </FormAddButton>
      {isTextEmpty && (
        <ATOnlyText id="is-text-empty">
          Button is disabled because text is empty.
        </ATOnlyText>
      )}
      <FormCancelButton
        type="button"
        aria-disabled="false"
        onClick={() => setOpen(false)}
        ref={firstButtonElementRef}
      >
        Cancel
      </FormCancelButton>
    </Form>
  )
}
