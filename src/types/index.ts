export type ColumnType = 'Todo' | 'In progress' | 'Done'

export type Task = {
  text: string
  createdAt: string
  id: string
  columnType: ColumnType
}

export type Status = 'idle' | 'loading' | 'success' | 'error'
