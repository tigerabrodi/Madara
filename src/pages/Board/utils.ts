import { DraggableLocation } from 'react-beautiful-dnd'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { ColumnType, Task, TaskFirestoreResult, DocumentData } from 'types'

type SwitchMobileColumnParams = {
  sourceDoc: DocumentData
  destinationDoc: DocumentData
  sourceDocResult: Data<TaskFirestoreResult, '', ''> | undefined
  destinationDocResult: Data<TaskFirestoreResult, '', ''> | undefined
  destinationColumnType: ColumnType
  sourceTaskIndex: number
}

type SwitchDesktopColumnParams = SwitchMobileColumnParams & {
  droppableSource: DraggableLocation
  droppableDestination: DraggableLocation
}

export const switchColumnMobile = ({
  sourceDoc,
  destinationColumnType,
  sourceDocResult,
  sourceTaskIndex,
  destinationDoc,
  destinationDocResult,
}: SwitchMobileColumnParams) => {
  const sourceClone = Array.from(sourceDocResult!.tasks)

  const destClone = destinationDocResult
    ? Array.from(destinationDocResult.tasks)
    : []

  const [removedTask] = sourceClone.splice(sourceTaskIndex, 1)

  const newTaskToDest: Task = {
    ...removedTask,
    columnType: destinationColumnType,
  }

  destClone.unshift(newTaskToDest)

  sourceDoc.set({
    tasks: sourceClone,
  })

  destinationDoc.set({
    tasks: destClone,
  })
}

export const switchColumnDesktop = ({
  destinationColumnType,
  destinationDoc,
  destinationDocResult,
  sourceDocResult,
  sourceDoc,
  droppableDestination,
  droppableSource,
}: SwitchDesktopColumnParams) => {
  const sourceClone = Array.from(sourceDocResult!.tasks)
  const destClone = destinationDocResult
    ? Array.from(destinationDocResult.tasks)
    : []

  const [removedTask] = sourceClone.splice(droppableSource.index, 1)

  const newTaskToProgress: Task = {
    ...removedTask,
    columnType: destinationColumnType,
  }

  destClone.splice(droppableDestination.index, 0, newTaskToProgress)

  sourceDoc.set({
    tasks: sourceClone,
  })

  destinationDoc.set({
    tasks: destClone,
  })
}

export const reorderTasks = (
  tasks: Task[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(tasks)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
