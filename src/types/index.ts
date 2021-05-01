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
