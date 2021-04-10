import firebase from 'firebase/app'

export type ColumnType = 'Todo' | 'In progress' | 'Done'

export type TaskType = {
  text: string
  createdAtStamp: firebase.firestore.FieldValue
  createdAt: string
  userId: string
  id: string
  columnType: ColumnType
}

export type Status = 'idle' | 'loading' | 'success' | 'error'
