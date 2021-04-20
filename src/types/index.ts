export type ColumnType = 'Todo' | 'In progress' | 'Done'

export type TaskType = {
  text: string
  createdAt: string
  userId: string
  id: string
  columnType: ColumnType
}

export type Status = 'idle' | 'loading' | 'success' | 'error'
