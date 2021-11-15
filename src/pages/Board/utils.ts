import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { ColumnType, Task, TaskFirestoreResult, DocumentData } from 'types'

type Params = {
  sourceDoc: DocumentData
  destinationDoc: DocumentData
  sourceDocResult: Data<TaskFirestoreResult, '', ''> | undefined
  destinationDocResult: Data<TaskFirestoreResult, '', ''> | undefined
  destinationColumnType: ColumnType
  sourceTaskIndex: number
}

export const switchColumnMobile = ({
  sourceDoc,
  destinationColumnType,
  sourceDocResult,
  sourceTaskIndex,
  destinationDoc,
  destinationDocResult,
}: Params) => {
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
