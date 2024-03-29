import { DraggableLocation } from 'react-beautiful-dnd'
import { ColumnType, Task, DocumentData } from 'types'

type SwitchMobileColumnParams = {
  sourceDoc: DocumentData
  destinationDoc: DocumentData
  sourceTasks: Task[]
  setSourceTasks: (sourceTasks: Task[]) => void
  setDestinationTasks: (destinationTasks: Task[]) => void
  destinationTasks: Task[]
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
  sourceTasks,
  sourceTaskIndex,
  destinationDoc,
  destinationTasks,
  setDestinationTasks,
  setSourceTasks,
}: SwitchMobileColumnParams) => {
  const sourceClone = Array.from(sourceTasks)

  const destClone = destinationTasks

  const [removedTask] = sourceClone.splice(sourceTaskIndex, 1)

  const newTaskToDest: Task = {
    ...removedTask,
    columnType: destinationColumnType,
  }

  destClone.unshift(newTaskToDest)

  setSourceTasks(sourceClone)
  setDestinationTasks(destClone)

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
  destinationTasks,
  sourceTasks,
  sourceDoc,
  droppableDestination,
  droppableSource,
  setDestinationTasks,
  setSourceTasks,
}: SwitchDesktopColumnParams) => {
  const sourceClone = Array.from(sourceTasks)
  const destClone = destinationTasks

  const [removedTask] = sourceClone.splice(droppableSource.index, 1)

  const newTaskToProgress: Task = {
    ...removedTask,
    columnType: destinationColumnType,
  }

  destClone.splice(droppableDestination.index, 0, newTaskToProgress)

  setSourceTasks(sourceClone)
  setDestinationTasks(destClone)

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
