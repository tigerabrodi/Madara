import { useStore } from 'lib/store'
import { ColumnType, Task } from 'types'

export const useSetTasks = () => {
  const { setTodoTasks, setProgressTasks, setDoneTasks } = useStore()

  const setTasks = (columnType: ColumnType, tasks: Task[]) => {
    switch (columnType) {
      case 'Todo':
        setTodoTasks(tasks)
        break
      case 'In progress':
        console.log('progresstaskset')
        setProgressTasks(tasks)
        break
      case 'Done':
        setDoneTasks(tasks)
        break

      default:
        break
    }
  }

  return setTasks
}
