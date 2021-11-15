import firebase from 'firebase/app'
import { DraggableLocation } from 'react-beautiful-dnd'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { TaskFirestoreResult, EnumColumnTypesTrimmed } from 'types'
import { switchColumnDesktop } from './utils'

const { Done, InProgress, Todo } = EnumColumnTypesTrimmed

export const useGetTaskResults = () => {
  const userId = firebase.auth().currentUser?.uid

  const todoTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.Todo}Tasks`)
    .doc(EnumColumnTypesTrimmed.Todo)
  const [todoTaskDocResult] = useDocumentData<TaskFirestoreResult>(todoTaskDoc)

  const progressTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.InProgress}Tasks`)
    .doc(EnumColumnTypesTrimmed.InProgress)
  const [progressTaskDocResult] =
    useDocumentData<TaskFirestoreResult>(progressTaskDoc)

  const doneTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.Done}Tasks`)
    .doc(EnumColumnTypesTrimmed.Done)
  const [doneTaskDocResult] = useDocumentData<TaskFirestoreResult>(doneTaskDoc)

  const moveTask = (
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const fromTodoToProgress =
      droppableSource.droppableId === Todo &&
      droppableDestination.droppableId === InProgress
    if (fromTodoToProgress) {
      if (todoTaskDocResult) {
        switchColumnDesktop({
          sourceDoc: todoTaskDoc,
          sourceDocResult: todoTaskDocResult,
          destinationDoc: progressTaskDoc,
          destinationDocResult: progressTaskDocResult,
          destinationColumnType: 'In progress',
          sourceTaskIndex: droppableSource.index,
          droppableDestination,
          droppableSource,
        })
      }
    }

    const fromProgressToTodo =
      droppableSource.droppableId === InProgress &&
      droppableDestination.droppableId === Todo
    if (fromProgressToTodo) {
      if (progressTaskDocResult) {
        switchColumnDesktop({
          sourceDoc: progressTaskDoc,
          sourceDocResult: progressTaskDocResult,
          destinationDoc: todoTaskDoc,
          destinationDocResult: todoTaskDocResult,
          destinationColumnType: 'Todo',
          sourceTaskIndex: droppableSource.index,
          droppableDestination,
          droppableSource,
        })
      }
    }

    const fromProgressToDone =
      droppableSource.droppableId === InProgress &&
      droppableDestination.droppableId === Done
    if (fromProgressToDone) {
      if (progressTaskDocResult) {
        switchColumnDesktop({
          sourceDoc: progressTaskDoc,
          sourceDocResult: progressTaskDocResult,
          destinationDoc: doneTaskDoc,
          destinationDocResult: doneTaskDocResult,
          destinationColumnType: 'Done',
          sourceTaskIndex: droppableSource.index,
          droppableDestination,
          droppableSource,
        })
      }
    }

    const fromDoneToProgress =
      droppableSource.droppableId === Done &&
      droppableDestination.droppableId === InProgress
    if (fromDoneToProgress) {
      if (doneTaskDocResult) {
        switchColumnDesktop({
          sourceDoc: doneTaskDoc,
          sourceDocResult: doneTaskDocResult,
          destinationDoc: progressTaskDoc,
          destinationDocResult: progressTaskDocResult,
          destinationColumnType: 'In progress',
          sourceTaskIndex: droppableSource.index,
          droppableDestination,
          droppableSource,
        })
      }
    }
  }

  return {
    todoTaskDocResult,
    progressTaskDocResult,
    doneTaskDocResult,
    doneTaskDoc,
    progressTaskDoc,
    todoTaskDoc,
    moveTask,
  }
}
