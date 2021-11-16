import * as React from 'react'
import firebase from 'firebase/app'
import { useStore } from 'lib/store'
import { DraggableLocation } from 'react-beautiful-dnd'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { TaskFirestoreResult, EnumColumnTypesTrimmed } from 'types'
import { switchColumnDesktop } from './utils'

const { Done, InProgress, Todo } = EnumColumnTypesTrimmed

export const useGetTaskResults = () => {
  const userId = firebase.auth().currentUser?.uid
  const {
    setDoneTasks,
    setTodoTasks,
    setProgressTasks,
    todoTasks,
    progressTasks,
    doneTasks,
  } = useStore()

  const todoTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.Todo}Tasks`)
    .doc(EnumColumnTypesTrimmed.Todo)
  const [todoTaskDocResult, areTodoTasksLoading] =
    useDocumentDataOnce<TaskFirestoreResult>(todoTaskDoc)

  const progressTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.InProgress}Tasks`)
    .doc(EnumColumnTypesTrimmed.InProgress)
  const [progressTaskDocResult, areProgressTasksLoading] =
    useDocumentDataOnce<TaskFirestoreResult>(progressTaskDoc)

  const doneTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.Done}Tasks`)
    .doc(EnumColumnTypesTrimmed.Done)
  const [doneTaskDocResult, areDoneTasksLoading] =
    useDocumentDataOnce<TaskFirestoreResult>(doneTaskDoc)

  React.useEffect(() => {
    if (areTodoTasksLoading || areProgressTasksLoading || areDoneTasksLoading) {
      return
    }

    setTodoTasks(todoTaskDocResult?.tasks ?? [])
    setProgressTasks(progressTaskDocResult?.tasks ?? [])
    setDoneTasks(doneTaskDocResult?.tasks ?? [])
  }, [areTodoTasksLoading, areProgressTasksLoading, areDoneTasksLoading])

  const desktopMoveTask = (
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const fromTodoToProgress =
      droppableSource.droppableId === Todo &&
      droppableDestination.droppableId === InProgress
    if (fromTodoToProgress) {
      switchColumnDesktop({
        sourceDoc: todoTaskDoc,
        sourceTasks: todoTasks,
        setSourceTasks: setTodoTasks,
        destinationDoc: progressTaskDoc,
        destinationTasks: progressTasks,
        setDestinationTasks: setProgressTasks,
        destinationColumnType: 'In progress',
        sourceTaskIndex: droppableSource.index,
        droppableDestination,
        droppableSource,
      })
    }

    const fromProgressToTodo =
      droppableSource.droppableId === InProgress &&
      droppableDestination.droppableId === Todo
    if (fromProgressToTodo) {
      switchColumnDesktop({
        sourceDoc: progressTaskDoc,
        sourceTasks: progressTasks,
        setSourceTasks: setProgressTasks,
        destinationDoc: todoTaskDoc,
        destinationTasks: todoTasks,
        setDestinationTasks: setTodoTasks,
        destinationColumnType: 'Todo',
        sourceTaskIndex: droppableSource.index,
        droppableDestination,
        droppableSource,
      })
    }

    const fromProgressToDone =
      droppableSource.droppableId === InProgress &&
      droppableDestination.droppableId === Done
    if (fromProgressToDone) {
      switchColumnDesktop({
        sourceDoc: progressTaskDoc,
        sourceTasks: progressTasks,
        setSourceTasks: setProgressTasks,
        destinationDoc: doneTaskDoc,
        destinationTasks: doneTasks,
        setDestinationTasks: setDoneTasks,
        destinationColumnType: 'Done',
        sourceTaskIndex: droppableSource.index,
        droppableDestination,
        droppableSource,
      })
    }

    const fromDoneToProgress =
      droppableSource.droppableId === Done &&
      droppableDestination.droppableId === InProgress
    if (fromDoneToProgress) {
      switchColumnDesktop({
        sourceDoc: doneTaskDoc,
        sourceTasks: doneTasks,
        setSourceTasks: setDoneTasks,
        destinationDoc: progressTaskDoc,
        destinationTasks: progressTasks,
        setDestinationTasks: setProgressTasks,
        destinationColumnType: 'In progress',
        sourceTaskIndex: droppableSource.index,
        droppableDestination,
        droppableSource,
      })
    }

    const fromDoneToTodo =
      droppableSource.droppableId === Done &&
      droppableDestination.droppableId === Todo
    if (fromDoneToTodo) {
      switchColumnDesktop({
        sourceDoc: doneTaskDoc,
        sourceTasks: doneTasks,
        setSourceTasks: setDoneTasks,
        destinationDoc: todoTaskDoc,
        destinationTasks: todoTasks,
        setDestinationTasks: setTodoTasks,
        destinationColumnType: 'Todo',
        sourceTaskIndex: droppableSource.index,
        droppableDestination,
        droppableSource,
      })
    }

    const fromTodoToDone =
      droppableSource.droppableId === Todo &&
      droppableDestination.droppableId === Done
    if (fromTodoToDone) {
      switchColumnDesktop({
        sourceDoc: todoTaskDoc,
        sourceTasks: todoTasks,
        setSourceTasks: setTodoTasks,
        destinationDoc: doneTaskDoc,
        destinationTasks: doneTasks,
        setDestinationTasks: setDoneTasks,
        destinationColumnType: 'Done',
        sourceTaskIndex: droppableSource.index,
        droppableDestination,
        droppableSource,
      })
    }
  }

  return {
    todoTaskDocResult,
    progressTaskDocResult,
    doneTaskDocResult,
    doneTaskDoc,
    progressTaskDoc,
    todoTaskDoc,
    desktopMoveTask,
  }
}
