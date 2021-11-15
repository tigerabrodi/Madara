import { DocumentData } from 'lib/types'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { ColumnType, Task, TaskFirestoreResult } from 'types'

export const switchColumnMobile = (
  sourceDoc: DocumentData,
  destDoc: DocumentData,
  sourceDocResult: Data<TaskFirestoreResult, '', ''> | undefined,
  destDocResult: Data<TaskFirestoreResult, '', ''> | undefined,
  destColumnType: ColumnType,
  sourceTaskIndex: number
) => {
  const sourceClone = Array.from(sourceDocResult!.tasks)

  const destClone = destDocResult ? Array.from(destDocResult.tasks) : []

  const [removedTask] = sourceClone.splice(sourceTaskIndex, 1)

  const newTaskToDest: Task = {
    ...removedTask,
    columnType: destColumnType,
  }

  destClone.unshift(newTaskToDest)

  sourceDoc.set({
    tasks: sourceClone,
  })

  destDoc.set({
    tasks: destClone,
  })
}
