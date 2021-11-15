import firebase from 'firebase/app'

export type ColumnType = 'Todo' | 'In progress' | 'Done'

export type TrimmedColumnType = 'Todo' | 'Inprogress' | 'Done'

export type Task = {
  text: string
  createdAt: string
  id: string
  columnType: ColumnType
}

export type TaskFirestoreResult = {
  tasks: Task[]
}

export type Status = 'idle' | 'loading' | 'success' | 'error'

export enum EnumColumnTypesTrimmed {
  InProgress = 'Inprogress',
  Done = 'Done',
  Todo = 'Todo',
}

export type DocumentData =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
